/*
  Warnings:

  - A unique constraint covering the columns `[chapaTxRef]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Orders_chapaTxRef_key` ON `Orders`(`chapaTxRef`);
