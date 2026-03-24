-- CreateEnum
CREATE TYPE "OrganizerProfileStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "OrganizerProfile" ADD COLUMN     "organizationName" TEXT,
ADD COLUMN     "organizationRank" INTEGER,
ADD COLUMN     "status" "OrganizerProfileStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "vkUrl" TEXT,
ADD COLUMN     "websiteUrl" TEXT;
