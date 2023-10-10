-- CreateEnum
CREATE TYPE "ESentiment" AS ENUM ('Positive', 'Negative');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoviesAnalysis" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "positiveReviews" INTEGER NOT NULL,
    "negiveReviews" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wordsAvg" INTEGER NOT NULL,
    "wordsCloudPath" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MoviesAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "summarization" TEXT NOT NULL,
    "sentiment" "ESentiment" NOT NULL,
    "positiveProbability" DOUBLE PRECISION NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "analysisId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "positiveReviewsCount" INTEGER NOT NULL,
    "negativeReviewsCount" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoviesAnalysis_userId_key" ON "MoviesAnalysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- AddForeignKey
ALTER TABLE "MoviesAnalysis" ADD CONSTRAINT "MoviesAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "MoviesAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
