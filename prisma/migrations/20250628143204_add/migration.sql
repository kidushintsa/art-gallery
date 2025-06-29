/*
  Warnings:

  - You are about to drop the column `catagorty` on the `complaint` table. All the data in the column will be lost.
  - Added the required column `categorty` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `complaint` DROP COLUMN `catagorty`,
    ADD COLUMN `categorty` VARCHAR(191) NOT NULL;
