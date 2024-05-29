/*
  Warnings:

  - You are about to drop the column `options` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_courseId_fkey`;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `options`;

-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `courseId`;

-- CreateTable
CREATE TABLE `Option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,
    `questionId` INTEGER NOT NULL,

    UNIQUE INDEX `Option_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
