ALTER TYPE "UserRole" RENAME TO "UserRole_old";

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ORGANIZER', 'PARTICIPANT', 'OBSERVER');

ALTER TABLE "User"
ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "User"
ALTER COLUMN "role" TYPE "UserRole"
USING (
  CASE
    WHEN "role"::text = 'MODERATOR' THEN 'ADMIN'
    ELSE "role"::text
  END
)::"UserRole";

ALTER TABLE "User"
ALTER COLUMN "role" SET DEFAULT 'PARTICIPANT';

DROP TYPE "UserRole_old";

CREATE TABLE "ObserverFavorite" (
  "id" TEXT NOT NULL,
  "observerId" TEXT NOT NULL,
  "participantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ObserverFavorite_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ObserverFavorite_observerId_participantId_key"
ON "ObserverFavorite"("observerId", "participantId");

ALTER TABLE "ObserverFavorite"
ADD CONSTRAINT "ObserverFavorite_observerId_fkey"
FOREIGN KEY ("observerId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ObserverFavorite"
ADD CONSTRAINT "ObserverFavorite_participantId_fkey"
FOREIGN KEY ("participantId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
