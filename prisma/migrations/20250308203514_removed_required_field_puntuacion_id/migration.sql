/*
  Warnings:

  - A unique constraint covering the columns `[puntuacion_id]` on the table `comentario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comentario_id]` on the table `puntuacion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `comentario_id` to the `puntuacion` table without a default value. This is not possible if the table is not empty.
  - Made the column `puntuacion` on table `puntuacion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comentario" ADD COLUMN     "puntuacion_id" INTEGER;

-- AlterTable
ALTER TABLE "puntuacion" ADD COLUMN     "comentario_id" INTEGER NOT NULL,
ALTER COLUMN "puntuacion" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "comentario_puntuacion_id_key" ON "comentario"("puntuacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "puntuacion_comentario_id_key" ON "puntuacion"("comentario_id");

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_puntuacion_id_fkey" FOREIGN KEY ("puntuacion_id") REFERENCES "puntuacion"("puntuacion_id") ON DELETE SET NULL ON UPDATE CASCADE;
