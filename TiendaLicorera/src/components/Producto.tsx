import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import CardCategoria from '../components/CardCategoria';
import ModalNuevoProducto from '../components/ModalNuevoProducto'; // Importa el modal

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);  // Estado para almacenar los productos
  const [error, setError] = useState<string | null>(null);    // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true);      // Estado para manejar el loading
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para manejar la visibilidad del modal

  // Función para obtener los productos desde la API
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      const data: Product[] = await response.json();
      setProductos(data); // Cargamos únicamente los productos de la API
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('Error al obtener los productos');
    } finally {
      setLoading(false);  // Finalizamos el estado de carga
    }
  };

  useEffect(() => {
    fetchProductos(); // Se ejecuta solo cuando el componente se monta
  }, []);

  // Función para agregar un nuevo producto al estado
  const handleAddProduct = (newProduct: Product) => {
    console.log('Producto agregado en handleAddProduct:', newProduct); // Verificar que se llama la función
    setProductos((prevProductos) => [...prevProductos, newProduct]); // Agrega el nuevo producto al final del array
    setShowModal(false); // Cerrar el modal después de agregar el producto
  };

  // Función para actualizar un producto en el estado
  const handleUpdateProduct = async (updatedProduct: Product) => {
    if (typeof updatedProduct.idproducto !== 'number') {
      console.error("El ID del producto no es un número válido:", updatedProduct.idproducto);
      return;
    }

    try {
      const productToUpdate = {
        idproducto: updatedProduct.idproducto,
        nombre_producto: updatedProduct.nombre_producto,
        precio: updatedProduct.precio,
        imagen: updatedProduct.image_url,
        idcategoria: updatedProduct.idcategoria,
        nombreCategoria: updatedProduct.nombre_categoria,
      };

      const response = await fetch(`http://localhost:3000/api/products/${updatedProduct.idproducto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productToUpdate),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el producto');
      }
  
      setProductos((prevProductos) =>
        prevProductos.map((product) =>
          product.idproducto === updatedProduct.idproducto ? updatedProduct : product
        )
      );
  
      alert('Producto actualizado con éxito');
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error al actualizar el producto');
    }
  };

  // Función para borrar un producto
  const handleDeleteProducto = async (productoId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
  
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productoId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
  
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.idproducto !== productoId)
        );
  
        alert('Producto eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        setError('Error al eliminar el producto');
      }
    }
  };

  // Mostrar loading o error
  if (loading) {
    return <p>Cargando productos...</p>;  // Indicador de carga
  }

  if (error) {
    return <p>{error}</p>;  // Mensaje de error
  }

  // Agrupar productos por categoría
  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoria = producto.nombre_categoria || "Sin categoría"; // Agrupa por nombre de categoría
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {} as Record<string, Product[]>); // Definir un tipo explícito para el objeto acumulador

   // Lista de colores para asignar a las categorías
   const borderColors = ['border-blue-500', 'border-green-400', 'border-yellow-400'];
   const titleColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-400'];

  return (
    <>

      {Object.entries(productosPorCategoria).map(([categoria, productos], index: number) => (
        <CardCategoria
          key={categoria}
          categoriaTitulo={categoria.toUpperCase()}
          productos={productos}
          borderColor={borderColors[index % borderColors.length]} // Asigna un color de borde según el índice
          titleColor={titleColors[index % titleColors.length]} // Asigna un color de título según el índice
          onProductUpdated={handleUpdateProduct} // Pasar la función para actualizar productos
          onDelete={handleDeleteProducto} // Pasar la función para eliminar productos
        />
      ))}
      {showModal && (
        <ModalNuevoProducto
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onProductCreated={handleAddProduct} // Pasar la función para agregar producto
        />
      )}
    </>
  );
};

export default Productos;
