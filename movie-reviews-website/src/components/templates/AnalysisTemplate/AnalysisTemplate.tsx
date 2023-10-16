import React, { useEffect, useState } from "react";
import { AnalysisTemplateProps } from "./AnalysisTemplate.types";
import { Title } from "@/components/atoms/Title";
import { Spin, Tabs, TabsProps } from "antd";
import { OverviewTab } from "@/components/molecules/OverviewTab";
import { DetailsTab } from "@/components/molecules/DetailsTab";

export function AnalysisTemplate({ params }: AnalysisTemplateProps) {
  const [isLoadingAnalyze, setIsLoadingAnalyze] = useState<boolean>(true);
  const [isLoadingWordCloud, setIsLoadingWordCloud] = useState<boolean>(true);
  const [modelName, setModelName] = useState("");
  const [reviewsPos, setReviewsPos] = useState(0);
  const [reviewsNeg, setReviewsNeg] = useState(0);
  const [reviewsWordsAvg, setReviewsWordsAvg] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [wordCloud, setWordCloud] = useState<any>();

  const [allKeywords, setAllKeywords] = useState<string[]>([]);

  const isLoading = isLoadingAnalyze || isLoadingWordCloud;

  useEffect(() => {
    fetch(`http://localhost:3000/api/history?id=${params.id}`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setModelName(result.sentimentalAnalysisModel);
        setReviewsWordsAvg(result.wordsAvg);
        setReviewsPos(result.positiveReviews);
        setReviewsNeg(result.negiveReviews);
        const allKw = new Set<string>();
        result.reviews.forEach((r: any) => {
          r.keywords.forEach((k: any) => {
            allKw.add(k.word);
          });
        });

        setAllKeywords(Array.from(allKw));
        setReviews(result.reviews);
        setIsLoadingAnalyze(false);
        fetch(
          `http://localhost:3000/api/history/word-cloud?id=${result.wordsCloudPath}`
        )
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            const objectURL = URL.createObjectURL(blob);
            setWordCloud(objectURL);
            setIsLoadingWordCloud(false);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id]);

  const results: {
    key: string;
    title: string;
    review: string;
    sentiment: any;
    keywords: string[];
    summarization: string;
  }[] = reviews.map((r: any) => {
    return {
      key: r.id.toString(),
      title: r.movie.title,
      review: r.text,
      summarization: r.summarization,
      sentiment: r.positiveProbability,
      keywords: r.keywords.map((k: any) => k.word),
    };
  });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <OverviewTab
          modelName={modelName}
          positiveReviewsCount={reviewsPos}
          negativeReviewsCount={reviewsNeg}
          averageWordsCount={reviewsWordsAvg}
          image={wordCloud}
        />
      ),
    },
    {
      key: "2",
      label: "Details",
      children: <DetailsTab results={results} allKeywords={allKeywords} />,
    },
  ];

  return (
    <div className="px-16 py-12">
      <Title title="Analysis" />
      {isLoading && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && <Tabs size="large" defaultActiveKey="1" items={items} />}
    </div>
  );
}