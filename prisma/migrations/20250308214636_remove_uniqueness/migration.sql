-- DropIndex
DROP INDEX "puntuacion_comentario_id_key";

-- AlterTable
ALTER TABLE "puntuacion" ALTER COLUMN "comentario_id" DROP NOT NULL;
