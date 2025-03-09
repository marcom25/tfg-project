import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { provinciasData } from "./location.seed";

const prisma = new PrismaClient();

// Función auxiliar para elegir un elemento aleatorio de un arreglo
const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];


function getRandoma<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : undefined;
}
async function main() {
  // 1. Crear provincias y ciudades (sin cambios)

  const provincias = [];
  for (const data of provinciasData) {
    const prov = await prisma.provincia.create({
      data: {
        nombre: data.nombre,
        ciudades: {
          create: data.ciudades.create.filter((ciudad) => ciudad !== undefined),
        },
      },
      include: { ciudades: true },
    });
    provincias.push(prov);
  }
  console.log("Provincias creadas:", provincias);

  // 2. Obtener todas las ciudades para usarlas al crear direcciones
  const cities = await prisma.ciudad.findMany();

  // 3. Crear 10 direcciones con ciudad (y provincia) elegida aleatoriamente
  const direccionesPromises = [];
  for (let i = 1; i <= 10; i++) {
    const randomCity = getRandom(cities);
    direccionesPromises.push(
      prisma.direccion.create({
        data: {
          nombre: `Dirección ${i}`,
          calle: faker.location.street(),
          numero: faker.location.buildingNumber(),
          ciudad: { connect: { ciudad_id: randomCity.ciudad_id } },
        },
      })
    );
  }
  const direcciones = await Promise.all(direccionesPromises);
  console.log("Direcciones creadas:", direcciones);

  // 4. Crear roles (sin cambios)
  const roleCliente = await prisma.rol.create({
    data: { nombre_rol: "CLIENT" },
  });
  const roleProveedor = await prisma.rol.create({
    data: { nombre_rol: "PROVIDER" },
  });
  console.log("Roles creados:", { roleCliente, roleProveedor });

  // 5. Crear 20 usuarios (10 para CLIENTE y 10 para PROVEEDOR)
  const usersCliente = [];
  const usersProveedor = [];

  for (let i = 1; i <= 10; i++) {
    const randomAddress = getRandom(direcciones);
    const user = await prisma.usuario.create({
      data: {
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        email: faker.internet.email(),
        contrasena: faker.internet.password(),
        imagen_perfil_id: faker.image.avatar(),
        direccion: { connect: { direccion_id: randomAddress.direccion_id } },
        roles: { create: { rol: { connect: { rol_id: roleCliente.rol_id } } } },
      },
    });
    usersCliente.push(user);
  }

  for (let i = 1; i <= 10; i++) {
    const randomAddress = getRandom(direcciones);
    const user = await prisma.usuario.create({
      data: {
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        email: faker.internet.email(),
        contrasena: faker.internet.password(),
        imagen_perfil_id: faker.image.avatar(),
        direccion: { connect: { direccion_id: randomAddress.direccion_id } },
        roles: {
          create: { rol: { connect: { rol_id: roleProveedor.rol_id } } },
        },
      },
    });
    usersProveedor.push(user);
  }
  console.log("Usuarios creados:", { usersCliente, usersProveedor });

  // 6. Crear 10 clientes a partir de los usuarios con rol CLIENTE
  const clientes = [];
  for (let i = 0; i < usersCliente.length; i++) {
    const cliente = await prisma.cliente.create({
      data: {
        usuario: { connect: { usuario_id: usersCliente[i].usuario_id } },
        servicios: {
          create: [
            { nombre_servicio: "Cuidado de Niños" },
            { nombre_servicio: "Cuidado de Adultos" },
          ],
        }
      },
    });
    clientes.push(cliente);
  }
  console.log("Clientes creados:", clientes);

  // 7. Crear 10 proveedores a partir de los usuarios con rol PROVEEDOR
  const proveedores = [];
  for (let i = 0; i < usersProveedor.length; i++) {
    const proveedor = await prisma.proveedor.create({
      data: {
        usuario: { connect: { usuario_id: usersProveedor[i].usuario_id } },
        experiencia: `${2 + i} años de experiencia`,
        servicios: {
          create: [
            { nombre_servicio: "Cuidado de Niños" },
            { nombre_servicio: "Cuidado de Adultos" },
          ],
        }
      },
    });
    proveedores.push(proveedor);
  }
  console.log("Proveedores creados:", proveedores);

  // 8. Crear 10 registros de rango_monetario y asignar uno aleatorio a cada proveedor
  const rangos = [];
  for (let i = 1; i <= 20; i++) {
    const rango = await prisma.rango_monetario.create({
      data: {
        minimo: parseFloat((i * 100).toFixed(2)),
        maximo: parseFloat((i * 100 + 200).toFixed(2)),
      },
    });
    rangos.push(rango);
  }
  console.log("Rangos monetarios creados:", rangos);

  for (let i = 0; i < proveedores.length; i++) {
    const randomRango = getRandom(rangos);
    await prisma.proveedor.update({
      where: { proveedor_id: proveedores[i].proveedor_id },
      data: { rango_monetario_id: randomRango.rango_id },
    });
  }

  // SOLO CUANDO YA HAY CLIENTES CREADOS
  // const clientes = await prisma.cliente.findMany();
  for (let i = 0; i < clientes.length; i++) {
    const randomRango = getRandom(rangos);
    await prisma.cliente.update({
      where: { cliente_id: clientes[i].cliente_id },
      data: { rango_monetario_id: randomRango.rango_id },
    });
  }

  // 10. Crear 10 contratos con estados permitidos
  const allowedStates = [
    "PENDING",
    "ON_GOING",
    "REJECTED",
    "FINISHED",
    "ACCEPTED",
  ];
  const contratos = [];
  for (let i = 1; i <= 10; i++) {
    // Seleccionar cliente y proveedor aleatorios
    const randomCliente = getRandom(clientes);
    const randomProveedor = getRandom(proveedores);
    // Para garantizar coherencia, se crea un nuevo servicio para este contrato
    const servicio = await prisma.servicio.findFirst({
      where: { OR: [{ cliente_id: randomCliente.cliente_id }, { proveedor_id: randomProveedor.proveedor_id }] },
    });
    if (!servicio) {
      console.error("No se encontró un servicio para el contrato");
      continue;
    }
    const state = getRandom(allowedStates);
    const contrato = await prisma.contrato.create({
      data: {
        cliente: { connect: { cliente_id: randomCliente.cliente_id } },
        proveedor: { connect: { proveedor_id: randomProveedor.proveedor_id } },
        servicio: { connect: { servicio_id: servicio.servicio_id } },
        fecha_inicio: new Date(),
        fecha_fin: new Date(Date.now() + (7 + i) * 24 * 60 * 60 * 1000),
        cantidad_horas: 8 + i,
        monto_acordado: 100 + i * 10,
        estado: { create: { estado: state } },
        decision_cliente: state === "ACCEPTED" ? "Aprobado" : "Pendiente",
        decision_proveedor: state === "ACCEPTED" ? "Aprobado" : "Pendiente",
      },
    });
    contratos.push(contrato);
  }
  console.log("Contratos creados:", contratos);

  // 11. Crear 10 conversaciones con al menos 2 mensajes cada una
  const conversaciones = [];
  const allUsers = [...usersCliente, ...usersProveedor];
  for (let i = 1; i <= 10; i++) {
    const userA = getRandom(allUsers);
    let userB = getRandom(allUsers);
    // Asegurarse de que sean distintos
    while (userA.usuario_id === userB.usuario_id) {
      userB = getRandom(allUsers);
    }
    const conversacion = await prisma.conversacion.create({
      data: {
        usuario_receptor_id: userA.usuario_id,
        usuario_remitente_id: userB.usuario_id,
        mensajes: {
          create: [
            { mensaje: faker.lorem.sentence(), remitente_id: userB.usuario_id },
            { mensaje: faker.lorem.sentence(), remitente_id: userB.usuario_id },
          ],
        },
      },
    });
    conversaciones.push(conversacion);
  }
  console.log("Conversaciones creadas:", conversaciones);

  // 12. Crear 10 comentarios con su puntuación asociada (relación 1:1)
  const comentarios = [];
  for (let i = 1; i <= 10; i++) {
    const usuarioComentador = getRandom(allUsers);
    let usuarioComentado = getRandom(allUsers);
    while (usuarioComentador.usuario_id === usuarioComentado.usuario_id) {
      usuarioComentado = getRandom(allUsers);
    }
    const comentario = await prisma.comentario.create({
      data: {
        comentado: {
          connect: { usuario_id: usuarioComentado.usuario_id },
        },
        comentador: {
          connect: { usuario_id: usuarioComentador.usuario_id },
        },
        comentario: faker.lorem.sentence(),
        puntuacion: {
          create: {
            puntuacion: Math.floor(Math.random() * 5) + 1,
            calificado: {
              connect: { usuario_id: usuarioComentado.usuario_id },
            },
            calificador: {
              connect: { usuario_id: usuarioComentador.usuario_id },
            },
          },
        },
      },
    });

    comentarios.push(comentario);
  }
  console.log("Comentarios creados:", comentarios);

  // 13. Crear 10 registros en spatial_ref_sys
  // const spatialRefSysRecords = [];
  // for (let i = 0; i < 10; i++) {
  //   const srid = 4326 + i;
  //   const spatialRefSys = await prisma.spatial_ref_sys.create({
  //     data: {
  //       srid: srid,
  //       auth_name: "EPSG",
  //       auth_srid: srid,
  //       srtext: `GEOGCS["WGS 84",DATUM["WGS_1984",...${srid}]`,
  //       proj4text: `+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs_${srid}`,
  //     },
  //   });
  //   spatialRefSysRecords.push(spatialRefSys);
  // }
  // console.log("Spatial Ref Sys creados:", spatialRefSysRecords);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

