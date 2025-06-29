/*
  Warnings:

  - Added the required column `catagorty` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `complaint` ADD COLUMN `catagorty` VARCHAR(191) NOT NULL;
