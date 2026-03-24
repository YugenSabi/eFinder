-- CreateTable
CREATE TABLE "EventScoreWeight" (
    "id" TEXT NOT NULL,
    "direction" "EventDirection" NOT NULL,
    "difficulty" "EventDifficulty" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventScoreWeight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventScoreWeight_direction_difficulty_key" ON "EventScoreWeight"("direction", "difficulty");
