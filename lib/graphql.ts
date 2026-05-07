const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL ?? process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

let resolvedGraphqlUrl: string | null = null;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

function buildCandidateUrls(rawUrl: string) {
  const candidates = new Set<string>();

  try {
    const url = new URL(rawUrl);
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
    candidates.add(rawUrl);
  }

  return Array.from(candidates);
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 86400,
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
        next: { revalidate },
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
      lastError = error instanceof Error ? error : new Error('Unknown GraphQL request failure');
    }
  }

  throw lastError ?? new Error('GraphQL request failed');
}
