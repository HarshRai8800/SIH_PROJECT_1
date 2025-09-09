-- CreateEnum
CREATE TYPE "public"."Level" AS ENUM ('GENERAL', 'SPECIALASKING', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."MentalState" AS ENUM ('HEALTHY', 'SLIGHTLY_RISKY', 'MODERATE', 'BAD_SHAPE', 'SERIOUS');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'STUDENT', 'TEACHER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'STUDENT',
    "bio" TEXT,
    "expertise" TEXT[],
    "experience" TEXT,
    "averageRating" DOUBLE PRECISION,
    "allRatings" INTEGER[],
    "languages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TestResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "responses" JSONB,
    "phq9Score" INTEGER,
    "gad7Score" INTEGER,
    "ghq12Score" INTEGER,
    "interpretation" "public"."MentalState" NOT NULL DEFAULT 'HEALTHY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "id" SERIAL NOT NULL,
    "discription" TEXT NOT NULL,
    "status" "public"."TicketStatus" NOT NULL DEFAULT 'OPEN',
    "level" "public"."Level" NOT NULL DEFAULT 'GENERAL',
    "studentId" INTEGER,
    "counsellorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_counsellorId_fkey" FOREIGN KEY ("counsellorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
