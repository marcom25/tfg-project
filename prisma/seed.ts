import { faker } from '@faker-js/faker';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Datos predefinidos de provincias y ciudades
const provincias = [
  {
    provincia_id: 1,
    nombre: "BUENOS AIRES",
  },
  {
    provincia_id: 2,
    nombre: "CAPITAL FEDERAL",
  },
  {
    provincia_id: 3,
    nombre: "CATAMARCA",
  },
  {
    provincia_id: 4,
    nombre: "CHACO",
  },
  {
    provincia_id: 5,
    nombre: "CHUBUT",
  },
  {
    provincia_id: 6,
    nombre: "CORDOBA",
  },
  {
    provincia_id: 7,
    nombre: "CORRIENTES",
  },
  {
    provincia_id: 8,
    nombre: "ENTRE RIOS",
  },
  {
    provincia_id: 9,
    nombre: "FORMOSA",
  },
  {
    provincia_id: 10,
    nombre: "JUJUY",
  },
  {
    provincia_id: 11,
    nombre: "LA PAMPA",
  },
  {
    provincia_id: 12,
    nombre: "LA RIOJA",
  },
  {
    provincia_id: 13,
    nombre: "MENDOZA",
  },
  {
    provincia_id: 14,
    nombre: "MISIONES",
  },
  {
    provincia_id: 15,
    nombre: "NEUQUEN",
  },
  {
    provincia_id: 16,
    nombre: "RIO NEGRO",
  },
  {
    provincia_id: 17,
    nombre: "SALTA",
  },
  {
    provincia_id: 18,
    nombre: "SAN JUAN",
  },
  {
    provincia_id: 19,
    nombre: "SAN LUIS",
  },
  {
    provincia_id: 20,
    nombre: "SANTA CRUZ",
  },
  {
    provincia_id: 21,
    nombre: "SANTA FE",
  },
  {
    provincia_id: 22,
    nombre: "SANTIAGO DEL ESTERO",
  },
  {
    provincia_id: 23,
    nombre: "TIERRA DEL FUEGO",
  },
  {
    provincia_id: 24,
    nombre: "TUCUMAN",
  },
];

