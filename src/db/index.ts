import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
// Carga las variables de entorno desde el archivo .env
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "cookie-auth",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "adminadmin",
};

export const pool = new Pool(dbConfig);

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
