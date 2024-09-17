// NavBar
import { useState } from 'react';
import ModalNuevoProducto from '../components/ModalNuevoProducto'; 

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal
  const handleAddProductClick = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
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
        alt="Cerrar sesión" />
      </div>
      
      {/* User Icon Section  */}
      <div className="flex items-center space-x-6">
        {/* Botones de Navegación  */}
        <div className="flex space-x-4">
          <a href="/home" 
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
          product={{ name: '', precio$: '', image: '' }} // Producto vacío para crear uno nuevo
        />
      )}
</div>
  );
};

export default NavBar;
  