import React from "react";
import { MainTemplateProps } from "./MainTemplate.types";
import { Title } from "@/components/atoms/Title";
import { TextWithIcon } from "@/components/atoms/TextWithIcon";
import { Brain, BarChart3, Heart, Text, Hash } from "lucide-react";
import { Card } from "@/components/molecules/Card";
import Link from "next/link";

export function MainTemplate(props: MainTemplateProps) {
  return (
    <>
      <div className="px-28 py-12">
        <Title title="No-Code Text Analytics Platform" />
        <div className="w-[850px]">
          <TextWithIcon
            icon={<Brain size={48} strokeWidth={2.5} />}
            text="Represents a state-of-the-art strategy for deriving valuable insights from unstructured text data without the need for programming or coding skills."
          />
          <TextWithIcon
            icon={<BarChart3 size={48} strokeWidth={2.5} />}
            text=" This progressive approach harnesses advanced technologies like natural language processing (NLP), artificial intelligence (AI), and machine learning (ML) algorithms to analyze and produce meaningful information from extensive text datasets."
          />
        </div>
      </div>
      <section className="bg-[#F2F2F2] py-8">
        <h2 className="text-center mb-8 text-2xl font-bold">
          NLP tasks covered in the platform
        </h2>
        <div className="flex justify-center gap-x-10">
          <Card
            title="Sentimental Analysis"
            icon={<Heart size={40} />}
            text="The process of analyzing digital text to determine if the emotional tone of the message is positive, negative, or neutral"
          />
          <Card
            title="Text Summarization"
            icon={<Text size={40} />}
            text="Text summarization is the practice of condensing lengthy text content with the goal of generating a concise and cohesive summary that highlights the document's key points."
          />
          <Card
            title="Keywords Extraction"
            icon={<Hash size={40} />}
            text="Keyword extraction is the process of identifying and extracting the most relevant and significant words or phrases from a text or document."
          />
        </div>
      </section>
      <div className="py-16 w-[800px] mx-auto flex flex-col items-center gap-y-6">
        <p className="text-center text-bold text-2xl">
          Our solutions empowers the business to gain insights on customer
          satisfaction and feedback without any need for manual intervention or
          tedious programming tasks.
        </p>
        <Link
          href="/analyze-own-reviews"
          className="text-2xl border-2 border-customBlue px-6 py-2 rounded-2xl"
        >
          Try it by yourself!
        </Link>
      </div>
    </>
  );
}