const ciudades = [
  {
    ciudad_id: 1,
    nombre: "La Plata",
    provincia_id: 1,
  },
  {
    ciudad_id: 2,
    nombre: "Mar del Plata",
    provincia_id: 1,
  },
  {
    ciudad_id: 3,
    nombre: "Bahía Blanca",
    provincia_id: 1,
  },
  {
    ciudad_id: 4,
    nombre: "Tandil",
    provincia_id: 1,
  },
  {
    ciudad_id: 5,
    nombre: "San Nicolás de los Arroyos",
    provincia_id: 1,
  },
  {
    ciudad_id: 6,
    nombre: "Olavarría",
    provincia_id: 1,
  },
  {
    ciudad_id: 7,
    nombre: "Pergamino",
    provincia_id: 1,
  },
  {
    ciudad_id: 8,
    nombre: "Luján",
    provincia_id: 1,
  },
  {
    ciudad_id: 9,
    nombre: "Junín",
    provincia_id: 1,
  },
  {
    ciudad_id: 10,
    nombre: "Necochea",
    provincia_id: 1,
  },
  {
    ciudad_id: 11,
    nombre: "Ciudad Autónoma de Buenos Aires",
    provincia_id: 2,
  },
  {
    ciudad_id: 12,
    nombre: "San Fernando del Valle de Catamarca",
    provincia_id: 3,
  },
  {
    ciudad_id: 13,
    nombre: "Belén",
    provincia_id: 3,
  },
  {
    ciudad_id: 14,
    nombre: "Tinogasta",
    provincia_id: 3,
  },
  {
    ciudad_id: 15,
    nombre: "Andalgalá",
    provincia_id: 3,
  },
  {
    ciudad_id: 16,
    nombre: "Santa María",
    provincia_id: 3,
  },
  {
    ciudad_id: 17,
    nombre: "Recreo",
    provincia_id: 3,
  },
  {
    ciudad_id: 18,
    nombre: "Fiambalá",
    provincia_id: 3,
  },
  {
    ciudad_id: 19,
    nombre: "Chumbicha",
    provincia_id: 3,
  },
  {
    ciudad_id: 20,
    nombre: "Saujil",
    provincia_id: 3,
  },
  {
    ciudad_id: 21,
    nombre: "Hualfín",
    provincia_id: 3,
  },
  {
    ciudad_id: 22,
    nombre: "Resistencia",
    provincia_id: 4,
  },
  {
    ciudad_id: 23,
    nombre: "Presidencia Roque Sáenz Peña",
    provincia_id: 4,
  },
  {
    ciudad_id: 24,
    nombre: "Villa Ángela",
    provincia_id: 4,
  },
  {
    ciudad_id: 25,
    nombre: "General José de San Martín",
    provincia_id: 4,
  },
  {
    ciudad_id: 26,
    nombre: "Charata",
    provincia_id: 4,
  },
  {
    ciudad_id: 27,
    nombre: "Las Breñas",
    provincia_id: 4,
  },
  {
    ciudad_id: 28,
    nombre: "Quitilipi",
    provincia_id: 4,
  },
  {
    ciudad_id: 29,
    nombre: "Castelli",
    provincia_id: 4,
  },
  {
    ciudad_id: 30,
    nombre: "Barranqueras",
    provincia_id: 4,
  },
  {
    ciudad_id: 31,
    nombre: "Fontana",
    provincia_id: 4,
  },
  {
    ciudad_id: 32,
    nombre: "Rawson",
    provincia_id: 5,
  },
  {
    ciudad_id: 33,
    nombre: "Comodoro Rivadavia",
    provincia_id: 5,
  },
  {
    ciudad_id: 34,
    nombre: "Trelew",
    provincia_id: 5,
  },
  {
    ciudad_id: 35,
    nombre: "Puerto Madryn",
    provincia_id: 5,
  },
  {
    ciudad_id: 36,
    nombre: "Esquel",
    provincia_id: 5,
  },
  {
    ciudad_id: 37,
    nombre: "Sarmiento",
    provincia_id: 5,
  },
  {
    ciudad_id: 38,
    nombre: "Lago Puelo",
    provincia_id: 5,
  },
  {
    ciudad_id: 39,
    nombre: "El Hoyo",
    provincia_id: 5,
  },
  {
    ciudad_id: 40,
    nombre: "Gaiman",
    provincia_id: 5,
  },
  {
    ciudad_id: 41,
    nombre: "Dolavon",
    provincia_id: 5,
  },
  {
    ciudad_id: 42,
    nombre: "Córdoba",
    provincia_id: 6,
  },
  {
    ciudad_id: 43,
    nombre: "Villa Carlos Paz",
    provincia_id: 6,
  },
  {
    ciudad_id: 44,
    nombre: "Río Cuarto",
    provincia_id: 6,
  },
  {
    ciudad_id: 45,
    nombre: "San Francisco",
    provincia_id: 6,
  },
  {
    ciudad_id: 46,
    nombre: "Villa María",
    provincia_id: 6,
  },
  {
    ciudad_id: 47,
    nombre: "Alta Gracia",
    provincia_id: 6,
  },
  {
    ciudad_id: 48,
    nombre: "Jesús María",
    provincia_id: 6,
  },
  {
    ciudad_id: 49,
    nombre: "La Calera",
    provincia_id: 6,
  },
  {
    ciudad_id: 50,
    nombre: "Cosquín",
    provincia_id: 6,
  },
  {
    ciudad_id: 51,
    nombre: "Río Tercero",
    provincia_id: 6,
  },
  {
    ciudad_id: 52,
    nombre: "Corrientes",
    provincia_id: 7,
  },
  {
    ciudad_id: 53,
    nombre: "Goya",
    provincia_id: 7,
  },
  {
    ciudad_id: 54,
    nombre: "Paso de los Libres",
    provincia_id: 7,
  },
  {
    ciudad_id: 55,
    nombre: "Mercedes",
    provincia_id: 7,
  },
  {
    ciudad_id: 56,
    nombre: "Curuzú Cuatiá",
    provincia_id: 7,
  },
  {
    ciudad_id: 57,
    nombre: "Monte Caseros",
    provincia_id: 7,
  },
  {
    ciudad_id: 58,
    nombre: "Santo Tomé",
    provincia_id: 7,
  },
  {
    ciudad_id: 59,
    nombre: "Ituzaingó",
    provincia_id: 7,
  },
  {
    ciudad_id: 60,
    nombre: "Esquina",
    provincia_id: 7,
  },
  {
    ciudad_id: 61,
    nombre: "Bella Vista",
    provincia_id: 7,
  },
  {
    ciudad_id: 62,
    nombre: "Paraná",
    provincia_id: 8,
  },
  {
    ciudad_id: 63,
    nombre: "Concordia",
    provincia_id: 8,
  },
  {
    ciudad_id: 64,
    nombre: "Gualeguaychú",
    provincia_id: 8,
  },
  {
    ciudad_id: 65,
    nombre: "Concepción del Uruguay",
    provincia_id: 8,
  },
  {
    ciudad_id: 66,
    nombre: "Villaguay",
    provincia_id: 8,
  },
  {
    ciudad_id: 67,
    nombre: "La Paz",
    provincia_id: 8,
  },
  {
    ciudad_id: 68,
    nombre: "Colón",
    provincia_id: 8,
  },
  {
    ciudad_id: 69,
    nombre: "Gualeguay",
    provincia_id: 8,
  },
  {
    ciudad_id: 70,
    nombre: "San José",
    provincia_id: 8,
  },
  {
    ciudad_id: 71,
    nombre: "Victoria",
    provincia_id: 8,
  },
  {
    ciudad_id: 72,
    nombre: "Formosa",
    provincia_id: 9,
  },
  {
    ciudad_id: 73,
    nombre: "Clorinda",
    provincia_id: 9,
  },
  {
    ciudad_id: 74,
    nombre: "Pirané",
    provincia_id: 9,
  },
  {
    ciudad_id: 75,
    nombre: "El Colorado",
    provincia_id: 9,
  },
  {
    ciudad_id: 76,
    nombre: "Laguna Blanca",
    provincia_id: 9,
  },
  {
    ciudad_id: 77,
    nombre: "Ibarreta",
    provincia_id: 9,
  },
  {
    ciudad_id: 78,
    nombre: "Las Lomitas",
    provincia_id: 9,
  },
  {
    ciudad_id: 79,
    nombre: "Ingeniero Juárez",
    provincia_id: 9,
  },
  {
    ciudad_id: 80,
    nombre: "General Güemes",
    provincia_id: 9,
  },
  {
    ciudad_id: 81,
    nombre: "Villa General Güemes",
    provincia_id: 9,
  },
  {
    ciudad_id: 82,
    nombre: "San Salvador de Jujuy",
    provincia_id: 10,
  },
  {
    ciudad_id: 83,
    nombre: "Palpalá",
    provincia_id: 10,
  },
  {
    ciudad_id: 84,
    nombre: "Humahuaca",
    provincia_id: 10,
  },
  {
    ciudad_id: 85,
    nombre: "Tilcara",
    provincia_id: 10,
  },
  {
    ciudad_id: 86,
    nombre: "La Quiaca",
    provincia_id: 10,
  },
  {
    ciudad_id: 87,
    nombre: "Perico",
    provincia_id: 10,
  },
  {
    ciudad_id: 88,
    nombre: "Libertador General San Martín",
    provincia_id: 10,
  },
  {
    ciudad_id: 89,
    nombre: "Abra Pampa",
    provincia_id: 10,
  },
  {
    ciudad_id: 90,
    nombre: "Monterrico",
    provincia_id: 10,
  },
  {
    ciudad_id: 91,
    nombre: "El Carmen",
    provincia_id: 10,
  },
  {
    ciudad_id: 92,
    nombre: "Santa Rosa",
    provincia_id: 11,
  },
  {
    ciudad_id: 93,
    nombre: "General Pico",
    provincia_id: 11,
  },
  {
    ciudad_id: 94,
    nombre: "Toay",
    provincia_id: 11,
  },
  {
    ciudad_id: 95,
    nombre: "Eduardo Castex",
    provincia_id: 11,
  },
  {
    ciudad_id: 96,
    nombre: "Victorica",
    provincia_id: 11,
  },
  {
    ciudad_id: 97,
    nombre: "25 de Mayo",
    provincia_id: 11,
  },
  {
    ciudad_id: 98,
    nombre: "General Acha",
    provincia_id: 11,
  },
  {
    ciudad_id: 99,
    nombre: "Realicó",
    provincia_id: 11,
  },
  {
    ciudad_id: 100,
    nombre: "Guatraché",
    provincia_id: 11,
  },
  {
    ciudad_id: 101,
    nombre: "Winifreda",
    provincia_id: 11,
  },
  {
    ciudad_id: 102,
    nombre: "La Rioja",
    provincia_id: 12,
  },
  {
    ciudad_id: 103,
    nombre: "Chilecito",
    provincia_id: 12,
  },
  {
    ciudad_id: 104,
    nombre: "Aimogasta",
    provincia_id: 12,
  },
  {
    ciudad_id: 105,
    nombre: "Chamical",
    provincia_id: 12,
  },
  {
    ciudad_id: 106,
    nombre: "Villa Unión",
    provincia_id: 12,
  },
  {
    ciudad_id: 107,
    nombre: "Chepes",
    provincia_id: 12,
  },
  {
    ciudad_id: 108,
    nombre: "Sanagasta",
    provincia_id: 12,
  },
  {
    ciudad_id: 109,
    nombre: "Olta",
    provincia_id: 12,
  },
  {
    ciudad_id: 110,
    nombre: "Ulapes",
    provincia_id: 12,
  },
  {
    ciudad_id: 111,
    nombre: "Aminga",
    provincia_id: 12,
  },
  {
    ciudad_id: 112,
    nombre: "Mendoza",
    provincia_id: 13,
  },
  {
    ciudad_id: 113,
    nombre: "San Rafael",
    provincia_id: 13,
  },
  {
    ciudad_id: 114,
    nombre: "Godoy Cruz",
    provincia_id: 13,
  },
  {
    ciudad_id: 115,
    nombre: "Las Heras",
    provincia_id: 13,
  },
  {
    ciudad_id: 116,
    nombre: "Guaymallén",
    provincia_id: 13,
  },
  {
    ciudad_id: 117,
    nombre: "Luján de Cuyo",
    provincia_id: 13,
  },
  {
    ciudad_id: 118,
    nombre: "Maipú",
    provincia_id: 13,
  },
  {
    ciudad_id: 119,
    nombre: "Rivadavia",
    provincia_id: 13,
  },
  {
    ciudad_id: 120,
    nombre: "Tupungato",
    provincia_id: 13,
  },
  {
    ciudad_id: 121,
    nombre: "Malargüe",
    provincia_id: 13,
  },
  {
    ciudad_id: 122,
    nombre: "Posadas",
    provincia_id: 14,
  },
  {
    ciudad_id: 123,
    nombre: "Puerto Iguazú",
    provincia_id: 14,
  },
  {
    ciudad_id: 124,
    nombre: "Eldorado",
    provincia_id: 14,
  },
  {
    ciudad_id: 125,
    nombre: "Oberá",
    provincia_id: 14,
  },
  {
    ciudad_id: 126,
    nombre: "San Vicente",
    provincia_id: 14,
  },
  {
    ciudad_id: 127,
    nombre: "Leandro N. Alem",
    provincia_id: 14,
  },
  {
    ciudad_id: 128,
    nombre: "Montecarlo",
    provincia_id: 14,
  },
  {
    ciudad_id: 129,
    nombre: "Apóstoles",
    provincia_id: 14,
  },
  {
    ciudad_id: 130,
    nombre: "Puerto Esperanza",
    provincia_id: 14,
  },
  {
    ciudad_id: 131,
    nombre: "Jardín América",
    provincia_id: 14,
  },
  {
    ciudad_id: 132,
    nombre: "Neuquén",
    provincia_id: 15,
  },
  {
    ciudad_id: 133,
    nombre: "San Martín de los Andes",
    provincia_id: 15,
  },
  {
    ciudad_id: 134,
    nombre: "Plottier",
    provincia_id: 15,
  },
  {
    ciudad_id: 135,
    nombre: "Centenario",
    provincia_id: 15,
  },
  {
    ciudad_id: 136,
    nombre: "Zapala",
    provincia_id: 15,
  },
  {
    ciudad_id: 137,
    nombre: "Cutral Có",
    provincia_id: 15,
  },
  {
    ciudad_id: 138,
    nombre: "Villa La Angostura",
    provincia_id: 15,
  },
  {
    ciudad_id: 139,
    nombre: "Rincón de los Sauces",
    provincia_id: 15,
  },
  {
    ciudad_id: 140,
    nombre: "Junín de los Andes",
    provincia_id: 15,
  },
  {
    ciudad_id: 141,
    nombre: "Chos Malal",
    provincia_id: 15,
  },
  {
    ciudad_id: 142,
    nombre: "Viedma",
    provincia_id: 16,
  },
  {
    ciudad_id: 143,
    nombre: "San Carlos de Bariloche",
    provincia_id: 16,
  },
  {
    ciudad_id: 144,
    nombre: "Cipolletti",
    provincia_id: 16,
  },
  {
    ciudad_id: 145,
    nombre: "General Roca",
    provincia_id: 16,
  },
  {
    ciudad_id: 146,
    nombre: "Villa Regina",
    provincia_id: 16,
  },
  {
    ciudad_id: 147,
    nombre: "Allen",
    provincia_id: 16,
  },
  {
    ciudad_id: 148,
    nombre: "Catriel",
    provincia_id: 16,
  },
  {
    ciudad_id: 149,
    nombre: "El Bolsón",
    provincia_id: 16,
  },
  {
    ciudad_id: 150,
    nombre: "Choele Choel",
    provincia_id: 16,
  },
  {
    ciudad_id: 151,
    nombre: "Sierra Grande",
    provincia_id: 16,
  },
  {
    ciudad_id: 152,
    nombre: "Salta",
    provincia_id: 17,
  },
  {
    ciudad_id: 153,
    nombre: "Tartagal",
    provincia_id: 17,
  },
  {
    ciudad_id: 154,
    nombre: "Orán",
    provincia_id: 17,
  },
  {
    ciudad_id: 155,
    nombre: "Cafayate",
    provincia_id: 17,
  },
  {
    ciudad_id: 156,
    nombre: "Rosario de la Frontera",
    provincia_id: 17,
  },
  {
    ciudad_id: 157,
    nombre: "Metán",
    provincia_id: 17,
  },
  {
    ciudad_id: 158,
    nombre: "Güemes",
    provincia_id: 17,
  },
  {
    ciudad_id: 159,
    nombre: "San Lorenzo",
    provincia_id: 17,
  },
  {
    ciudad_id: 160,
    nombre: "Cerrillos",
    provincia_id: 17,
  },
  {
    ciudad_id: 161,
    nombre: "La Caldera",
    provincia_id: 17,
  },
  {
    ciudad_id: 162,
    nombre: "San Juan",
    provincia_id: 18,
  },
  {
    ciudad_id: 163,
    nombre: "Jáchal",
    provincia_id: 18,
  },
  {
    ciudad_id: 164,
    nombre: "Caucete",
    provincia_id: 18,
  },
  {
    ciudad_id: 165,
    nombre: "Pocito",
    provincia_id: 18,
  },
  {
    ciudad_id: 166,
    nombre: "Chimbas",
    provincia_id: 18,
  },
  {
    ciudad_id: 167,
    nombre: "Rivadavia",
    provincia_id: 18,
  },
  {
    ciudad_id: 168,
    nombre: "Santa Lucía",
    provincia_id: 18,
  },
  {
    ciudad_id: 169,
    nombre: "Albardón",
    provincia_id: 18,
  },
  {
    ciudad_id: 170,
    nombre: "Rawson",
    provincia_id: 18,
  },
  {
    ciudad_id: 171,
    nombre: "Sarmiento",
    provincia_id: 18,
  },
  {
    ciudad_id: 172,
    nombre: "San Luis",
    provincia_id: 19,
  },
  {
    ciudad_id: 173,
    nombre: "Villa Mercedes",
    provincia_id: 19,
  },
  {
    ciudad_id: 174,
    nombre: "Merlo",
    provincia_id: 19,
  },
  {
    ciudad_id: 175,
    nombre: "La Punta",
    provincia_id: 19,
  },
  {
    ciudad_id: 176,
    nombre: "Juana Koslay",
    provincia_id: 19,
  },
  {
    ciudad_id: 177,
    nombre: "Potrero de los Funes",
    provincia_id: 19,
  },
  {
    ciudad_id: 178,
    nombre: "Naschel",
    provincia_id: 19,
  },
  {
    ciudad_id: 179,
    nombre: "Tilisarao",
    provincia_id: 19,
  },
  {
    ciudad_id: 180,
    nombre: "Justo Daract",
    provincia_id: 19,
  },
  {
    ciudad_id: 181,
    nombre: "Unión",
    provincia_id: 19,
  },
  {
    ciudad_id: 182,
    nombre: "Río Gallegos",
    provincia_id: 20,
  },
  {
    ciudad_id: 183,
    nombre: "El Calafate",
    provincia_id: 20,
  },
  {
    ciudad_id: 184,
    nombre: "Caleta Olivia",
    provincia_id: 20,
  },
  {
    ciudad_id: 185,
    nombre: "Pico Truncado",
    provincia_id: 20,
  },
  {
    ciudad_id: 186,
    nombre: "Las Heras",
    provincia_id: 20,
  },
  {
    ciudad_id: 187,
    nombre: "Puerto Deseado",
    provincia_id: 20,
  },
  {
    ciudad_id: 188,
    nombre: "Perito Moreno",
    provincia_id: 20,
  },
  {
    ciudad_id: 189,
    nombre: "Gobernador Gregores",
    provincia_id: 20,
  },
  {
    ciudad_id: 190,
    nombre: "Los Antiguos",
    provincia_id: 20,
  },
  {
    ciudad_id: 191,
    nombre: "El Chaltén",
    provincia_id: 20,
  },
  {
    ciudad_id: 192,
    nombre: "Santa Fe",
    provincia_id: 21,
  },
  {
    ciudad_id: 193,
    nombre: "Rosario",
    provincia_id: 21,
  },
  {
    ciudad_id: 194,
    nombre: "Rafaela",
    provincia_id: 21,
  },
  {
    ciudad_id: 195,
    nombre: "Venado Tuerto",
    provincia_id: 21,
  },
  {
    ciudad_id: 196,
    nombre: "Reconquista",
    provincia_id: 21,
  },
  {
    ciudad_id: 197,
    nombre: "Villa Constitución",
    provincia_id: 21,
  },
  {
    ciudad_id: 198,
    nombre: "Santo Tomé",
    provincia_id: 21,
  },
  {
    ciudad_id: 199,
    nombre: "Esperanza",
    provincia_id: 21,
  },
  {
    ciudad_id: 200,
    nombre: "Sunchales",
    provincia_id: 21,
  },
  {
    ciudad_id: 201,
    nombre: "Cañada de Gómez",
    provincia_id: 21,
  },
  {
    ciudad_id: 202,
    nombre: "Santiago del Estero",
    provincia_id: 22,
  },
  {
    ciudad_id: 203,
    nombre: "La Banda",
    provincia_id: 22,
  },
  {
    ciudad_id: 204,
    nombre: "Termas de Río Hondo",
    provincia_id: 22,
  },
  {
    ciudad_id: 205,
    nombre: "Añatuya",
    provincia_id: 22,
  },
  {
    ciudad_id: 206,
    nombre: "Frías",
    provincia_id: 22,
  },
  {
    ciudad_id: 207,
    nombre: "Quimilí",
    provincia_id: 22,
  },
  {
    ciudad_id: 208,
    nombre: "Fernández",
    provincia_id: 22,
  },
  {
    ciudad_id: 209,
    nombre: "Monte Quemado",
    provincia_id: 22,
  },
  {
    ciudad_id: 210,
    nombre: "Loreto",
    provincia_id: 22,
  },
  {
    ciudad_id: 211,
    nombre: "Campo Gallo",
    provincia_id: 22,
  },
  {
    ciudad_id: 212,
    nombre: "Ushuaia",
    provincia_id: 23,
  },
  {
    ciudad_id: 213,
    nombre: "Río Grande",
    provincia_id: 23,
  },
  {
    ciudad_id: 214,
    nombre: "Tolhuin",
    provincia_id: 23,
  },
  {
    ciudad_id: 215,
    nombre: "Puerto Almanza",
    provincia_id: 23,
  },
  {
    ciudad_id: 216,
    nombre: "San Miguel de Tucumán",
    provincia_id: 24,
  },
  {
    ciudad_id: 217,
    nombre: "Tafí Viejo",
    provincia_id: 24,
  },
  {
    ciudad_id: 218,
    nombre: "Yerba Buena",
    provincia_id: 24,
  },
  {
    ciudad_id: 219,
    nombre: "Concepción",
    provincia_id: 24,
  },
  {
    ciudad_id: 220,
    nombre: "Monteros",
    provincia_id: 24,
  },
  {
    ciudad_id: 221,
    nombre: "Aguilares",
    provincia_id: 24,
  },
  {
    ciudad_id: 222,
    nombre: "Famaillá",
    provincia_id: 24,
  },
  {
    ciudad_id: 223,
    nombre: "Bella Vista",
    provincia_id: 24,
  },
  {
    ciudad_id: 224,
    nombre: "Banda del Río Salí",
    provincia_id: 24,
  },
  {
    ciudad_id: 225,
    nombre: "Lules",
    provincia_id: 24,
  },
];

