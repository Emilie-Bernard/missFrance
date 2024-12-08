/*
  Warnings:

  - You are about to drop the column `quizz` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "quizz",
ADD COLUMN     "quiz" INTEGER NOT NULL DEFAULT 0;
