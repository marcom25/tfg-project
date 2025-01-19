/*
  Warnings:

  - You are about to drop the column `rango_id` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `comentado_id` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the column `comentador_id` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the column `texto` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the column `decision_cli` on the `contrato` table. All the data in the column will be lost.
  - You are about to drop the column `decision_prov` on the `contrato` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_creado` on the `contrato` table. All the data in the column will be lost.
  - You are about to drop the column `horas` on the `contrato` table. All the data in the column will be lost.
  - You are about to drop the column `monto` on the `contrato` table. All the data in the column will be lost.
  - You are about to drop the column `receptor_id` on the `conversacion` table. All the data in the column will be lost.
  - You are about to drop the column `remitente_id` on the `conversacion` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `estado` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_creado` on the `mensaje` table. All the data in the column will be lost.
  - You are about to drop the column `texto` on the `mensaje` table. All the data in the column will be lost.
  - You are about to drop the column `rango_id` on the `proveedor` table. All the data in the column will be lost.
  - You are about to drop the column `calificado_id` on the `puntuacion` table. All the data in the column will be lost.
  - You are about to drop the column `calificador_id` on the `puntuacion` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `rol` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `servicio` table. All the data in the column will be lost.
  - You are about to drop the column `imagen_id` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `comentario` to the `comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_comentado_id` to the `comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_comentador_id` to the `comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad_horas` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decision_cliente` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decision_proveedor` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monto_acordado` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_receptor_id` to the `conversacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_remitente_id` to the `conversacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `estado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensaje` to the `mensaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_calificado_id` to the `puntuacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_calificador_id` to the `puntuacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_rol` to the `rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre_servicio` to the `servicio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_comentado_id_fkey";

-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_comentador_id_fkey";

-- DropForeignKey
ALTER TABLE "conversacion" DROP CONSTRAINT "conversacion_receptor_id_fkey";

-- DropForeignKey
ALTER TABLE "conversacion" DROP CONSTRAINT "conversacion_remitente_id_fkey";

-- DropForeignKey
ALTER TABLE "puntuacion" DROP CONSTRAINT "puntuacion_calificado_id_fkey";

-- DropForeignKey
ALTER TABLE "puntuacion" DROP CONSTRAINT "puntuacion_calificador_id_fkey";

-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "rango_id",
ADD COLUMN     "rango_monetario_id" INTEGER;

-- AlterTable
ALTER TABLE "comentario" DROP COLUMN "comentado_id",
DROP COLUMN "comentador_id",
DROP COLUMN "fecha",
DROP COLUMN "texto",
ADD COLUMN     "comentario" TEXT NOT NULL,
ADD COLUMN     "fecha_comentario" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usuario_comentado_id" INTEGER NOT NULL,
ADD COLUMN     "usuario_comentador_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contrato" DROP COLUMN "decision_cli",
DROP COLUMN "decision_prov",
DROP COLUMN "fecha_creado",
DROP COLUMN "horas",
DROP COLUMN "monto",
ADD COLUMN     "cantidad_horas" INTEGER NOT NULL,
ADD COLUMN     "decision_cliente" TEXT NOT NULL,
ADD COLUMN     "decision_proveedor" TEXT NOT NULL,
ADD COLUMN     "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "monto_acordado" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "conversacion" DROP COLUMN "receptor_id",
DROP COLUMN "remitente_id",
ADD COLUMN     "usuario_receptor_id" INTEGER NOT NULL,
ADD COLUMN     "usuario_remitente_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "estado" DROP COLUMN "nombre",
ADD COLUMN     "estado" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "mensaje" DROP COLUMN "fecha_creado",
DROP COLUMN "texto",
ADD COLUMN     "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mensaje" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "proveedor" DROP COLUMN "rango_id",
ADD COLUMN     "rango_monetario_id" INTEGER;

-- AlterTable
ALTER TABLE "puntuacion" DROP COLUMN "calificado_id",
DROP COLUMN "calificador_id",
ADD COLUMN     "usuario_calificado_id" INTEGER NOT NULL,
ADD COLUMN     "usuario_calificador_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rol" DROP COLUMN "nombre",
ADD COLUMN     "nombre_rol" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "servicio" DROP COLUMN "nombre",
ADD COLUMN     "nombre_servicio" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "imagen_id",
ADD COLUMN     "imagen_perfil_id" INTEGER;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_usuario_comentado_id_fkey" FOREIGN KEY ("usuario_comentado_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_usuario_comentador_id_fkey" FOREIGN KEY ("usuario_comentador_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversacion" ADD CONSTRAINT "conversacion_usuario_receptor_id_fkey" FOREIGN KEY ("usuario_receptor_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversacion" ADD CONSTRAINT "conversacion_usuario_remitente_id_fkey" FOREIGN KEY ("usuario_remitente_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puntuacion" ADD CONSTRAINT "puntuacion_usuario_calificado_id_fkey" FOREIGN KEY ("usuario_calificado_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puntuacion" ADD CONSTRAINT "puntuacion_usuario_calificador_id_fkey" FOREIGN KEY ("usuario_calificador_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;
