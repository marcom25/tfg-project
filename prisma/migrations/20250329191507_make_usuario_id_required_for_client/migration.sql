/*
  Warnings:

  - Made the column `usuario_id` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cliente" ALTER COLUMN "usuario_id" SET NOT NULL;
