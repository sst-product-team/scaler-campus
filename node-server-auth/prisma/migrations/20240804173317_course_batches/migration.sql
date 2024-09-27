/*
  Warnings:

  - You are about to drop the `CourseStudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `CourseStudents`;

-- CreateTable
CREATE TABLE `CourseBatches` (
    `course_id` INTEGER NOT NULL,
    `batch_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`course_id`, `batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
