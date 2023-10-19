import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import prisma from "@/dbContext";

export async function POST(request: Request) {
  const body = await request.json();

  const userId = body.userId;
  const title = body.title;
  const posReviews = body.posReviews;
  const negReviews = body.negReviews;
  const wordsAvg = body.wordsAvg;
  const wordsCloudPath = body.wordsCloudPath;
  const reviews = body.reviews;
  const sentimentalAnalysisModel = body.sentimentalAnalysisModel;

  const movieTitles = new Set();
  reviews.forEach((review: any) => {
    movieTitles.add(review.title);
  });

  const allMoviesTitles = Array.from(movieTitles);

  const moviesInserted = await prisma.movie.findMany({
    where: {
      title: { in: allMoviesTitles as string[] },
    },
  });

  const moviesInsertedTitles = moviesInserted.map((m) => m.title);

  const newMovieTitlesToInsert = allMoviesTitles.filter(
    (m: any) => moviesInsertedTitles.indexOf(m) == -1
  );

  await prisma.movie.createMany({
    data: newMovieTitlesToInsert.map((m) => {
      return {
        title: m as string,
        positiveReviewsCount: 0,
        negativeReviewsCount: 0,
      };
    }),
  });

  const movieAnalysisDb = await prisma.moviesAnalysis.create({
    data: {
      title: title,
      sentimentalAnalysisModel: sentimentalAnalysisModel,
      positiveReviews: posReviews,
      negiveReviews: negReviews,
      wordsAvg: wordsAvg,
      wordsCloudPath: wordsCloudPath,
      userId: userId,
    },
  });

  reviews.forEach(async (r: any) => {
    const reviewMovie = await prisma.movie.findFirst({
      where: {
        title: r.title,
      },
    });

    const reviewDB = await prisma.review.create({
      data: {
        text: r.text,
        summarization: r.summarization,
        sentiment: r.sentiment,
        positiveProbability: r.positiveProbability,
        isPublic: true,
        analysisId: movieAnalysisDb.id,
        movieId: reviewMovie?.id || 0,
        authorId: userId,
      },
    });

    const reviewKw = r.keywords;

    reviewKw.forEach(async (k: any) => {
      await prisma.keywords.upsert({
        where: { word: k },
        create: { word: k, reviews: { connect: { id: reviewDB.id } } },
        update: {
          reviews: {
            connect: { id: reviewDB.id },
          },
        },
      });
    });
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
  return new Response("Added data to user history", { status: 200 });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id !== null) {
    const analysis = await prisma.moviesAnalysis.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        reviews: {
          include: {
            movie: {
              select: {
                title: true,
              },
            },
            keywords: {
              select: {
                word: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(analysis), { status: 200 });
  }

  return new Response("Not found", { status: 405 });
}
