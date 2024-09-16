import mysql, { Pool } from 'mysql2/promise'; // Importa `Pool` para tipar el pool de conexiones
import * as session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import dotenv from 'dotenv';

dotenv.config();

// Crear y asignar el pool de conexiones a MySQL
const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'crudfinal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificar la conexión con una consulta simple
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión establecida correctamente con la base de datos.');
    connection.release(); // Liberar la conexión de vuelta al pool
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error al establecer la conexión con la base de datos:', err.message);
    } else {
      console.error('Error desconocido al establecer la conexión con la base de datos');
    }
  }
})();

// Exportar el pool de conexiones
export const connection = pool;

// Crear la fábrica de `MySQLStore`
const MySQLStore = MySQLStoreFactory(session);

// Configuración del almacenamiento de sesiones en MySQL
const sessionStore = new MySQLStore(
  {
    expiration: 10800000, // 3 horas
    createDatabaseTable: true,
  },
  pool as any // Usa el pool en lugar de una única conexión
);

export { sessionStore };
