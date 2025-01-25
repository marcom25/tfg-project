import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

async function main() {
  const prisma = new PrismaClient();

  // Crear Usuarios
  const usuarios = [];
  for (let i = 0; i < 20; i++) {
    const usuario = await prisma.usuario.create({
      data: {
        nombre: faker.person.firstName().substring(0, 50),
        apellido: faker.person.lastName().substring(0, 50),
        descripcion: faker.lorem.sentence().substring(0, 255),
        email: faker.internet.email().substring(0, 100),
        contrasena: faker.internet.password().substring(0, 100),
        telefono: faker.phone.number().substring(0, 15),
        fecha_registro: faker.date.past(),
        direccion: {
          create: {
            nombre: faker.location.streetAddress().substring(0, 100),
            calle: faker.location.streetAddress().substring(0, 100),
            numero: faker.location.buildingNumber().substring(0, 10),
            ciudad_id: faker.number.int({ min: 1, max: 10 }),
          },
        },
        rol_usuario: {
          create: {
            rol_id: faker.helpers.arrayElement([1, 2]),
          },
        },
      },
    });
    usuarios.push(usuario.usuario_id); // Guardar el ID
  }

  console.log(`Usuarios creados: ${usuarios.length}`);

  // Crear Clientes usando IDs válidos
  for (let i = 0; i < 10; i++) {
    const cliente = await prisma.cliente.create({
      data: {
        usuario_id: faker.helpers.arrayElement(usuarios), // Usar un ID válido
      },
    });
    console.log(`Cliente creado: ID ${cliente.cliente_id}`);
  }

  // Crear Proveedores usando IDs válidos
  for (let i = 0; i < 10; i++) {
    const proveedor = await prisma.proveedor.create({
      data: {
        usuario_id: faker.helpers.arrayElement(usuarios), // Usar un ID válido
        experiencia: faker.lorem.paragraph(),
      },
    });
    console.log(`Proveedor creado: ID ${proveedor.proveedor_id}`);
  }

  await prisma.$disconnect(); // Cierra la conexión al final
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
