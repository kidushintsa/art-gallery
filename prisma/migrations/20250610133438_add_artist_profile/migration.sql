/*
  Warnings:

  - You are about to drop the column `payoutAccount` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `payoutMethod` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `payoutAccount`,
    DROP COLUMN `payoutMethod`;

-- CreateTable
CREATE TABLE `ArtistProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `payoutMethod` VARCHAR(191) NOT NULL,
    `payoutAccount` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,

    UNIQUE INDEX `ArtistProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtistProfile` ADD CONSTRAINT `ArtistProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
