"use client";

import { createContext, useMemo, useReducer } from "react";
import { AppContextActionsType, AppContextStateType } from "./AppContext.types";
import { appContextReducer } from "./AppContext.reducer";

export const AppContextState = createContext<AppContextStateType>(
  {} as AppContextStateType
);
export const AppContextActions = createContext<AppContextActionsType>(
  {} as AppContextActionsType
);

const INITIAL_STATE = {
  sentimentalAnalysisModel: "",
  sentimentalAnalysisModelName: "",
  keywordsExtractionModel: "",
  summarizationModel: "",
  summarizationRatio: "50",
  keywordsExtractionNumber: "10",
  csvFile: null,
};

export function AppContextProvider({
  children,
  initialState = INITIAL_STATE,
}: {
  children: React.ReactNode;
  initialState: AppContextStateType;
}) {
  const [state, dispatch] = useReducer(appContextReducer, {
    ...initialState,
  });

  const actionsValue = useMemo(
    (): AppContextActionsType => ({
      setSentimentalAnalysisModel: (model) =>
        dispatch({ type: "setSentimentalAnalysisModel", payload: model }),
      setSentimentalAnalysisModelName: (model) =>
        dispatch({ type: "setSentimentalAnalysisModelName", payload: model }),
      setKeywordsExtractionModel: (model) =>
        dispatch({ type: "setKeywordsExtractionModel", payload: model }),
      setKeywordsExtractionNumber: (number) =>
        dispatch({ type: "setKeywordsExtractionNumber", payload: number }),
      setSummarizationModel: (model) =>
        dispatch({ type: "setSummarizationModel", payload: model }),
      setSummarizationRatio: (ratio) =>
        dispatch({ type: "setSummarizationRatio", payload: ratio }),
      setCsvFile: (csvFile) =>
        dispatch({ type: "setCsvFile", payload: csvFile }),
    }),
    []
  );

  return (
    <AppContextState.Provider value={state}>
      <AppContextActions.Provider value={actionsValue}>
        {children}
      </AppContextActions.Provider>
    </AppContextState.Provider>
  );
}
