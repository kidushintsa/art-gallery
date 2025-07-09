-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `payoutStatus` ENUM('UNPAID', 'PAID') NOT NULL DEFAULT 'UNPAID';
