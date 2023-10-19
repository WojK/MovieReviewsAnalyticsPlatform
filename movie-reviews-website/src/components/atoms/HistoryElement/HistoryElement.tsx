import React from "react";
import { HistoryElementProps } from "./HistoryElement.types";
import Link from "next/link";

export function HistoryElement({
  id,
  title,
  date,
  moviesCount,
  reviewsCount,
  positive,
  negative,
  sentimentModel,
}: HistoryElementProps) {
  return (
    <Link
      href={`/analysis/${id}`}
      className="min-w-[320px] min-h-[320px] p-8 border border-customBlue shadow-lg rounded-xl hover:scale-105 duration-300"
    >
      <div className="flex items-center flex-col">
        <h3 className="text-xl text-customBlue font-medium">{title}</h3>
        <p className="opacity-60">{date}</p>
      </div>
      <div className="mt-10 flex flex-col gap-2 text-lg">
        <p>Movie Reviews Count: {reviewsCount}</p>
        <p>Distinct Movies: {moviesCount}</p>
        <p>Model: {sentimentModel}</p>
        <p>
          Positive: <span className="text-[#087D0D]">{positive}</span>
        </p>
        <p>
          Negative: <span className="text-[#FF0000]">{negative}</span>
        </p>
      </div>
    </Link>
  );
}
