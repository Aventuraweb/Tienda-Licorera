import { Request, Response } from 'express';
import { query } from '../utils/database'; // Reutiliza la función de consulta basada en promesas
import { RowDataPacket } from 'mysql2/promise';

// Crear una nueva categoría
export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombreCategoria } = req.body;

    // Validar que el nombre de la categoría no esté vacío
    if (!nombreCategoria) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido.' });
    }

    const sql = 'INSERT INTO categorias (nombre_categoria) VALUES (?)';
    await query(sql, [nombreCategoria]);

    return res.status(201).json({ message: 'Categoría creada exitosamente' });
  } catch (err: any) {
    console.error('Error al crear categoría:', err.message);
    return res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// Obtener todas las categorías
export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const results = await query('SELECT * FROM categorias') as RowDataPacket[];
    return res.json(results);
  } catch (err: any) {
    console.error('Error al obtener categorías:', err.message);
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// Actualizar una categoría
export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { nombreCategoria } = req.body;

    if (!nombreCategoria) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido.' });
    }

    const sql = 'UPDATE categorias SET nombre_categoria = ? WHERE idcategoria = ?';
    await query(sql, [nombreCategoria, id]);

    return res.json({ message: 'Categoría actualizada exitosamente' });
  } catch (err: any) {
    console.error('Error al actualizar categoría:', err.message);
    return res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM categorias WHERE idcategoria = ?';
    await query(sql, [id]);

    return res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (err: any) {
    console.error('Error al eliminar categoría:', err.message);
    return res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};
