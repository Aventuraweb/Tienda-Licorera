import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import ModalEditar from './ModalEditar';
import type { CategoriaClases } from '../types'
interface Props {
  categoriaTitulo: string;
  productos: Product[];
  containerBorderColor?: string;
  borderColor?: string;
  titleColor?: string;
  onProductUpdated: (updatedProduct: Product) => void;
  onDelete: (productoId: number) => void; // Función para eliminar desde el componente padre
}

const CardCategoria: React.FC<Props> = ({
  categoriaTitulo,
  productos,
  containerBorderColor, 
  borderColor,
  titleColor,  
  onProductUpdated,
  onDelete,
}) => {
  // Estado para manejar el modal y el producto seleccionado
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categorias, setCategorias] = useState([
    { idcategoria: 1, nombreCategoria: 'cervezas' },
    { idcategoria: 3 , nombreCategoria: 'snacks' },
    { idcategoria: 4 , nombreCategoria: 'licores' },
  ]);
  

  // Función para abrir el modal de edición
  const handleEditClick = (product: Product) => {
    console.log("Producto seleccionado para editar:", product); // Agrega este log para verificar el producto
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Mapear categorías a clases CSS
  const categoriaClases: { [key: string]: CategoriaClases } = {
    cervezas: { borderColor: 'border-blue-500', bgColor: 'bg-blue-500' },
    snacks: { borderColor: 'border-green-400', bgColor: 'bg-green-500' },
    licores: { borderColor: 'border-yellow-400', bgColor: 'bg-yellow-400' },
  };
  
  const clases = categoriaClases[categoriaTitulo] || {
    borderColor: 'border-yellow-400',
    bgColor: 'bg-white-500',
  };


  // Función para manejar el evento de actualización desde el modal
  const handleUpdateProduct = async (updatedProduct: Product) => {
    console.log('Producto actualizado:', updatedProduct);
    
    try {
      // Asegúrate de que el `categoriaId` sea un número antes de enviarlo al backend
      const updatedProductData = {
        nombreProducto: updatedProduct.nombre_producto,
        precio: updatedProduct.precio.toString(), 
        imagen: updatedProduct.image_url,
        categoriaId: Number(updatedProduct.idcategoria), 
      };
  
      console.log('Datos enviados al backend para actualizar producto:', updatedProductData); // Verificar datos
  
      const response = await fetch(`http://localhost:3000/api/products/${updatedProduct.idproducto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el producto');
      }
  
      const updatedData = await response.json();
      onProductUpdated(updatedData); // Llama la función para actualizar el producto en el componente padre
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };
  

  // Función para eliminar el producto
  const handleDeleteClick = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        alert('Producto eliminado con éxito');
        onDelete(id); // Llama la función de eliminación desde el componente padre
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      alert('Error de conexión');
    }
  };

  return (
    <div className="p-4 mb-20 mt-10">
      <h2 className={`text-2xl text-center font-bold text-white mb-4 ${clases.bgColor} ${titleColor} w-72 sm:w-72 h-auto p-4 rounded-lg`}>
        {categoriaTitulo.toUpperCase()}
      </h2>

      <div
        className={`grid grid-wrap-3 gap-4 sm:grid-cols-3 overflow-x-auto sm:overflow-x-visible  sm:grid sm:space-x-0 sm:px-0 space-x-0 sm:space-x-reverse scrollbar-custom`}
      >
        {productos.map((product) => (
          <div
            key={product.idproducto} // Usar el ID del producto como key
            className={`inline-block bg-gray-800 rounded-lg overflow-hidden shadow-lg border-4  ${clases.borderColor} w-72 sm:w-72 h-auto mb-4 sm:mx-0`}
          >
            <div className={`border-2  ${clases.borderColor} h-32 w-full overflow-hidden `}>
              <img src={product.image_url} alt={product.nombre_producto} className="h-full w-full object-cover" />
            </div>

            <div className={`text-center border-2 ${clases.borderColor}`}>
              <div className="flex justify-center space-x-4 mt-4">
                <h3 className="text-white font-bold text-lg">{product.nombre_producto}</h3>
                <p>{product.precio}</p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="text-white px-4 py-2"
                  onClick={() => handleDeleteClick(product.idproducto)} // Usar handleDeleteClick para eliminar
                >
                  <i className="fas fa-trash"></i> Borrar
                </button>
                <button
                  className="text-white px-4 py-2 rounded-lg"
                  onClick={() => handleEditClick(product)}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <ModalEditar
          producto={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleUpdateProduct} // Pasar la función para actualizar el producto
          categorias={categorias}
        />
      )}
    </div>
  );
};

export default CardCategoria;

