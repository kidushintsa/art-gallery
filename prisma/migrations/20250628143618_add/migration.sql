/*
  Warnings:

  - You are about to drop the column `categorty` on the `complaint` table. All the data in the column will be lost.
  - Added the required column `category` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `complaint` DROP COLUMN `categorty`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;
