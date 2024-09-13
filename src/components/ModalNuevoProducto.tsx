import { useState } from 'react';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  product: { name: string; precio$: any; image: string };
}

const Modal = ({ showModal, onClose, product }: ModalProps) => {
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [precio, setPrecio] = useState(product.precio$);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para guardar el nuevo producto aquí
    console.log({ name, image, precio });
    onClose(); // Cierra el modal después de guardar
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="border-2 border-gray-700 rounded-lg shadow-lg p-6 w-[500px] relative bg-black">
      {/* Botón de cerrar */}
      <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose}>
        &times;
      </button>
  
      {/* Título del formulario */}
      <h2 className="text-white text-4xl font-bold mb-4 text-center">
        NUEVO PRODUCTO
      </h2>

      <h3 className='text-white text-2xl font-bold mb-4 '>
        Crear tarjeta
      </h3>
  
      {/* Subtítulo */}
      <p className="text-gray-400 text-center mb-6">
        COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE PRODUCTO
      </p>
  
      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo Nombre */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            placeholder="ingrese el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded bg-black text-white"
          />
        </div>
  
        {/* Campo Imagen */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Imagen
          </label>
          <input
            type="url"
            placeholder="el enlace es obligatorio"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`w-full p-3 border ${
              image ? "border-gray-700" : "border-red-600"
            } rounded bg-black text-white`}
          />
        </div>
  
        {/* Campo Precio */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Precio
          </label>
          <input
            type="text"
            placeholder="ingrese el precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded bg-black text-white"
          />
        </div>
  
        {/* Botones Guardar y Cerrar */}
        <div className="flex justify-between mt-6 space-x-6">
          <button
            type="submit"
            className="border-2 border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition"
          >
            GUARDAR
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border-2 border-white-500 text-white-500 py-2 px-6 rounded hover:bg-gray-600 hover:text-white transition"
          >
            CERRAR
          </button>
        </div>
      </form>
    </div>
  </div>  
  );
};

export default Modal;
