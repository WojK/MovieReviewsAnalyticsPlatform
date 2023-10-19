import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import prisma from "@/dbContext";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id !== null) {
    await prisma.moviesAnalysis.delete({
      where: {
        id: parseInt(id),
      },
    });

    const allMoviesDb = await prisma.movie.findMany();
    const moviesDict: any = {};

    allMoviesDb.map((m) => {
      moviesDict[m.id] = {
        id: m.id,
        title: m.title,
        posCount: 0,
        negCount: 0,
      };
    });

    const allReviewsDb = await prisma.review.findMany();
    allReviewsDb.forEach((r) => {
      if (r.sentiment === "Positive") {
        moviesDict[r.movieId].posCount += 1;
      } else {
        moviesDict[r.movieId].negCount += 1;
      }
    });

    for (const p in moviesDict) {
      await prisma.movie.update({
        where: {
          id: moviesDict[p].id,
        },
        data: {
          positiveReviewsCount: moviesDict[p].posCount,
          negativeReviewsCount: moviesDict[p].negCount,
        },
      });
    }

    revalidatePath("/history");
    return new Response("Deleted", { status: 200 });
  }
  return new Response("Not found", { status: 400 });
}
