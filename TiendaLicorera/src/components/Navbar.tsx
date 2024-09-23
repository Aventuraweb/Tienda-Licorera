
// NavBar
import { useState } from 'react';
import ModalNuevoProducto from '../components/ModalNuevoProducto'; 
import type { Product } from '../types';

const NavBar = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal
  const handleAddProductClick = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para agregar un nuevo producto al estado local del NavBar
  const handleAddProduct = (newProduct: Product) => {
    setProductos((prevProductos) => [...prevProductos, newProduct]);
  };

   // Función para manejar el cierre de sesión
   const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de que este encabezado es necesario
        },
        credentials: 'include', // Incluir credenciales en la solicitud
      });
  
      if (response.ok) {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login'; 
      } else {
        // Capturar y mostrar el mensaje de error desde la API
        const errorData = await response.json();
        console.error('Error al cerrar sesión:', errorData.message);
        alert(`Error al cerrar sesión: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      alert('Error de conexión. Inténtelo de nuevo.');
    }
  };  

return (

<div className="hidden sm:block">
    <nav className="bg-gray-900 p-4 flex justify-between items-center border-b-4 border-blue-400">
      {/* Logo Section  */}
      <div className="flex items-center">
        <img src="https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928420/manrubio_arzwgc.png" 
        alt="Manrubio Logo" 
        className="w-24 h-auto" />
        {/* Ícono de cerrar sesión  */}
        <img src="https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928375/icons8-logout-rounded-64_mprmci.png" 
        alt="Cerrar sesión" 
        onClick={handleLogout}
        className="w-8 h-8 cursor-pointer ml-4"
        />
        <span className="text-sm mt-2 mb-2">Cerrar sesión</span>
      </div>
      
      {/* User Icon Section  */}
      <div className="flex items-center space-x-6">
        {/* Botones de Navegación  */}
        <div className="flex space-x-4">
          <a href="" 
            className="border-2 border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300">
            HOME
          </a>
          <button 
              onClick={handleAddProductClick}
              className="border-2 border-white text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              AGREGAR PRODUCTO
            </button>
        </div>
      </div>
    </nav>

   {/* Modal que se abre cuando el estado `showModal` es verdadero */}
   {showModal && (
        <ModalNuevoProducto 
          showModal={showModal}
          onClose={handleCloseModal}
          onProductCreated={handleAddProduct}
        />
      )}
</div>
  );
};

export default NavBar;
  
