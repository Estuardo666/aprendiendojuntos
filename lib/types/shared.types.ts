export interface WPImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface WPPostRef {
  node: {
    id: string;
    slug: string;
    title: string;
  };
}
