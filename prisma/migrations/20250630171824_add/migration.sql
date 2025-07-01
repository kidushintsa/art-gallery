/*
  Warnings:

  - You are about to drop the column `approved` on the `artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `artwork` DROP COLUMN `approved`,
    ADD COLUMN `status` ENUM('APPROVED', 'REJECTED', 'PENDING') NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `complaint` ADD COLUMN `status` ENUM('PENDING', 'HANDLED') NOT NULL DEFAULT 'PENDING';
