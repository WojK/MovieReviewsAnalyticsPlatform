type DetailsItem = {
  review: string;
  sentiment: string;
  keywords: string[];
  summarization: string;
};

export type DetailsTabProps = {
  results: DetailsItem[];
  allKeywords: string[];
};
