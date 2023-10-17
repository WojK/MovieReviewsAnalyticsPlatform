-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_analysisId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "MoviesAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
