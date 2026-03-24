-- AlterTable
ALTER TABLE "EventReward" ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "place" INTEGER NOT NULL DEFAULT 1;
