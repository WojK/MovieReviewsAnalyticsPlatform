import React from "react";
import { MainLayoutProps } from "./MainLayout.types";
import { NavigationBar } from "@/components/molecules/NavigationBar";
import { Footer } from "@/components/molecules/Footer";
import { AppContextProvider } from "@/contexts/AppContext";

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <html lang="en">
      <body className="font-cabin">
        <main>
          <AppContextProvider
            initialState={{
              sentimentalAnalysisModel: "logisticRegressionTFIDF",
              sentimentalAnalysisModelName: "Logistic Regression TFIDF",
              keywordsExtractionModel: "rake",
              keywordsExtractionNumber: "10",
              summarizationModel: "textrank",
              summarizationRatio: "50",
              csvFile: null,
            }}
          >
            <NavigationBar />
            {children}
            <Footer />
          </AppContextProvider>
        </main>
      </body>
    </html>
  );
}
