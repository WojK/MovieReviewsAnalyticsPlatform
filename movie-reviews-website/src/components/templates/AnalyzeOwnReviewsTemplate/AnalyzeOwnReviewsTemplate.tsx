import React, { useState } from "react";
import { Title } from "@/components/atoms/Title";
import { Input, Select, Steps } from "antd";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useAppContextActions,
  useAppContextState,
} from "@/contexts/AppContext";

export function AnalyzeOwnReviewsTemplate() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [fileName, setFileName] = useState<string>();
  const router = useRouter();
  const {
    setKeywordsExtractionModel,
    setSummarizationModel,
    setSentimentalAnalysisModel,
    setCsvFile,
    setSentimentalAnalysisModelName,
    setKeywordsExtractionNumber,
    setSummarizationRatio,
  } = useAppContextActions();

  const { keywordsExtractionNumber, summarizationRatio } = useAppContextState();

  const uploadFileHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      const chosenFile = fileInput.files[0];
      setFileName(fileName);
      setCsvFile(chosenFile);
      setCurrentStep(1);
    }
  };

  const handleSentimentalModelChange = (value: string, option: any) => {
    setCurrentStep(2);
    setSentimentalAnalysisModel(value);
    setSentimentalAnalysisModelName(option.label);
  };

  const handleKeywordsModelChange = (value: string) => {
    setCurrentStep(3);
    setKeywordsExtractionModel(value);
  };

  const handleSummarizationModelChange = (value: string) => {
    setCurrentStep(4);
    setSummarizationModel(value);
  };

  const handleAnalyzeClick = () => {
    setCurrentStep(4);
    router.push("/results");
  };

  const handleKeywordsExtractionNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeywordsExtractionNumber(e.target.value);
  };

  const handleSummarizationRatioChange = (value: string) => {
    setSummarizationRatio(value);
  };

  return (
    <div className="px-12 py-12 min-h-[80vh]">
      <div className="flex gap-x-[25vw] ml-8 mr-[250px]">
        <div>
          <Title title="How it works?" />
          <div className="mt-14 ml-6">
            <Steps
              progressDot
              direction="vertical"
              current={currentStep}
              items={[
                {
                  title: "Upload prepared excel file with your movie reviews",
                },
                {
                  title: "Select model to sentimental analysis",
                },
                {
                  title: "Select model to keywords extraction",
                },
                {
                  title: "Select model to summarization",
                },
                {
                  title: "Click the analyze button",
                },
                {
                  title: "Finally you will be redirected to page with results",
                },
              ]}
            />
          </div>
        </div>
        <div>
          <div className=" flex flex-col gap-y-6 items-start">
            <div className="flex flex-col items-center w-full mb-5 gap-y-6">
              <label
                htmlFor="file-upload"
                className="cursor-pointer border flex flex-col items-center gap-y-0.5 justify-center border-dashed rounded-full w-[110px] h-[110px]"
              >
                <Plus size={10} />
                <p className="text-center">Click to Upload</p>
              </label>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".xlsx"
                onChange={uploadFileHandler}
              ></input>
              <p className="text-customBlue text-lg">{fileName}</p>
            </div>
            <div>
              <p className="mb-2">Sentimental analysis model:</p>
              <Select
                onChange={handleSentimentalModelChange}
                placeholder="Select model to sentimental analysis"
                style={{ width: 280 }}
                options={[
                  {
                    label: "Logistic Regression Count Vectorizer",
                    value: "logisticRegressionCV",
                  },
                  {
                    value: "logisticRegressionTFIDF",
                    label: "Logistic Regression TFIDF",
                  },
                  {
                    value: "naiveBayesCV",
                    label: "Naive Bayes Count Vectorizer",
                  },
                  {
                    value: "naiveBayesTFIDF",
                    label: "Naive Bayes TFIDF",
                  },
                  { value: "bert", label: "BERT" },
                  { value: "lstm", label: "LSTM" },
                ]}
              />
            </div>
            <div>
              <div className="flex gap-x-5">
                <div>
                  <p className="mb-2">Keywords extraction model:</p>
                  <Select
                    onChange={handleKeywordsModelChange}
                    placeholder="Select model to keywords extraction"
                    style={{ width: 280 }}
                    options={[
                      {
                        value: "rake",
                        label: "Rake",
                      },
                      {
                        value: "yake",
                        label: "Yake",
                      },
                      { value: "keybert", label: "KeyBERT" },
                    ]}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mb-2">Number:</p>
                  <Input
                    className="w-[50px]"
                    value={keywordsExtractionNumber}
                    onChange={handleKeywordsExtractionNumberChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-x-5">
                <div>
                  <p className="mb-2">Summarization model:</p>
                  <Select
                    onChange={handleSummarizationModelChange}
                    placeholder="Select model to summarization"
                    style={{ width: 280 }}
                    options={[
                      { value: "luhn", label: "Luhn" },
                      { value: "textrank", label: "TextRank" },
                      { value: "bert", label: "BERT" },
                      { value: "gpt2", label: "GPT-2" },
                    ]}
                  />
                </div>
                <div>
                  <p className="mb-2">Ratio:</p>
                  <Select
                    onChange={handleSummarizationRatioChange}
                    placeholder="Ratio"
                    style={{ width: 80 }}
                    defaultValue={summarizationRatio}
                    options={[
                      { value: "80", label: "80" },
                      { value: "70", label: "70" },
                      { value: "60", label: "60" },
                      { value: "50", label: "50" },
                      { value: "40", label: "40" },
                      { value: "30", label: "30" },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-5">
              <button
                className="w-[200px] py-2 border border-customBlue rounded-2xl"
                onClick={handleAnalyzeClick}
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
