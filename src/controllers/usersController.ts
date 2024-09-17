import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../utils/database';

// Controlador para crear un usuario
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombreUsuario, correo, password } = req.body;

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO usuarios (nombre_usuario, correo, password) VALUES (?, ?, ?)';
    await query(sql, [nombreUsuario, correo, hashedPassword]);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err: any) {
    console.error('Error al crear usuario:', err.message);
    return res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Controlador para obtener usuarios
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const results = await query('SELECT * FROM usuarios');
    return res.json(results);
  } catch (err: any) {
    console.error('Error al obtener usuarios:', err.message);
    return res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Controlador para actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { nombreUsuario, correo, password } = req.body;

    // Cifrar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'UPDATE usuarios SET nombre_usuario = ?, correo = ?, password = ? WHERE id = ?';
    await query(sql, [nombreUsuario, correo, hashedPassword, id]);

    return res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (err: any) {
    console.error('Error al actualizar usuario:', err.message);
    return res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    await query(sql, [id]);

    return res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (err: any) {
    console.error('Error al eliminar usuario:', err.message);
    return res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
