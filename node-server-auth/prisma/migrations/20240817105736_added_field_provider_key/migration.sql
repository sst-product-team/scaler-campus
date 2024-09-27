/*
  Warnings:

  - Added the required column `provider_key` to the `SSOProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SSOProvider` ADD COLUMN `provider_key` VARCHAR(191) NOT NULL;
