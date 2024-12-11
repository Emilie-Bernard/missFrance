/*
  Warnings:

  - You are about to drop the column `note` on the `MissGrade` table. All the data in the column will be lost.
  - Added the required column `finalNote` to the `MissGrade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `missId` to the `MissGrade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MissGrade" DROP COLUMN "note",
ADD COLUMN     "finalNote" INTEGER NOT NULL,
ADD COLUMN     "missId" TEXT NOT NULL;
