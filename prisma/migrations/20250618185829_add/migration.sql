/*
  Warnings:

  - Added the required column `AccountHolderName` to the `ArtistProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artistprofile` ADD COLUMN `AccountHolderName` VARCHAR(191) NOT NULL;
