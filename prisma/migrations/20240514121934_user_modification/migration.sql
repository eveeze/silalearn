/*
  Warnings:

  - You are about to drop the column `isBlocked` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `isBlocked` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `isBlocked`,
    DROP COLUMN `isEmailVerified`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `isBlocked`,
    DROP COLUMN `refreshToken`;
