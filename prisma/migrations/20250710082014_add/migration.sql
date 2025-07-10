-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_artworkId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_artworkId_fkey` ON `orderitem`;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `Artwork`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
