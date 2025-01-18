import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

async function main() {
  const prisma = new PrismaClient();

  const usuarios = await prisma.usuario.findMany();
  const ciudades = await prisma.ciudad.findMany();
  const estados = await prisma.estado.findMany();
  const proveedores = await prisma.proveedor.findMany();
  const clientes = await prisma.cliente.findMany();
  const servicios = await prisma.servicio.findMany();

  // Crear Direcciones
  const direcciones = [];
  for (let i = 0; i < 20; i++) {
    const direccion = await prisma.direccion.create({
      data: {
        nombre: faker.location.streetAddress().substring(0, 100),
        calle: faker.location.streetAddress().substring(0, 100),
        numero: faker.location.buildingNumber().substring(0, 20),
        ciudad_id: faker.helpers.arrayElement(ciudades).ciudad_id,
      },
    });
    direcciones.push(direccion.direccion_id);
  }
  console.log(`Direcciones creadas: ${direcciones.length}`);

  // Crear Comentarios
  for (let i = 0; i < 20; i++) {
    await prisma.comentario.create({
      data: {
        usuario_comentador_id: faker.helpers.arrayElement(usuarios).usuario_id,
        usuario_comentado_id: faker.helpers.arrayElement(usuarios).usuario_id,
        comentario: faker.lorem.sentence(),
        fecha_comentario: faker.date.past(),
      },
    });
  }
  console.log(`Comentarios creados: 20`);

  // Crear Contratos
  for (let i = 0; i < 10; i++) {
    await prisma.contrato.create({
      data: {
        cliente_id: faker.helpers.arrayElement(clientes).cliente_id,
        proveedor_id: faker.helpers.arrayElement(proveedores).proveedor_id,
        fecha_inicio: faker.date.past(),
        fecha_fin: faker.date.future(),
        cantidad_horas: faker.number.int({ min: 1, max: 100 }),
        monto_acordado: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
        fecha_creacion: faker.date.past(),
        servicio_id: faker.helpers.arrayElement(servicios).servicio_id,
        estado_contrato_id: faker.helpers.arrayElement(estados).estado_id,
        decision_cliente: faker.lorem.sentence(),
        decision_proveedor: faker.lorem.sentence(),
      },
    });
  }
  console.log(`Contratos creados: 10`);

  // Crear Conversaciones
  for (let i = 0; i < 10; i++) {
    await prisma.conversacion.create({
      data: {
        usuario_receptor_id: faker.helpers.arrayElement(usuarios).usuario_id,
        usuario_remitente_id: faker.helpers.arrayElement(usuarios).usuario_id,
        fecha_creacion: faker.date.past(),
      },
    });
  }
  console.log(`Conversaciones creadas: 10`);

  // Crear Mensajes
  for (let i = 0; i < 50; i++) {
    await prisma.mensaje.create({
      data: {
        remitente_id: faker.helpers.arrayElement(usuarios).usuario_id,
        conversacion_id: faker.number.int({ min: 1, max: 10 }),
        mensaje: faker.lorem.sentence(),
        fecha_creacion: faker.date.past(),
      },
    });
  }
  console.log(`Mensajes creados: 50`);

  // Crear Puntuaciones
  for (let i = 0; i < 20; i++) {
    await prisma.puntuacion.create({
      data: {
        usuario_calificado_id: faker.helpers.arrayElement(usuarios).usuario_id,
        usuario_calificador_id: faker.helpers.arrayElement(usuarios).usuario_id,
        puntuacion: faker.number.int({ min: 1, max: 5 }),
        fecha_puntuacion: faker.date.past(),
      },
    });
  }
  console.log(`Puntuaciones creadas: 20`);

  // Crear Servicios
  for (let i = 0; i < 10; i++) {
    await prisma.servicio.create({
      data: {
        proveedor_id: faker.helpers.arrayElement(proveedores).proveedor_id,
        cliente_id: faker.helpers.arrayElement(clientes).cliente_id,
        nombre_servicio: faker.lorem.words(3).substring(0, 100),
      },
    });
  }
  console.log(`Servicios creados: 10`);

  // Asignar Rangos Monetarios a Proveedores y Clientes
  for (const proveedor of proveedores) {
    await prisma.proveedor.update({
      where: { proveedor_id: proveedor.proveedor_id },
      data: {
        rango_monetario_id: faker.number.int({ min: 1, max: 100 }),
      },
    });
  }
  console.log(`Rangos Monetarios asignados a Proveedores`);

  for (const cliente of clientes) {
    await prisma.cliente.update({
      where: { cliente_id: cliente.cliente_id },
      data: {
        rango_monetario_id: faker.number.int({ min: 1, max: 100 }),
      },
    });
  }
  console.log(`Rangos Monetarios asignados a Clientes`);

  await prisma.$disconnect(); // Cierra la conexión al final
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
