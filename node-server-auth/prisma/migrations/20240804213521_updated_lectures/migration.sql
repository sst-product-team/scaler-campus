/*
  Warnings:

  - Added the required column `attendance_type` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecture_date` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lecture` ADD COLUMN `attendance_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `end_time` TIMESTAMP(6) NOT NULL,
    ADD COLUMN `lecture_date` DATE NOT NULL,
    ADD COLUMN `mininum_attendance` INTEGER NOT NULL DEFAULT 75,
    ADD COLUMN `start_time` TIMESTAMP(6) NOT NULL;
