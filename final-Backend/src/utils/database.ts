import { connection } from '../config/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

export const query = async (
  sql: string,
  params: any[] = []
): Promise<RowDataPacket[] | OkPacket | ResultSetHeader> => {
  try {
    // Utiliza el pool de conexiones para ejecutar la consulta
    const [results] = await connection.query<RowDataPacket[] | OkPacket | ResultSetHeader>(sql, params);
    return results;
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    throw err; // Re-lanza el error para que sea manejado en el controlador
  }
};
