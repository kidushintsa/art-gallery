-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `artistGetPaid` ENUM('UNPAID', 'PAID') NOT NULL DEFAULT 'UNPAID';
