import { auth } from "@/auth";
import connectionPool from "@/db";

type City = {
  cityid: number,
  cityname: string
}

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
        (prov: { provinceid: any; }) => prov.provinceid === item.provinceid
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

    return provincies
  } catch (error) {
    throw new Error("Error al buscar las provincias con las ciudades.");
  }
}

export type UserProfile = {
  nombre: string;
  apellido: string;
  telefono: string;
  experiencia: string | null;
  servicios: Array<{
    servicio_id: number;
    nombre_servicio: string;
  }> | null;
  sobreMi: string;
  fotoPerfil: string;
  direccion: {
    calle: string;
    ciudad: string;
    provincia: string;
  };
};

export async function fetchUserData(): Promise<UserProfile> {
  const session = await auth();
  const query = `SELECT * FROM obtener_usuario_con_datos($1);`;
  const userId = session?.user.id;

  try {
    const data = await connectionPool.query(query, [userId]);

    if (data.rows.length) {
      const row = data.rows[0];
      return {
        nombre: row.nombre || "",
        apellido: row.apellido || "",
        telefono: row.telefono || "",
        experiencia: row.experiencia || null,
        servicios: row.servicios ? JSON.parse(row.servicios) : null,
        sobreMi: row.sobre_mi || "",
        fotoPerfil: row.foto_perfil || "",
        direccion: {
          calle: row.direccion_calle || "",
          ciudad: row.ciudad || "",
          provincia: row.provincia || "",
        },
      };
    }

    return {
      nombre: "",
      apellido: "",
      telefono: "",
      experiencia: null,
      servicios: null,
      sobreMi: "",
      fotoPerfil: "",
      direccion: {
        calle: "",
        ciudad: "",
        provincia: "",
      },
    };
  } catch (error) {
    throw new Error("Error al obtener datos del usuario.");
  }
}