async function main() {
  // Crear roles
  const rolesData = [{ nombre_rol: "CLIENT" }, { nombre_rol: "PROVIDER" }];
  await Promise.all(rolesData.map((rol) => prisma.rol.create({ data: rol })));
  const roles = await prisma.rol.findMany();
  const roleClient = roles.find((r) => r.nombre_rol === "CLIENT");
  const roleProvider = roles.find((r) => r.nombre_rol === "PROVIDER");

  // // Crear estados
  const estadosData = [
    "PENDING",
    "ON_GOING",
    "REJECTED",
    "FINISHED",
    "ACCEPTED",
  ];
  await Promise.all(
    estadosData.map((estado) => prisma.estado.create({ data: { estado } }))
  );
  const estados = await prisma.estado.findMany();

  // Crear provincias y ciudades
  // await Promise.all(
  //   provincias.map((provincia) =>
  //     prisma.provincia.create({
  //       data: {
  //         provincia_id: provincia.provincia_id,
  //         nombre: provincia.nombre,
  //         ciudades: {
  //           create: ciudades
  //             .filter(
  //               (ciudad) => ciudad.provincia_id === provincia.provincia_id
  //             )
  //             .map((ciudad) => ({
  //               ciudad_id: ciudad.ciudad_id,
  //               nombre: ciudad.nombre,
  //             })),
  //         },
  //       },
  //     })
  //   )
  // );

  // Crear Usuarios
  const usuarios = [];
  for (let i = 0; i < 10; i++) {
    const direccion = await prisma.direccion.create({
      data: {
        calle: faker.location.streetAddress(),
        numero: faker.location.buildingNumber(),
        ciudad_id: faker.helpers.arrayElement(ciudades).ciudad_id,
      },
    });

    const usuario = await prisma.usuario.create({
      data: {
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        descripcion: faker.lorem.sentence(),
        email: faker.internet.email(),
        contrasena: faker.internet.password(),
        telefono: faker.phone.number({ style: "international" }),
        imagen_perfil_id: faker.image.avatar(),
        direccion_id: direccion.direccion_id,
      },
    });
    usuarios.push(usuario);
  }

  // Crear clientes y proveedores
  const clientes = [];
  const proveedores = [];
  for (const usuario of usuarios) {
    if (Math.random() > 0.5) {
      const rangoCliente = await prisma.rango_monetario.create({
        data: {
          minimo: faker.number.float({
            min: 500,
            max: 1000,
            fractionDigits: 2,
          }),
          maximo: faker.number.float({
            min: 1001,
            max: 5000,
            fractionDigits: 2,
          }),
        },
      });
      const cliente = await prisma.cliente.create({
        data: {
          usuario_id: usuario.usuario_id,
          rango_monetario_id: rangoCliente.rango_id,
        },
      });
      await prisma.rol_usuario.create({
        data: {
          usuario_id: usuario.usuario_id,
          rol_id: roleClient?.rol_id ?? 1,
        },
      });
      clientes.push(cliente);
    } else {
      const rangoProveedor = await prisma.rango_monetario.create({
        data: {
          minimo: faker.number.float({
            min: 1500,
            max: 2000,
            fractionDigits: 2,
          }),
          maximo: faker.number.float({
            min: 2001,
            max: 10000,
            fractionDigits: 2,
          }),
        },
      });
      const proveedor = await prisma.proveedor.create({
        data: {
          usuario_id: usuario.usuario_id,
          experiencia: `${faker.number.int({
            min: 1,
            max: 10,
          })} ${faker.helpers.arrayElement(["años", "meses"])}`,
          rango_monetario_id: rangoProveedor.rango_id,
        },
      });
      await prisma.rol_usuario.create({
        data: {
          usuario_id: usuario.usuario_id,
          rol_id: roleProvider?.rol_id ?? 2,
        },
      });
      proveedores.push(proveedor);
    }
  }

  // Crear servicios
  const serviciosDisponibles = [
    "Cuidado de menores",
    "Cuidado de mayores",
    "Clases particulares",
    "Limpieza del hogar",
    "Cuidado de mascotas",
  ];
  const servicios = [];
  for (const proveedor of proveedores) {
    const servicio = await prisma.servicio.create({
      data: {
        nombre_servicio: faker.helpers.arrayElement(serviciosDisponibles),
        proveedor_id: proveedor.proveedor_id,
        cliente_id: faker.helpers.arrayElement(clientes).cliente_id,
      },
    });
    servicios.push(servicio);
  }

  // Crear contratos
  for (let i = 0; i < 10; i++) {
    const contrato = await prisma.contrato.create({
      data: {
        cliente_id: faker.helpers.arrayElement(clientes).cliente_id,
        proveedor_id: faker.helpers.arrayElement(proveedores).proveedor_id,
        fecha_inicio: faker.date.past(),
        fecha_fin: faker.date.future(),
        cantidad_horas: faker.number.int({ min: 1, max: 40 }),
        monto_acordado: faker.number.float({
          min: 1000,
          max: 10000,
          fractionDigits: 2,
        }),
        servicio_id: faker.helpers.arrayElement(servicios).servicio_id,
        estado_id: faker.helpers.arrayElement(estados).estado_id,
        decision_cliente: faker.lorem.word(),
        decision_proveedor: faker.lorem.word(),
      },
    });
  }

  // Crear comentarios
  for (let i = 0; i < 20; i++) {
    await prisma.comentario.create({
      data: {
        comentario: faker.lorem.sentence(),
        usuario_comentador_id: faker.helpers.arrayElement(usuarios).usuario_id,
        usuario_comentado_id: faker.helpers.arrayElement(usuarios).usuario_id,
      },
    });
  }

  // Crear conversaciones y mensajes
  for (let i = 0; i < 5; i++) {
    const receptor = faker.helpers.arrayElement(usuarios);
    const remitente = faker.helpers.arrayElement(usuarios);
    const conversacion = await prisma.conversacion.create({
      data: {
        usuario_receptor_id: receptor.usuario_id,
        usuario_remitente_id: remitente.usuario_id,
      },
    });

    for (let j = 0; j < 10; j++) {
      await prisma.mensaje.create({
        data: {
          remitente_id: remitente.usuario_id,
          conversacion_id: conversacion.conversacion_id,
          mensaje: faker.lorem.sentence(),
        },
      });
    }
  }

  // Crear puntuaciones
  for (let i = 0; i < 10; i++) {
    const puntuacion = await prisma.puntuacion.create({
      data: {
        usuario_calificado_id: faker.helpers.arrayElement(usuarios).usuario_id,
        usuario_calificador_id: faker.helpers.arrayElement(usuarios).usuario_id,
        puntuacion: faker.number.int({ min: 1, max: 5 }),
      },
    });
  }

  // Crear rangos monetarios
  for (let i = 0; i < 5; i++) {
    await prisma.rango_monetario.create({
      data: {
        minimo: faker.number.float({ min: 500, max: 1000, fractionDigits: 2 }),
        maximo: faker.number.float({ min: 1001, max: 5000, fractionDigits: 2 }),
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
