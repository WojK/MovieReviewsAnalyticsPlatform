import React from "react";
import { Title } from "@/components/atoms/Title";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  approach: string;
  role: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Approach",
    dataIndex: "approach",
    key: "approach",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const data: DataType[] = [
  {
    key: "1",
    approach: "Logistic regression with Count Vectorizer",
    role: "Sentimental analysis",
    description:
      "Supervised machine learning algorithm  with vectorizer which transform a given text into a vector on the basis of the frequency (count) of each word that occurs in the entire text ",
  },
  {
    key: "2",
    approach: "Logistic regression with TFIDF",
    role: "Sentimental analysis",
    description:
      "Supervised machine learning algorithm  with tfidf vectorizer which is a statistical measure that evaluates how relevant a word is to a document in a collection of documents",
  },
  {
    key: "3",
    approach: "Naive Bayes with Count Vectorizer",
    role: "Sentimental analysis",
    description:
      "Supervised learning algorithm, which is based on Bayes theorem, with vectorizer which transform a given text into a vector on the basis of the frequency (count) of each word that occurs in the entire text  ",
  },
  {
    key: "4",
    approach: "Naive Bayes with TFIDF",
    role: "Sentimental analysis",
    description:
      "Supervised learning algorithm, which is based on Bayes theorem,  with tfidf vectorizer which is a statistical measure that evaluates how relevant a word is to a document in a collection of documents",
  },
  {
    key: "5",
    approach: "Long short-term memory network",
    role: "Sentimental analysis",
    description:
      "Special kind of RNN, capable of learning long-term dependencies",
  },
  {
    key: "6",
    approach: "BERT transformer",
    role: "Sentimental analysis",
    description:
      "(Bidirectional Encoder Representations from Transformers) is a Natural Language Processing Model proposed by researchers at Google Research in 2018",
  },
  {
    key: "7",
    approach: "Luhn Summarizer",
    role: "Summarization",
    description:
      "Published in 1958 by IBM researcher, Peter Luhn. It looks at the window-size of non-important words between words of high importance",
  },
  {
    key: "8",
    approach: "TextRank",
    role: "Summarization",
    description:
      "Algorithm based on PageRank, which often used in keyword extraction and text summarization",
  },
  {
    key: "9",
    approach: "BERT extractive summarizer",
    role: "Summarization",
    description:
      "Summarization by leveraging the BERT (Bidirectional Encoder Representations from Transformers) architecture.",
  },
  {
    key: "10",
    approach: "GPT-2 extractive summarizer",
    role: "Summarization",
    description:
      "Summarization by leveraging the GPT2 model (Generative Pre-trained Transformer 2)",
  },
  {
    key: "11",
    approach: "Yake",
    role: "Keywords extraction",
    description:
      "Light-weight unsupervised automatic keyword extraction method which rests on text statistical features extracted from single documents to select the most important keywords of a text",
  },
  {
    key: "12",
    approach: "KeyBert",
    role: "Keywords extraction",
    description:
      "KeyBERT is a minimal and easy-to-use keyword extraction technique that leverages BERT embeddings to create keywords and keyphrases that are most similar to a document",
  },
  {
    key: "13",
    approach: "Rake",
    role: "Keywords extraction",
    description:
      "Rapid Automatic Keyword Extraction is a keyword extraction algorithm that is extremely efficient",
  },
];

export function SolutionsTemplate() {
  return (
    <div className="py-12 px-14">
      <Title title="Solutions details" />
      <div className="px-24">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
}
