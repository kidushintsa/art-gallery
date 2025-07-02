/*
  Warnings:

  - Added the required column `category` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artwork` ADD COLUMN `category` ENUM('PAINTING', 'SCLUPTURE', 'PHOTOGRAPHY') NOT NULL,
    ADD COLUMN `purchased` BOOLEAN NOT NULL DEFAULT false;
