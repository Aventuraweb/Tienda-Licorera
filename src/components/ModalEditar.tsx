import { useState } from 'react';


interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  product: { name: string; precio$: any; image: string};
}

const Modal = ({ showModal, onClose, product }: ModalProps) => {

  // Manejar el estado de los valores editables
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image);
  const [precio, setPrecio] = useState(product.precio$);

  // Si el modal no está visible, no renderizar nada
  if (!showModal) return null;

  // Función para manejar el envío del formulario (GUARDAR cambios)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los datos actualizados al backend o actualizarlos en el estado global
    console.log({ name, image, precio });
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="border-2 border-blue-400 rounded-lg shadow-lg p-6 w-80 sm:w-96 relative bg-blue-800 bg-opacity-25">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-blue-400 text-3xl font-bold mb-4 text-center">
          EDITAR CARD:
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-white-400 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Actualiza el estado al cambiar el input
              className="w-full p-2 border-2 border-blue-400 rounded bg-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white-400 text-sm font-bold mb-2">
              Imagen
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)} // Actualiza el estado al cambiar el input
              className="w-full p-2 border-2 border-blue-400 rounded bg-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white-400 text-sm font-bold mb-2">
              Precio
            </label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)} // Actualiza el estado al cambiar el input
              className="w-full p-2 border-2 border-blue-400 rounded bg-transparent"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="border-2 border-blue-400 text-blue-400 py-1 px-2 sm:py-2 sm:px-4 rounded shadow-lg hover:bg-blue-700"
            >
              GUARDAR
            </button>
            <button
              type="button"
              onClick={onClose}
              className=" border-2 border-white-400  text-white py-1 px-2 sm:py-2 sm:px-4 rounded shadow-lg hover:bg-gray-600"
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
