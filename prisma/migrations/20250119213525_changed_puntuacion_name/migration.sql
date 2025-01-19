-- CreateTable
CREATE TABLE "ciudad" (
    "ciudad_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "provincia_id" INTEGER,

    CONSTRAINT "ciudad_pkey" PRIMARY KEY ("ciudad_id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "cliente_id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "rango_id" INTEGER,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "comentario" (
    "comentario_id" SERIAL NOT NULL,
    "comentador_id" INTEGER NOT NULL,
    "comentado_id" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("comentario_id")
);

-- CreateTable
CREATE TABLE "contrato" (
    "contrato_id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(6) NOT NULL,
    "fecha_fin" TIMESTAMP(6) NOT NULL,
    "horas" INTEGER NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fecha_creado" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "servicio_id" INTEGER NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "decision_cli" TEXT NOT NULL,
    "decision_prov" TEXT NOT NULL,

    CONSTRAINT "contrato_pkey" PRIMARY KEY ("contrato_id")
);

-- CreateTable
CREATE TABLE "conversacion" (
    "conversacion_id" SERIAL NOT NULL,
    "receptor_id" INTEGER NOT NULL,
    "remitente_id" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversacion_pkey" PRIMARY KEY ("conversacion_id")
);

-- CreateTable
CREATE TABLE "direccion" (
    "direccion_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "calle" VARCHAR(100),
    "numero" VARCHAR(20),
    "ciudad_id" INTEGER NOT NULL,

    CONSTRAINT "direccion_pkey" PRIMARY KEY ("direccion_id")
);

-- CreateTable
CREATE TABLE "estado" (
    "estado_id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("estado_id")
);

-- CreateTable
CREATE TABLE "mensaje" (
    "mensaje_id" SERIAL NOT NULL,
    "remitente_id" INTEGER NOT NULL,
    "conversacion_id" INTEGER,
    "texto" TEXT NOT NULL,
    "fecha_creado" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensaje_pkey" PRIMARY KEY ("mensaje_id")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "proveedor_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "experiencia" TEXT,
    "rango_id" INTEGER,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("proveedor_id")
);

-- CreateTable
CREATE TABLE "provincia" (
    "provincia_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "provincia_pkey" PRIMARY KEY ("provincia_id")
);

-- CreateTable
CREATE TABLE "puntuacion" (
    "puntuacion_id" SERIAL NOT NULL,
    "calificado_id" INTEGER NOT NULL,
    "calificador_id" INTEGER NOT NULL,
    "puntuacion" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "puntuacion_pkey" PRIMARY KEY ("puntuacion_id")
);

-- CreateTable
CREATE TABLE "rango_monetario" (
    "rango_id" SERIAL NOT NULL,
    "minimo" DECIMAL(10,2),
    "maximo" DECIMAL(10,2),

    CONSTRAINT "rango_monetario_pkey" PRIMARY KEY ("rango_id")
);

-- CreateTable
CREATE TABLE "rol" (
    "rol_id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "rol_usuario" (
    "usuario_id" INTEGER NOT NULL,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "rol_usuario_pkey" PRIMARY KEY ("usuario_id","rol_id")
);

-- CreateTable
CREATE TABLE "servicio" (
    "servicio_id" SERIAL NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "servicio_pkey" PRIMARY KEY ("servicio_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usuario_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "apellido" VARCHAR(100),
    "descripcion" TEXT,
    "direccion_id" INTEGER,
    "email" VARCHAR(150) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(20),
    "imagen_id" INTEGER,
    "ultimo_ingreso" TIMESTAMP(6),
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "ciudad" ADD CONSTRAINT "ciudad_provincia_id_fkey" FOREIGN KEY ("provincia_id") REFERENCES "provincia"("provincia_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_comentado_id_fkey" FOREIGN KEY ("comentado_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_comentador_id_fkey" FOREIGN KEY ("comentador_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estado"("estado_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("proveedor_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicio"("servicio_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversacion" ADD CONSTRAINT "conversacion_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversacion" ADD CONSTRAINT "conversacion_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "direccion" ADD CONSTRAINT "direccion_ciudad_id_fkey" FOREIGN KEY ("ciudad_id") REFERENCES "ciudad"("ciudad_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_conversacion_id_fkey" FOREIGN KEY ("conversacion_id") REFERENCES "conversacion"("conversacion_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proveedor" ADD CONSTRAINT "proveedor_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puntuacion" ADD CONSTRAINT "puntuacion_calificado_id_fkey" FOREIGN KEY ("calificado_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puntuacion" ADD CONSTRAINT "puntuacion_calificador_id_fkey" FOREIGN KEY ("calificador_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rol_usuario" ADD CONSTRAINT "rol_usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rol_usuario" ADD CONSTRAINT "rol_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("proveedor_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_direccion_id_fkey" FOREIGN KEY ("direccion_id") REFERENCES "direccion"("direccion_id") ON DELETE SET NULL ON UPDATE NO ACTION;
