import React from "react";
import { MainLayoutProps } from "./MainLayout.types";
import { NavigationBar } from "@/components/molecules/NavigationBar";
import { Footer } from "@/components/molecules/Footer";
import { AppContextProvider } from "@/contexts/AppContext";
import { ClerkProvider } from "@clerk/nextjs";

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ClerkProvider>
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
              <div className="min-h-[calc(100vh-90px)]">
                <NavigationBar />
                {children}
              </div>
              <Footer />
            </AppContextProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
