/*
  Warnings:

  - You are about to drop the column `observacions` on the `Datos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Datos` DROP COLUMN `observacions`,
    ADD COLUMN `observaciones` VARCHAR(191) NULL;
