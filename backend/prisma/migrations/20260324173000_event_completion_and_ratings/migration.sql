-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "Event"
ADD COLUMN "completedAt" TIMESTAMP(3),
ADD COLUMN "status" "EventStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "EventReward"
ADD COLUMN "platformPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Participation"
ADD COLUMN "place" INTEGER;

-- Backfill
WITH ranked_rewards AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (PARTITION BY "eventId" ORDER BY "id") AS "nextPlace"
  FROM "EventReward"
)
UPDATE "EventReward" AS reward
SET
  "place" = ranked_rewards."nextPlace",
  "platformPoints" = reward."points"
FROM ranked_rewards
WHERE reward."id" = ranked_rewards."id";

-- CreateIndex
CREATE UNIQUE INDEX "EventReward_eventId_place_key" ON "EventReward"("eventId", "place");
