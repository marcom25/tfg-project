import { auth } from "@/auth";
import connectionPool from "@/db";

type City = {
  cityid: number;
  cityname: string;
};

export type Province = {
  provinceid: number;
  provincename: string;
  cities: City[];
};

export async function fetchProvincesAndCities(): Promise<Province[]> {
  const query = `SELECT p.provincia_id AS provinceId, p.nombre AS provinceName, c.ciudad_id AS cityId, c.nombre AS cityName FROM provincia p 
    JOIN ciudad c ON p.provincia_id = c.provincia_id 
    ORDER BY c.ciudad_id ASC`;

  try {
    const data = await connectionPool.query(query);
    const provincies = data.rows.reduce((acc, item) => {
      const provinceIndex = acc.findIndex(
        (prov: { provinceid: any }) => prov.provinceid === item.provinceid
      );

      if (provinceIndex !== -1) {
        // Si la provincia ya existe, añade la ciudad al array de ciudades
        acc[provinceIndex].cities.push({
          cityid: item.cityid,
          cityname: item.cityname,
        });
      } else {
        // Si no existe, crea una nueva entrada para la provincia
        acc.push({
          provinceid: item.provinceid,
          provincename: item.provincename,
          cities: [{ cityid: item.cityid, cityname: item.cityname }],
        });
      }

      return acc;
    }, []);

    return provincies;
  } catch (error) {
    throw new Error("Error al buscar las provincias con las ciudades.");
  }
}

export type UserProfile = {
  name: string;
  lastname: string;
  phone: string;
  experience: string | null;
  services: Array<{
    service_id: number;
    service_name: string;
  }> | null;
  aboutMe: string;
  address: {
    street: string;
    city: string;
    province: string;
  };
};

export async function fetchUserData(): Promise<UserProfile> {
  const session = await auth();
  console.log(session);
  
  const queryClient = `SELECT 
    u.nombre, 
    u.apellido, 
    u.descripcion, 
    u.email, 
    u.telefono, 
    d.calle, 
    d.numero,
    c.nombre,
    p.nombre,
    s.nombre_servicio,
  FROM usuario u 
  JOIN direccion d ON u.direccion_id = d.direccion_id 
  JOIN ciudad c ON d.ciudad_id = c.ciudad_id 
  JOIN provincia p ON c.provincia_id = p.provincia_id
  JOIN cliente c2 ON c2.usuario_id = u.usuario_id 
  JOIN servicio s ON s.cliente_id = c2.cliente_id 
  WHERE u.usuario_id = ($1)`;

  const queryProvider = `SELECT 
    u.nombre, 
    u.apellido, 
    u.descripcion, 
    u.email, 
    u.telefono, 
    d.calle, 
    d.numero,
    c.nombre,
    p.nombre,
    s.nombre_servicio
  FROM usuario u 
  JOIN direccion d ON u.direccion_id = d.direccion_id 
  JOIN ciudad c ON d.ciudad_id = c.ciudad_id 
  JOIN provincia p ON c.provincia_id = p.provincia_id
  JOIN proveedor p2 ON p2.usuario_id = u.usuario_id 
  JOIN servicio s ON s.proveedor_id = p2.proveedor_id 
  WHERE u.usuario_id = ($1)`;
  const userId = session?.user.id;
  console.log(userId, "USER ID");
  
  try {
    // const data = await connectionPool.query(query, [userId]);

    // if (data.rows.length) {
    //   const row = data.rows[0];
    //   return {
    //     name: row.nombre || "",
    //     lastname: row.apellido || "",
    //     phone: row.telefono || "",
    //     experience: row.experiencia || null,
    //     services: row.servicios ? JSON.parse(row.servicios) : null,
    //     aboutMe: row.sobre_mi || "",
    //     address: {
    //       street: row.direccion_calle || "",
    //       city: row.ciudad || "",
    //       province: row.provincia || "",
    //     },
    //   };
    // }

    return {
      name: "",
      lastname: "",
      phone: "",
      experience: null,
      services: null,
      aboutMe: "",
      address: {
        street: "",
        city: "",
        province: "",
      },
    };
  } catch (error) {
    throw new Error("Error al obtener datos del usuario.");
  }
}
