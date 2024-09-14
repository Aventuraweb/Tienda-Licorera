// Navbar inferior visible solo en pantallas móviles 
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
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t-4 border-blue-400 flex justify-around sm:hidden mt-16">
        <button className="flex flex-row items-center text-blue-500 border-2 border-blue-400 p-2 rounded-full">
          <i className="fas fa-home text-x "></i>
          <span className="ml-2 ">HOME</span>
        </button>
        <button className="flex flex-col items-center text-white border-2 border-white p-4 rounded-full" onClick={handleAddProductClick}>
          <i className="fas fa-plus text-x "></i>
        </button>
      </nav>  

      {/* Modal que se abre cuando el estado `showModal` es verdadero */}
      {showModal && (
        <ModalNuevoProducto 
          showModal={showModal}
          onClose={handleCloseModal}
          product={{ name: '', precio$: '', image: '' }} // Producto vacío para crear uno nuevo
        />
      )}
    </>
  );
};

export default NavBar;
