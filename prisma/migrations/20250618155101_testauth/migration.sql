/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `artistprofile` DROP FOREIGN KEY `ArtistProfile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `artwork` DROP FOREIGN KEY `Artwork_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `payout` DROP FOREIGN KEY `Payout_artistId_fkey`;

-- DropIndex
DROP INDEX `Artwork_artistId_fkey` ON `artwork`;

-- DropIndex
DROP INDEX `CartItem_userId_fkey` ON `cartitem`;

-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `OrderItem_artistId_fkey` ON `orderitem`;

-- DropIndex
DROP INDEX `Payout_artistId_fkey` ON `payout`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createdAt`,
    DROP COLUMN `hashedPassword`,
    DROP COLUMN `role`;
