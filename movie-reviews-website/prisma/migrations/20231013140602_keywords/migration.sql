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
CREATE UNIQUE INDEX "Keywords_word_key" ON "Keywords"("word");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordsToReview_AB_unique" ON "_KeywordsToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordsToReview_B_index" ON "_KeywordsToReview"("B");

-- AddForeignKey
ALTER TABLE "_KeywordsToReview" ADD CONSTRAINT "_KeywordsToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordsToReview" ADD CONSTRAINT "_KeywordsToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
