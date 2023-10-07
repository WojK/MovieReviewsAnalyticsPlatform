import React, { useEffect, useState } from "react";
import { useAppContextState } from "@/contexts/AppContext";
import { Title } from "@/components/atoms/Title";
import { Spin, Tabs, TabsProps } from "antd";
import { OverviewTab } from "@/components/molecules/OverviewTab";
import { DetailsTab } from "@/components/molecules/DetailsTab";
import { api } from "@/api";
import { redirect } from "next/navigation";

export function ResultsTemplate() {
  const {
    sentimentalAnalysisModel,
    keywordsExtractionModel,
    summarizationModel,
    csvFile,
    summarizationRatio,
    keywordsExtractionNumber,
  } = useAppContextState();
  const [isLoadingAnalyze, setIsLoadingAnalyze] = useState<boolean>(true);
  const [isLoadingWordCloud, setIsLoadingWordCloud] = useState<boolean>(true);
  const [reviewsPos, setReviewsPos] = useState(0);
  const [reviewsNeg, setReviewsNeg] = useState(0);
  const [allKeywords, setAllKeywords] = useState([]);
  const [reviewsWordsAvg, setReviewsWordsAvg] = useState(0);
  const [reviews, setReviews] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [reviewsKeywords, setReviewsKeywords] = useState([]);
  const [reviewsSentiments, setReviewsSentiments] = useState<any[]>([]);
  const [reviewsSummarizations, setReviewsSummarizations] = useState([]);
  const [wordCloud, setWordCloud] = useState<any>();

  const isLoading = isLoadingAnalyze || isLoadingWordCloud;

  if (isLoading === false && reviews.length === 0) {
    redirect("/analyze-own-reviews");
  }

  let results: {
    key: string;
    title: string;
    review: string;
    sentiment: any;
    keywords: string[];
    summarization: string;
  }[] = [];

  for (let i = 0; i < reviews?.length || 0; i++) {
    const prob_pos = reviewsSentiments[i].prob_pos;
    results.push({
      key: i.toString(),
      title: titles[i],
      review: reviews[i],
      sentiment: prob_pos,
      keywords: reviewsKeywords[i],
      summarization: reviewsSummarizations[i],
    });
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <OverviewTab
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

  useEffect(() => {
    setIsLoadingAnalyze(true);
    setIsLoadingWordCloud(true);
    const fd = new FormData();

    fd.append("file", csvFile);
    fd.append("summarization_method", summarizationModel);
    fd.append("summarization_ratio", summarizationRatio);
    fd.append("keywords_extraction_method", keywordsExtractionModel);
    fd.append("n_keywords", keywordsExtractionNumber);
    fd.append("sentiment_analysis_method", sentimentalAnalysisModel);

    fetch(`${api}/analyze-file`, { method: "POST", body: fd })
      .then((response) => response.json())
      .then((json) => {
        setReviewsNeg(json.reviewsNeg);
        setReviewsPos(json.reviewsPos);
        setAllKeywords(json.allKeywords);
        setReviewsKeywords(json.keywords);
        setReviewsSentiments(json.sentiments);
        setReviewsSummarizations(json.summarizations);
        setReviewsWordsAvg(json.wordsAvg);
        setTitles(json.movieTitles);
        setReviews(json.reviews || []);
        setIsLoadingAnalyze(false);
      })
      .catch((e) => console.log(e));

    const fd2 = new FormData();
    fd2.append("file", csvFile);

    fetch(`${api}/word-cloud-file`, { method: "POST", body: fd2 })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setWordCloud(objectURL);
        setIsLoadingWordCloud(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="px-16 py-12">
      <Title title="Results" />
      {isLoading && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && <Tabs size="large" defaultActiveKey="1" items={items} />}
    </div>
  );
}
