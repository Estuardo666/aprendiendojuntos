export function buildArticleSchema(article: {
  title: string
  slug: string
  excerpt: string
  date: string
  imagenSrc?: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `https://aprendiendojuntos.ec/articulos/${article.slug}`,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'Centro Aprendiendo Juntos',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Centro Aprendiendo Juntos',
    },
    ...(article.imagenSrc && { image: article.imagenSrc }),
  }
}
