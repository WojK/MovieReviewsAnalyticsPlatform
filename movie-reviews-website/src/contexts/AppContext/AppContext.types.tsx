import { ContextAction, ContextActionWithPayload } from "../../types";

export type AppContextStateType = {
  sentimentalAnalysisModel: string;
  sentimentalAnalysisModelName: string;
  keywordsExtractionModel: string;
  keywordsExtractionNumber: string;
  summarizationModel: string;
  summarizationRatio: string;
  csvFile: any;
};

export type AppContextActionsType = {
  setSentimentalAnalysisModel: (model: string) => void;
  setSentimentalAnalysisModelName: (model: string) => void;
  setKeywordsExtractionModel: (model: string) => void;
  setSummarizationModel: (model: string) => void;
  setSummarizationRatio: (ratio: string) => void;
  setCsvFile: (file: any) => void;
  setKeywordsExtractionNumber: (number: string) => void;
};

export type AppContextAction =
  | ContextActionWithPayload<"setSentimentalAnalysisModel", string>
  | ContextActionWithPayload<"setSentimentalAnalysisModelName", string>
  | ContextActionWithPayload<"setKeywordsExtractionModel", string>
  | ContextActionWithPayload<"setKeywordsExtractionNumber", string>
  | ContextActionWithPayload<"setSummarizationModel", string>
  | ContextActionWithPayload<"setSummarizationRatio", string>
  | ContextActionWithPayload<"setCsvFile", any>;
