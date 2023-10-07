type DetailsItem = {
  title: string;
  review: string;
  sentiment: string;
  keywords: string[];
  summarization: string;
};

export type DetailsTabProps = {
  results: DetailsItem[];
  allKeywords: string[];
};
