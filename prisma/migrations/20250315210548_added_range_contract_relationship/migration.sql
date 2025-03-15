/*
  Warnings:

  - You are about to drop the column `rango_monetario_id` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `rango_monetario_id` on the `proveedor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[proveedor_id]` on the table `servicio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cliente_id]` on the table `servicio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "contrato" DROP CONSTRAINT "contrato_estado_id_fkey";

-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "rango_monetario_id";

-- AlterTable
ALTER TABLE "contrato" ADD COLUMN     "rango_monetario_cliente_id" INTEGER,
ADD COLUMN     "rango_monetario_proveedor_id" INTEGER,
ALTER COLUMN "estado_id" DROP NOT NULL,
ALTER COLUMN "decision_cliente" DROP NOT NULL,
ALTER COLUMN "decision_proveedor" DROP NOT NULL,
ALTER COLUMN "monto_acordado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "proveedor" DROP COLUMN "rango_monetario_id";

-- CreateIndex
CREATE UNIQUE INDEX "servicio_proveedor_id_key" ON "servicio"("proveedor_id");

-- CreateIndex
CREATE UNIQUE INDEX "servicio_cliente_id_key" ON "servicio"("cliente_id");

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estado"("estado_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_rango_monetario_cliente_id_fkey" FOREIGN KEY ("rango_monetario_cliente_id") REFERENCES "rango_monetario"("rango_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_rango_monetario_proveedor_id_fkey" FOREIGN KEY ("rango_monetario_proveedor_id") REFERENCES "rango_monetario"("rango_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
