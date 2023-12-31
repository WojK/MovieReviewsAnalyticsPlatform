"use client";

import React from "react";
import { RankingItemProps } from "./RankingItem.types";
import { FileText, Smile, ThumbsDown, ThumbsUp } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

export function RankingItem({
  id,
  title,
  number,
  all,
  positive,
  negative,
  ratio,
}: RankingItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-[70%]"
    >
      <Link
        href={`/movie/${id}`}
        className={clsx(
          "flex flex-row rounded-xl py-3 px-8 items-center justify-between border-2 w-full",
          number % 2 === 0 && "border-customBlue",
          number % 2 !== 0 && "border-[#39ba59]"
        )}
      >
        <div className="flex ">
          <p className="text-xl font-semibold mr-8 border rounded-full px-2">
            {number}.
          </p>
          <p className="text-xl font-semibold">{title}</p>
        </div>
        <div className="flex flex-row w-[35%] justify-between text-xl font-semibold mr-10">
          <div className="flex gap-x-2 items-center">
            <FileText /> <p>{all}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <ThumbsUp color="#10651e" />
            <p>{positive}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <ThumbsDown color="#651014" /> <p>{negative}</p>
          </div>
          <div className="flex gap-x-2 items-center min-w-[100px]">
            <Smile color="#999400" />
            <p>{ratio}%</p>
          </div>
        </div>
      </Link>
    </motion.button>
  );
}
