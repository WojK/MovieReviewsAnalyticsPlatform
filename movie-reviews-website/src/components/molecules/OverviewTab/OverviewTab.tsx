import React from "react";
import { OverviewTabProps } from "./OverviewTab.types";
import { useAppContextState } from "@/contexts/AppContext";
import { ResultBadge } from "@/components/atoms/ResultBadge";
import Image from "next/image";

export function OverviewTab({
  positiveReviewsCount,
  negativeReviewsCount,
  averageWordsCount,
  image,
}: OverviewTabProps) {
  const { sentimentalAnalysisModelName } = useAppContextState();

  return (
    <div className="mt-6 flex gap-x-5">
      <div>
        <h2 className="text-lg font-bold">
          Results based on
          <span className="text-customBlue ml-2">
            {sentimentalAnalysisModelName}
          </span>
        </h2>
        <div className="flex gap-x-[5vw] mt-8">
          <div className="grid grid-cols-2 mt-8 gap-y-5 w-[550px] h-fit">
            <ResultBadge
              count={negativeReviewsCount}
              color="red"
              title="Negative reviews count:"
            />
            <ResultBadge
              count={positiveReviewsCount}
              color="green"
              title="Positive reviews count:"
            />
            <div className="col-span-2">
              <ResultBadge
                count={averageWordsCount}
                color="blue"
                title="Average words count:"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-[60vw] h-[30vw]">
        <Image
          src={image}
          fill
          alt="world cloud"
          className="object-contain object-top"
        />
      </div>
    </div>
  );
}
