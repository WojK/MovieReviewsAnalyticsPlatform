import { Title } from "@/components/atoms/Title";
import React from "react";
import { HISTORY_MOCK } from "@/__mocks__/history.mocks";
import { HistoryElement } from "@/components/atoms/HistoryElement";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

export const revalidate = 0;

const getUserAnalysisHistory = async () => {
  const prisma = new PrismaClient();
  const { userId } = auth();

  const userAnalysis = await prisma.moviesAnalysis.findMany({
    where: {
      userId: userId?.toString(),
    },
    include: {
      reviews: {
        select: {
          movie: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return userAnalysis.map((a) => {
    const distinctMoviesIds = new Set<number>();
    a.reviews.map((r) => {
      distinctMoviesIds.add(r.movie.id);
    });

    return {
      id: a.id,
      title: a.title,
      date: a.created.toDateString(),
      moviesCount: distinctMoviesIds.size,
      reviewsCount: a.positiveReviews + a.negiveReviews,
      positive: a.positiveReviews,
      negative: a.negiveReviews,
      sentimentModel: a.sentimentalAnalysisModel,
    };
  });
};

export async function HistoryTemplate() {
  const historyData = await getUserAnalysisHistory();

  return (
    <div className="py-12 px-14">
      <Title title="History" />
      {historyData.length === 0 && (
        <div className="flex justify-center">
          <Link
            href="/analyze-own-reviews"
            className="text-xl border-2 border-customBlue px-6 py-2 rounded-2xl ml-20"
          >
            Create your first analysis!
          </Link>
        </div>
      )}
      <div className="flex flex-row gap-20 flex-wrap justify-center mt-16 mx-20">
        {historyData.map((e) => {
          return (
            <HistoryElement
              id={e.id}
              key={e.id}
              title={e.title}
              date={e.date}
              reviewsCount={e.reviewsCount}
              moviesCount={e.moviesCount}
              positive={e.positive}
              negative={e.negative}
              sentimentModel={e.sentimentModel}
            />
          );
        })}
      </div>
    </div>
  );
}
