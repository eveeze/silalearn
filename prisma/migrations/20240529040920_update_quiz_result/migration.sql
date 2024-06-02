-- DropForeignKey
ALTER TABLE `quizresult` DROP FOREIGN KEY `QuizResult_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `quizresult` DROP FOREIGN KEY `QuizResult_userId_fkey`;

-- AddForeignKey
ALTER TABLE `QuizResult` ADD CONSTRAINT `QuizResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizResult` ADD CONSTRAINT `QuizResult_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
