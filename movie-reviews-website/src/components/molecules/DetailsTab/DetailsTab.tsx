import React, { useState } from "react";
import { DetailsTabProps } from "./DetailsTab.types";
import { Modal, Select, SelectProps, Table, Tag } from "antd";
import Column from "antd/es/table/Column";

const sentimentOptions: SelectProps["options"] = [
  { value: "all", label: "All" },
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
];

type DataType = {
  key: string;
  title: string;
  review: string;
  sentiment: string;
  keywords: string[];
  summarization: string;
};

export function DetailsTab({ results, allKeywords }: DetailsTabProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");
  const [currentSummarization, setCurrentSummarization] = useState<string>("");
  const [currentReview, setCurrentReview] = useState<string>("");
  const [isSummarizationModalOpen, setIsSummarizationModalOpen] =
    useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  let data: DataType[] = [];

  if (selectedSentiment === "all") {
    data = results
      .filter((result) => {
        if (selectedKeywords.length > 0) {
          return result.keywords.some((kw) => selectedKeywords.includes(kw));
        } else {
          return true;
        }
      })
      .map((result, index) => {
        return {
          review: result.review,
          title: result.title,
          sentiment: result.sentiment,
          summarization: result.summarization,
          keywords: result.keywords,
          key: index.toString(),
        };
      });
  }

  if (selectedSentiment === "positive") {
    data = results
      .filter((result) => {
        if (parseFloat(result.sentiment) <= 0.5) {
          return false;
        }
        if (selectedKeywords.length > 0) {
          return result.keywords.some((kw) => selectedKeywords.includes(kw));
        } else {
          return true;
        }
      })
      .map((result, index) => {
        return {
          review: result.review,
          title: result.title,
          sentiment: result.sentiment,
          summarization: result.summarization,
          keywords: result.keywords,
          key: index.toString(),
        };
      });
  }

  if (selectedSentiment === "negative") {
    data = results
      .filter((result) => {
        if (parseFloat(result.sentiment) > 0.5) {
          return false;
        }
        if (selectedKeywords.length > 0) {
          return result.keywords.some((kw) => selectedKeywords.includes(kw));
        } else {
          return true;
        }
      })
      .map((result, index) => {
        return {
          review: result.review,
          title: result.title,
          sentiment: result.sentiment,
          summarization: result.summarization,
          keywords: result.keywords,
          key: index.toString(),
        };
      });
  }

  const handleSelectKeywordsChange = (value: string[]) => {
    setSelectedKeywords(value);
  };

  const handleSelectSentimentChange = (value: string) => {
    setSelectedSentiment(value);
  };

  const handleCurrentSummarization = (summarization: string) => () => {
    setCurrentSummarization(summarization);
    setIsSummarizationModalOpen(true);
  };

  const handleOkSummarizationModalClick = () => {
    setIsSummarizationModalOpen(false);
  };

  const handleSummarizationModalCancel = () => {
    setIsSummarizationModalOpen(false);
  };

  const handleReviewModalCancel = () => {
    setIsReviewModalOpen(false);
  };

  const handleOnReviewClick = (review: string) => () => {
    setCurrentReview(review);
    setIsReviewModalOpen(true);
  };

  return (
    <>
      <div className="py-12 px-12">
        <div className="flex gap-x-8 mb-8">
          <div>
            <p className="mb-1 font-bold">Filter by sentiment:</p>
            <Select
              style={{ width: 200 }}
              placeholder="Select sentiment"
              size="middle"
              defaultValue="all"
              options={sentimentOptions}
              onChange={handleSelectSentimentChange}
            />
          </div>
          <div>
            <p className="mb-1 font-bold">Filter by keywords:</p>
            <Select
              style={{ width: 280 }}
              mode="multiple"
              placeholder="Select keywords"
              size="middle"
              onChange={handleSelectKeywordsChange}
              options={allKeywords.sort().map((k) => {
                return { value: k, label: k };
              })}
            />
          </div>
        </div>
        <Table bordered dataSource={data} pagination={{ pageSize: 5 }}>
          <Column title="Title" dataIndex="title" key="title" />
          <Column
            title="Review"
            dataIndex="review"
            key="review"
            render={(review: string) => {
              const words = review.split(" ");
              const wordsCount = words.length;
              let fragmentToDisplay;
              if (wordsCount < 120) {
                fragmentToDisplay = review;
              } else {
                fragmentToDisplay = words.slice(0, 120).join(" ") + "...";
              }
              return (
                <button
                  onClick={handleOnReviewClick(review)}
                  className="text-left max-w-[550px]"
                >
                  {fragmentToDisplay}
                </button>
              );
            }}
          />
          <Column
            title="Score"
            dataIndex="sentiment"
            render={(sentiment: string) => {
              return (
                <div className="mx-2 px-2 py-2 rounded-md text-[#FFFFFF] bg-[#1d224299] font-bold text-center text-md">
                  {sentiment}
                </div>
              );
            }}
          />
          <Column
            title="Sentiment"
            dataIndex="sentiment"
            render={(sentiment: string) => {
              if (Number.parseFloat(sentiment) > 0.5) {
                return (
                  <div className="mx-2 px-2 py-2 rounded-md text-[#FFFFFF] bg-[#43C851] font-bold text-center text-md">
                    Positive
                  </div>
                );
              } else {
                return (
                  <div className="mx-2 px-2 py-2 rounded-md text-[#FFFFFF] bg-[#FB3030] font-bold text-center text-md">
                    Negative
                  </div>
                );
              }
            }}
            key="sentiment"
          />
          <Column
            title="Keywords"
            key="keywords"
            dataIndex="keywords"
            render={(keywords) => (
              <div className="max-w-[300px]">
                {keywords.map((keyword: string, index: number) => {
                  return (
                    <Tag className="m-1" key={index}>
                      {keyword}
                    </Tag>
                  );
                })}
              </div>
            )}
          />
          <Column
            title="Summarization"
            key="summarization"
            dataIndex="summarization"
            render={(summarization) => {
              return (
                <button
                  className="border rounded-lg px-2.5 py-1.5"
                  onClick={handleCurrentSummarization(summarization)}
                >
                  Summarization
                </button>
              );
            }}
          />
        </Table>
      </div>
      <Modal
        title="Summarization"
        open={isSummarizationModalOpen}
        onCancel={handleSummarizationModalCancel}
        footer={[
          <button
            key="okBtn"
            onClick={handleOkSummarizationModalClick}
            className="px-4 py-2 border bg-customBlue rounded-lg text-[#FFFF] opacity-80"
          >
            Ok
          </button>,
        ]}
      >
        <div className="mt-6 mb-10">{currentSummarization}</div>
      </Modal>
      <Modal
        title="Review"
        open={isReviewModalOpen}
        onCancel={handleReviewModalCancel}
        footer={[
          <button
            key="okBtn"
            onClick={handleReviewModalCancel}
            className="px-4 py-2 border bg-customBlue rounded-lg text-[#FFFF] opacity-80"
          >
            Ok
          </button>,
        ]}
      >
        <div className="mt-6 mb-10">{currentReview}</div>
      </Modal>
    </>
  );
}
