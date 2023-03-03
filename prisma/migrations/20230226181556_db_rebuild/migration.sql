/*
  Warnings:

  - You are about to drop the column `country` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `newsletter` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Datos` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Datos` table. All the data in the column will be lost.
  - Added the required column `company_email` to the `Datos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `Datos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Datos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_type` to the `Datos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Datos` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Datos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Datos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Datos` DROP COLUMN `country`,
    DROP COLUMN `date_of_birth`,
    DROP COLUMN `email`,
    DROP COLUMN `first_name`,
    DROP COLUMN `gender`,
    DROP COLUMN `last_name`,
    DROP COLUMN `newsletter`,
    DROP COLUMN `phone`,
    DROP COLUMN `picture`,
    ADD COLUMN `company_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `company_image` LONGBLOB NULL,
    ADD COLUMN `company_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `job_type` ENUM('FULL_TIME', 'FREELANCE', 'TEMPORARY', 'CONTRACT') NOT NULL,
    ADD COLUMN `tags` JSON NULL,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;
