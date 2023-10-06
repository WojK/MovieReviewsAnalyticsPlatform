import React from "react";
import { ResultBadgeProps } from "./ResultBadge.types";
import { clsx } from "clsx";

export function ResultBadge({ color, count, title }: ResultBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 font-bold text-lg">{title}</h3>
      <div
        className={clsx(
          color === "green" && "bg-[#087D0D]",
          color === "red" && "bg-[#FF0000]",
          color === "blue" && "bg-[#0085FF]",
          "w-[160px] h-[160px] flex justify-center items-center rounded-full shadow-lg text-4xl font-bold text-[#FFFFFF]"
        )}
      >
        {count}
      </div>
    </div>
  );
}
