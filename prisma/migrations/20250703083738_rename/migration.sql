/*
  Warnings:

  - The values [SCLUPTURE] on the enum `Artwork_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `artwork` MODIFY `category` ENUM('PAINTING', 'SCULPTURE', 'PHOTOGRAPHY') NULL;
