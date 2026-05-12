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
        next: { revalidate, tags: tags && tags.length > 0 ? tags : ['wp-content'] },
      });

      if (!response.ok) {
        lastError = new Error(`GraphQL request failed with status ${response.status} for ${candidateUrl}`);
        continue;
      }

      const json: GraphQLResponse<T> = await response.json();

      if (json.errors && json.errors.length > 0) {
        throw new Error(json.errors[0].message);
      }

      resolvedGraphqlUrl = candidateUrl;
      return json.data;
    } catch (error) {
      const baseMessage = error instanceof Error ? error.message : 'Unknown GraphQL request failure';
      const cause = error instanceof Error && 'cause' in error && error.cause instanceof Error
        ? error.cause.message
        : '';
      lastError = new Error(
        `GraphQL request failed for ${candidateUrl}: ${baseMessage}${cause ? ` (${cause})` : ''}`,
      );
    }
  }

  throw lastError ?? new Error('GraphQL request failed');
}
