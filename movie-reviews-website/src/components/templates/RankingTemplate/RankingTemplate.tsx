import React from "react";
import { RankingItem } from "@/components/atoms/RankingItem";
import { auth } from "@clerk/nextjs";
import prisma from "@/dbContext";

const getRankingItems = async () => {
  const { userId } = auth();

  if (userId !== null) {
    const output = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        reviews: {
          select: {
            sentiment: true,
            movie: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });
    return output;
  }
};

export async function RankingTemplate() {
  const ranking = await getRankingItems();

  const rankItems: {
    id: number;
    title: string;
    positive: number;
    negative: number;
    all: number;
    ratio: number;
  }[] = [];

  const movies = new Map<
    number,
    {
      id: number;
      title: string;
      positive: number;
      negative: number;
    }
  >();

  ranking?.reviews.forEach((i) => {
    if (!movies.has(i.movie.id)) {
      if (i.sentiment === "Positive") {
        movies.set(i.movie.id, {
          id: i.movie.id,
          title: i.movie.title,
          positive: 1,
          negative: 0,
        });
      } else {
        movies.set(i.movie.id, {
          id: i.movie.id,
          title: i.movie.title,
          positive: 0,
          negative: 1,
        });
      }
    } else {
      const valueToUpdate = movies.get(i.movie.id);
      if (valueToUpdate) {
        if (i.sentiment === "Positive") {
          valueToUpdate.positive = valueToUpdate.positive + 1;
          movies.set(i.movie.id, valueToUpdate);
        } else {
          valueToUpdate.positive = valueToUpdate.negative + 1;
          movies.set(i.movie.id, valueToUpdate);
        }
      }
    }
  });

  movies.forEach((m) => {
    rankItems.push({
      id: m.id,
      title: m.title,
      all: m.positive + m.negative,
      positive: m.positive,
      negative: m.negative,
      ratio: Math.floor((m.positive / (m.positive + m.negative)) * 100),
    });
  });

  rankItems.sort((a, b) => {
    return a.ratio < b.ratio ? 1 : -1;
  });

  return (
    <div className="py-12 px-14">
      <h1 className="text-customBlue text-3xl font-bold mb-2">Movies</h1>
      <p className="opacity-60">Based on your movie reviews</p>
      <p className="opacity-60 mb-16">
        Sorted descending by positive to all reviews ratio
      </p>

      <div className="flex flex-col gap-3 items-center w-full">
        {rankItems.map((movie, index) => {
          return (
            <RankingItem
              id={movie.id}
              key={movie.title}
              title={movie.title}
              number={index + 1}
              positive={movie.positive}
              negative={movie.negative}
              ratio={movie.ratio}
              all={movie.all}
            />
          );
        })}
      </div>
    </div>
  );
}
