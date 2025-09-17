/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Counsellor` table. All the data in the column will be lost.
  - The `speciality` column on the `Counsellor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `consern` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `counsellerType` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Counsellor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Made the column `level` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."CounsellorType" AS ENUM ('GENERAL_COUNSELOR', 'ACADEMIC_COUNSELOR', 'CLINICAL_PSYCHOLOGIST', 'PSYCHIATRIST', 'PEER_SUPPORT_VOLUNTEER');

-- AlterTable
ALTER TABLE "public"."Counsellor" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "speciality",
ADD COLUMN     "speciality" "public"."CounsellorType"[];

-- AlterTable
ALTER TABLE "public"."Ticket" DROP COLUMN "consern",
DROP COLUMN "counsellerType",
DROP COLUMN "discription",
ADD COLUMN     "concern" "public"."Concern"[],
ADD COLUMN     "counsellorType" "public"."CounsellorType",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP DEFAULT,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "public"."CounselorType";
