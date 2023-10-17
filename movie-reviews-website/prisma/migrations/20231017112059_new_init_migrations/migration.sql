-- CreateEnum
CREATE TYPE "ESentiment" AS ENUM ('Positive', 'Negative');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoviesAnalysis" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sentimentalAnalysisModel" TEXT NOT NULL DEFAULT '',
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
    "authorId" TEXT NOT NULL,

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

-- CreateTable
CREATE TABLE "Keywords" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "Keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeywordsToReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_word_key" ON "Keywords"("word");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordsToReview_AB_unique" ON "_KeywordsToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordsToReview_B_index" ON "_KeywordsToReview"("B");

-- AddForeignKey
ALTER TABLE "MoviesAnalysis" ADD CONSTRAINT "MoviesAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "MoviesAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordsToReview" ADD CONSTRAINT "_KeywordsToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordsToReview" ADD CONSTRAINT "_KeywordsToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
