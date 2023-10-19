import React, { useEffect, useState } from "react";
import { MovieTemplateProps } from "./MovieTemplate.types";
import { Modal, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { motion } from "framer-motion";

type DataType = {
  key: string;
  title: string;
  review: string;
  sentiment: string;
  summarization: string;
};

export function MovieTemplate({ params }: MovieTemplateProps) {
  const [currentSummarization, setCurrentSummarization] = useState<string>("");
  const [currentReview, setCurrentReview] = useState<string>("");
  const [isSummarizationModalOpen, setIsSummarizationModalOpen] =
    useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const [movieData, setMovieData] = useState<any>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/movie?id=${params.id}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setMovieData(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id]);

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

  let tableDataSource: DataType[] = [];
  console.log(movieData);
  tableDataSource = movieData?.reviews.map((r: any, i: number) => {
    return {
      key: i,
      review: r.text,
      sentiment: r.positiveProbability,
      summarization: r.summarization,
    };
  });

  return (
    <div className="py-12 px-14">
      <h1 className="text-customBlue text-3xl font-bold mb-2">
        {movieData?.title}
      </h1>

      <div className="mt-16 flex justify-center">
        <Table
          bordered
          dataSource={tableDataSource}
          pagination={{ pageSize: 4 }}
        >
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOnReviewClick(review)}
                  className="text-left max-w-[650px]"
                >
                  {fragmentToDisplay}
                </motion.button>
              );
            }}
          />
          <Column
            title="Score"
            dataIndex="sentiment"
            render={(sentiment: string) => {
              return (
                <div className="mx-8 px-2 py-2 rounded-md text-[#FFFFFF] bg-[#1d224299] font-bold text-center text-md">
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
                  <div className="mx-8 px-2 py-2 rounded-md text-[#FFFFFF] bg-[#43C851] font-bold text-center text-md">
                    Positive
                  </div>
                );
              } else {
                return (
                  <div className="mx-8 px-2 py-2 rounded-md text-[#FFFFFF] bg-[#FB3030] font-bold text-center text-md">
                    Negative
                  </div>
                );
              }
            }}
            key="sentiment"
          />
          <Column
            title="Summarization"
            key="summarization"
            dataIndex="summarization"
            render={(summarization) => {
              return (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  className="border rounded-lg px-2.5 py-1.5"
                  onClick={handleCurrentSummarization(summarization)}
                >
                  Summarization
                </motion.button>
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
    </div>
  );
}
