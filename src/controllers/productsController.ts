import { Request, Response } from 'express';
import { query } from '../utils/database'; // Reutiliza la función de consulta basada en promesas
import { RowDataPacket } from 'mysql2/promise';

// Crear un producto, para validar la categoría
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombreProducto, precio, imagen, categoriaId } = req.body;

    // Validar los campos requeridos
    if (!nombreProducto || !precio || !imagen || !categoriaId) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Verificar si la categoría existe
    const categoriaQuery = 'SELECT * FROM categorias WHERE idcategoria = ?';
    const [categoria] = await query(categoriaQuery, [categoriaId]) as RowDataPacket[];

    if (!categoria) {
      return res.status(400).json({ error: 'La categoría especificada no existe.' });
    }

    // Insertar el producto con el id de la categoría
    const sql = 'INSERT INTO productos (nombre_producto, precio, image_url, idcategoria) VALUES (?, ?, ?, ?)';
    await query(sql, [nombreProducto, precio, imagen, categoriaId]);

    return res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (err: any) {
    console.error('Error al crear producto:', err.message);
    return res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos con el nombre de la categoría (JOIN lógico)
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sql = `
      SELECT p.*, c.nombre_categoria 
      FROM productos p
      LEFT JOIN categorias c ON p.idcategoria = c.idcategoria
    `;

    const results = await query(sql) as RowDataPacket[];
    return res.json(results);
  } catch (err: any) {
    console.error('Error al obtener productos:', err.message);
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Actualizar un producto , pero validando la categoría
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { nombreProducto, precio, imagen, categoriaId } = req.body;

    // Validar los campos requeridos
    if (!nombreProducto || !precio || !imagen || !categoriaId) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Verificar si la categoría existe
    const categoriaQuery = 'SELECT * FROM categorias WHERE idcategoria = ?';
    const [categoria] = await query(categoriaQuery, [categoriaId]) as RowDataPacket[];

    if (!categoria) {
      return res.status(400).json({ error: 'La categoría especificada no existe.' });
    }

    // Actualizar el producto con la categoría seleccionada
    const sql = 'UPDATE productos SET nombre_producto = ?, precio = ?, image_url = ?, idcategoria = ? WHERE idproducto = ?';
    await query(sql, [nombreProducto, precio, imagen, categoriaId, id]);

    return res.json({ message: 'Producto actualizado exitosamente' });
  } catch (err: any) {
    console.error('Error al actualizar producto:', err.message);
    return res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar un producto sin afectar a la categoría
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
