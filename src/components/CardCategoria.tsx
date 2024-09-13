
import React, { useState } from 'react'; // Importar el hook de React para manejar el estado
import ModalEditar from './ModalEditar'

interface Product {
  name: string;
  image: string;
  precio$: any;
  borderColor?: string; // Color del borde de la tarjeta
}

interface Props {
    categoriaTitulo: string;
    productos: Product[];
    containerBorderColor?: string; // Color del borde de los contenedores
    borderColor?: string; 
    titleColor?: string; // Color del texto del título

}

//Acceder a los props  
const CardCategoria: React.FC<Props> = ({ categoriaTitulo, productos, containerBorderColor = 'border-blue-400', titleColor = 'bg-blue-500', borderColor = 'border-blue-400' }) => {

// Crear el estado para manejar el modal y el producto seleccionado
const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

// Función para abrir el modal
const handleEditClick = (product: Product) => {
  setSelectedProduct(product);
  setShowModal(true);
};

// Función para cerrar el modal
const handleCloseModal = () => {
  setShowModal(false);
  setSelectedProduct(null);
};

return (
    <div className="p-4 border-2 border-blue-400 mt-4">
      <h2 className={`text-2xl text-center font-bold text-white mb-4 ${titleColor} w-48 p-4 rounded-lg`}>
        {categoriaTitulo}
      </h2>

      <div className={`grid grid-cols-3 gap-4 ${containerBorderColor}`}>
        {productos.map((product) => (
          <div key={product.name} className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border-4 ${product.borderColor || borderColor} w-72 h-auto`}>
            <div className={`border-2 ${product.borderColor || borderColor} h-32 w-full overflow-hidden`}>
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <div className={`text-center border-2 ${product.borderColor || borderColor}`}>
              <div className="flex justify-center space-x-4 mt-4">
                <h3 className="text-white font-bold text-lg">{product.name}</h3>
                <p>{product.precio$}</p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button className="text-white px-4 py-2">
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
          showModal={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default CardCategoria;