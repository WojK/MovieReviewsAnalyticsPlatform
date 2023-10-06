import { AppContextAction, AppContextStateType } from "./AppContext.types";

export function appContextReducer(
  state: AppContextStateType,
  action: AppContextAction
) {
  switch (action.type) {
    case "setSentimentalAnalysisModel":
      return { ...state, sentimentalAnalysisModel: action.payload };
    case "setSentimentalAnalysisModelName":
      return { ...state, sentimentalAnalysisModelName: action.payload };
    case "setKeywordsExtractionModel":
      return { ...state, keywordsExtractionModel: action.payload };
    case "setKeywordsExtractionNumber":
      return { ...state, keywordsExtractionNumber: action.payload };
    case "setSummarizationModel":
      return { ...state, summarizationModel: action.payload };
    case "setSummarizationRatio":
      return { ...state, summarizationRatio: action.payload };
    case "setCsvFile":
      return { ...state, csvFile: action.payload };
    default:
      throw new Error();
  }
}
