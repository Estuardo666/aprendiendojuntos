const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL ?? process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

let resolvedGraphqlUrl: string | null = null;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

function normalizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `http://${trimmed}`;
  }
  return trimmed;
}

function buildCandidateUrls(rawUrl: string) {
  const candidates = new Set<string>();
  const urlWithProtocol = normalizeUrl(rawUrl);

  try {
    const url = new URL(urlWithProtocol);
    const normalizedPath = url.pathname.replace(/\/+$/, '');

    candidates.add(url.toString());

    if (normalizedPath.endsWith('/graphql')) {
      const indexPhpUrl = new URL(url.toString());
      indexPhpUrl.pathname = normalizedPath.replace(/\/graphql$/, '/index.php');
      indexPhpUrl.search = 'graphql';
      candidates.add(indexPhpUrl.toString());
    }

    if (normalizedPath.endsWith('/index.php') && url.search === '?graphql') {
      const graphqlUrl = new URL(url.toString());
      graphqlUrl.pathname = normalizedPath.replace(/\/index\.php$/, '/graphql');
      graphqlUrl.search = '';
      candidates.add(graphqlUrl.toString());
    }

    if (!normalizedPath || normalizedPath === '/') {
      const graphqlUrl = new URL(url.origin);
      graphqlUrl.pathname = '/graphql';
      candidates.add(graphqlUrl.toString());

      const indexPhpUrl = new URL(url.origin);
      indexPhpUrl.pathname = '/index.php';
      indexPhpUrl.search = 'graphql';
      candidates.add(indexPhpUrl.toString());
    }
  } catch {
    candidates.add(urlWithProtocol);
  }

  return Array.from(candidates);
}

const REQUEST_TIMEOUT_MS = 7000;

const NETWORK_ERROR_CODES = new Set([
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
  'UND_ERR_SOCKET',
  'ETIMEDOUT',
  'ECONNRESET',
  'ECONNREFUSED',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'ENOTFOUND',
  'EAI_AGAIN',
  'EPIPE',
  'CERT_HAS_EXPIRED',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
]);

export function isNetworkFailure(error: unknown): boolean {
  let current: unknown = error;

  for (let depth = 0; depth < 5 && current; depth += 1) {
    if (current instanceof Error) {
      const code = (current as NodeJS.ErrnoException).code;
      if (code && NETWORK_ERROR_CODES.has(code)) {
        return true;
      }
      if (current.name === 'TimeoutError' || current.name === 'AbortError') {
        return true;
      }
      current = current.cause;
      continue;
    }
    break;
  }

  return false;
}

function isFrameworkSignal(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const digest = (error as Error & { digest?: unknown }).digest;

  return (
    error.name === 'DynamicServerError' ||
    (typeof digest === 'string' && digest.startsWith('DYNAMIC_SERVER_USAGE')) ||
    (typeof digest === 'string' && digest.startsWith('BAILOUT_TO_CLIENT_SIDE_RENDERING')) ||
    digest === 'NEXT_NOT_FOUND' ||
    digest === 'NEXT_REDIRECT'
  );
}

function describeError(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Unknown GraphQL request failure';
  }

  const code = (error as NodeJS.ErrnoException).code;
  const cause =
    error.cause instanceof Error
      ? ` (cause: ${error.cause.name}: ${error.cause.message}${
          (error.cause as NodeJS.ErrnoException).code
            ? ` [${(error.cause as NodeJS.ErrnoException).code}]`
            : ''
        })`
      : '';

  return `${error.message}${code ? ` [${code}]` : ''}${cause}`;
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 86400,
  tags?: string[],
): Promise<T> {
  if (!WP_GRAPHQL_URL) {
    throw new Error('WP_GRAPHQL_URL or NEXT_PUBLIC_WP_GRAPHQL_URL is not defined');
  }

  const candidateUrls = resolvedGraphqlUrl
    ? [resolvedGraphqlUrl]
    : buildCandidateUrls(WP_GRAPHQL_URL);

  let lastError: Error | null = null;

  for (const candidateUrl of candidateUrls) {
    try {
      const response = await fetch(candidateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        next: { revalidate, tags: tags && tags.length > 0 ? tags : ['wp-content'] },
      });

      if (!response.ok) {
        lastError = new Error(
          `GraphQL request failed with status ${response.status} for ${candidateUrl}`,
        );

        // Only a missing endpoint justifies trying the alternate URL. Any other
        // status means the server answered, so retrying just doubles the load.
        if (response.status === 404 || response.status === 405) {
          continue;
        }

        throw lastError;
      }

      const json: GraphQLResponse<T> = await response.json();

      if (json.errors && json.errors.length > 0) {
        throw new Error(json.errors[0].message);
      }

      resolvedGraphqlUrl = candidateUrl;
      return json.data;
    } catch (error) {
      // Next.js control-flow errors (dynamic bailout, notFound, redirect) must
      // propagate untouched so the framework can handle them.
      if (isFrameworkSignal(error)) {
        throw error;
      }

      const wrapped = new Error(
        `GraphQL request failed for ${candidateUrl}: ${describeError(error)}`,
        { cause: error },
      );

      // A network-level failure (connect timeout, reset, DNS) means WordPress is
      // unreachable or saturated. Retrying another path on the same host would
      // only add another connection, so fail fast instead.
      if (isNetworkFailure(error)) {
        throw wrapped;
      }

      lastError = wrapped;
    }
  }

  throw lastError ?? new Error('GraphQL request failed');
}
