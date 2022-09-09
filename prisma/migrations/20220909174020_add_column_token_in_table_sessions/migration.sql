/*
  Warnings:

  - Added the required column `token` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "token" TEXT NOT NULL;
