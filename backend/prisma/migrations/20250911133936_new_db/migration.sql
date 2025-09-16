/*
  Warnings:

  - You are about to drop the column `allRatings` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `averageRating` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expertise` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `severity` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timing` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Made the column `studentId` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Severity" AS ENUM ('Normal', 'MEDIUM', 'Emergency');

-- CreateEnum
CREATE TYPE "public"."Concern" AS ENUM ('MOOD_EMOTIONS', 'ANXIETY_STRESS', 'SLEEP_ENERGY', 'ACADEMICS_PERFORMANCE', 'SOCIAL_RELATIONSHIPS', 'SELF_PERCEPTION', 'RISK_BEHAVIORS', 'PHYSICAL_HEALTH');

-- CreateEnum
CREATE TYPE "public"."CounselorType" AS ENUM ('GENERAL_COUNSELOR', 'ACADEMIC_COUNSELOR', 'CLINICAL_PSYCHOLOGIST', 'PSYCHIATRIST', 'PEER_SUPPORT_VOLUNTEER');

-- AlterEnum
ALTER TYPE "public"."TicketStatus" ADD VALUE 'SELECTED';

-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_counsellorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."Ticket" ADD COLUMN     "consern" "public"."Concern"[],
ADD COLUMN     "counsellerType" "public"."CounselorType",
ADD COLUMN     "meetingLocation" TEXT,
ADD COLUMN     "severity" "public"."Severity" NOT NULL,
ADD COLUMN     "timing" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "counsellorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "allRatings",
DROP COLUMN "averageRating",
DROP COLUMN "bio",
DROP COLUMN "experience",
DROP COLUMN "expertise",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "public"."Counsellor" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "bio" TEXT,
    "relatedSkills" TEXT[],
    "speciality" "public"."CounselorType"[],
    "averageRating" DOUBLE PRECISION,
    "allRatings" INTEGER[],
    "languages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Counsellor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counsellor_clerkId_key" ON "public"."Counsellor"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Counsellor_email_key" ON "public"."Counsellor"("email");

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_counsellorId_fkey" FOREIGN KEY ("counsellorId") REFERENCES "public"."Counsellor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
