import React, { useState, useEffect } from 'react';
import type { Product } from '../types'

interface ModalEditarProps {
  producto: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
  categorias: { idcategoria: number; nombreCategoria: string }[]; // Agregando la prop para las categorías
}

const ModalEditar: React.FC<ModalEditarProps> = ({ producto, onClose, onSave, categorias }) => {
  const [nombre_producto, setNombreProducto] = useState(producto?.nombre_producto || '');
  const [precio, setPrecio] = useState(producto?.precio || ''); // Asegurar que sea número
  const [image_url, setImagen] = useState(producto?.image_url || '');
  const [idcategoria, setIdcategoria] = useState(producto?.idcategoria || ''); // Cambio de categoriaId a idcategoria
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sincronizar los valores de los inputs si cambia el producto
    if (producto) {
      setNombreProducto(producto.nombre_producto || '');
      setPrecio(producto.precio || '');
      setImagen(producto.image_url || '');
      setIdcategoria(producto.idcategoria || '');
    }
  }, [producto]);

  const handleSave = () => {
    if (!producto) return;

    // Asegurarse de que todos los campos estén llenos
    try {
    onSave({
      ...producto,
      idproducto: producto.idproducto,
      nombre_producto,
      precio, 
      image_url,
      idcategoria, 
    });

    // Recargar la página o redirigir a una URL específica
    window.location.href = '/productos';
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="border-2 border-gray-700 rounded-lg shadow-lg p-6 w-[80%] sm:w-[500px] relative bg-black">
        <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-white text-4xl font-bold mb-4 text-center">EDITAR PRODUCTO</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              value={nombre_producto}
              onChange={(e) => setNombreProducto(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Precio</label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)} // Convertir a número
              className="w-full p-3 border border-gray-700 rounded bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Imagen</label>
            <input
              type="url"
              value={image_url}
              onChange={(e) => setImagen(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Categoría</label>
            <select
                value={idcategoria} // Usar idcategoria
                onChange={(e) => setIdcategoria(e.target.value)} // Convertir a número
                className="w-full p-3 border border-gray-700 rounded bg-black text-white"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.idcategoria} value={categoria.idcategoria}>
                    {categoria.nombreCategoria}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-between mt-6 space-x-6">
            <button 
              type="button" onClick={handleSave}
              disabled={loading} // Desactiva el botón mientras se carga
              className={`border-2 py-1 px-3 sm:py-2 sm:px-6 rounded transition ${
                loading ? 'border-gray-500 text-gray-500' : 'border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white'
              }`}
            >
              {loading ? 'Guardando...' : 'GUARDAR'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-white-500 text-white-500 py-1 px-3 sm:py-2 sm:px-6 rounded hover:bg-gray-600 hover:text-white transition"
            >
              CERRAR
            </button>
          </div>
          {mensaje && <p className="text-green-500 mt-4">{mensaje}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalEditar;
