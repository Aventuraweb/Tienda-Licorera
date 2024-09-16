import { Request, Response } from 'express';
import { query } from '../utils/database'; // Reutiliza la función de consulta basada en promesas
import { RowDataPacket } from 'mysql2/promise';

// Crear un producto
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombreProducto, precio, imagen } = req.body;

    // Validar los campos requeridos
    if (!nombreProducto || !precio || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const sql = 'INSERT INTO productos (nombre_producto, precio, image_url) VALUES (?, ?, ?)';
    await query(sql, [nombreProducto, precio, imagen]);

    return res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (err: any) {
    console.error('Error al crear producto:', err.message);
    return res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const results = await query('SELECT * FROM productos') as RowDataPacket[];
    return res.json(results);
  } catch (err: any) {
    console.error('Error al obtener productos:', err.message);
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { nombreProducto, precio, imagen } = req.body;

    // Validar los campos requeridos
    if (!nombreProducto || !precio || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const sql = 'UPDATE productos SET nombre_producto = ?, precio = ?, image_url = ? WHERE idproducto = ?';
    await query(sql, [nombreProducto, precio, imagen, id]);

    return res.json({ message: 'Producto actualizado exitosamente' });
  } catch (err: any) {
    console.error('Error al actualizar producto:', err.message);
    return res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE idproducto = ?';
    await query(sql, [id]);

    return res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err: any) {
    console.error('Error al eliminar producto:', err.message);
    return res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
