/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissions" TEXT[];

-- DropTable
DROP TABLE "Permission";
