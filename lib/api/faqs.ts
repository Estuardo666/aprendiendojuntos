import { cache } from 'react'
import { fetchGraphQL } from '@/lib/graphql';
import type { WPFaq } from '@/lib/types/faq.types';

interface GetFAQsData {
  faqs: {
    nodes: WPFaq[];
  };
}

const REVALIDATE = 3600;

async function getFAQsUncached(): Promise<WPFaq[]> {
  const data = await fetchGraphQL<GetFAQsData>(
    `
      query GetFAQs {
        faqs(first: 12, where: { orderby: { field: DATE, order: ASC } }) {
          nodes {
            id
            faqFields {
              pregunta
              respuesta
              orden
            }
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  );

  return data.faqs.nodes;
}

export const getFAQs = cache(getFAQsUncached)
