
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../utils/database';
import { RowDataPacket } from 'mysql2/promise';

// Registro de usuario
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombreUsuario, correo, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = (await query('SELECT * FROM usuarios WHERE correo = ?', [correo])) as RowDataPacket[];
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }else{
    // Si el usuario no existe, continuar con el registro
   
    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO usuarios (nombre_usuario, correo, password) VALUES (?, ?, ?)';
    await query(sql, [nombreUsuario, correo, hashedPassword]);

      // Devolver una respuesta de éxito
    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  }
  } catch (err: any) {
    console.error('Error al registrar usuario:', err.message);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Inicio de sesión
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { correo, password } = req.body;

    // Verificar si el usuario existe
    const user = (await query('SELECT * FROM usuarios WHERE correo = ?', [correo])) as RowDataPacket[];
    if (user.length === 0) {
      return res.status(400).json({ error: 'Correo o contraseña incorrecta.' });
    }

    // Comparar la contraseña
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Correo o contraseña incorrecta.' });
    }

    // Crear la sesión de usuario
    (req.session as any).userId =user[0].id;
    console.log('Sesión iniciada para el usuario:', (req.session as any).userId);
    return res.json({ message: 'Inicio de sesión exitoso' });
  } catch (err: any) {
    console.error('Error al iniciar sesión:', err.message);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Cierre de sesión
export const logoutUser = (req: Request, res: Response): Response => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  });

  return res.json({ message: 'Cierre de sesión exitoso' });
};
