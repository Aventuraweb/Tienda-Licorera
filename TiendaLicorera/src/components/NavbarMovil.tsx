// Navbar inferior visible solo en pantallas móviles 
import { useState } from 'react';
import ModalNuevoProducto from '../components/ModalNuevoProducto'; 
import type { Product } from '../types'

const NavBarMovil = () => {
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
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t-4 border-blue-400 flex justify-around sm:hidden mt-16">
        <button className="flex flex-row items-center text-blue-500 border-2 border-blue-400 p-2 rounded-full">
          <i className="fas fa-home text-x "></i>
          <span className="ml-2 ">HOME</span>
        </button>
        <button className="flex flex-col items-center text-white border-2 border-white p-4 rounded-full" onClick={handleAddProductClick}>
          <i className="fas fa-plus text-x "></i>
        </button>
         {/* Ícono de cerrar sesión  */}
         <img src="https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928375/icons8-logout-rounded-64_mprmci.png" 
          alt="Cerrar sesión" 
          onClick={handleLogout}
          className="w-12 h-12 cursor-pointer ml-4"
        />
      </nav>  

      {/* Modal que se abre cuando el estado `showModal` es verdadero */}
      {showModal && (
        <ModalNuevoProducto 
          showModal={showModal}
          onClose={handleCloseModal}
          onProductCreated={handleAddProduct}
        />
      )}
    </>
  );
};

export default NavBarMovil;
