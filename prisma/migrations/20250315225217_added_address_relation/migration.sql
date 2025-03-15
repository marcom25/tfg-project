-- AlterTable
ALTER TABLE "contrato" ADD COLUMN     "direccion_id" INTEGER;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_direccion_id_fkey" FOREIGN KEY ("direccion_id") REFERENCES "direccion"("direccion_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
