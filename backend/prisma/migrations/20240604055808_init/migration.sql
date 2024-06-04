/*
  Warnings:

  - Made the column `nickname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_nickname_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nickname" SET NOT NULL;
