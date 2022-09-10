/*
  Warnings:

  - You are about to drop the column `ExpirationDate` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "ExpirationDate",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
