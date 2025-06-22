/*
  Warnings:

  - You are about to drop the `userinfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userinfo` DROP FOREIGN KEY `UserInfo_userId_fkey`;

-- DropTable
DROP TABLE `userinfo`;
