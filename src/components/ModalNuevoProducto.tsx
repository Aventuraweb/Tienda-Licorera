import { useState, useEffect } from 'react';
import type { Categoria, Product } from '../types';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onProductCreated: (newProduct: Product) => void; // Nueva prop para notificar cuando se crea un producto
}

const ModalNuevoProducto: React.FC<ModalProps> = ({ showModal, onClose, onProductCreated }) => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoriaId, setcategoriaId] = useState(''); // Estado para la categoría seleccionada
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Inicializar con el tipo correcto
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //Categorías predefinidas
  const categoriasPredefinidas: Categoria[] = [
    { idcategoria: 1, nombreCategoria: 'cervezas' },
    { idcategoria: 3, nombreCategoria: 'snacks' },
    { idcategoria: 4, nombreCategoria: 'licores' }
  ];

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categoria', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: Categoria[] = await response.json();

        // Verificar que `data` es un array antes de asignarlo al estado
        if (Array.isArray(data)) {
          // Combinar categorías predefinidas con las obtenidas del backend
          const categoriasCombinadas = [...categoriasPredefinidas, ...data];
          // Remover duplicados en base al `idcategoria`
          const categoriasUnicas = Array.from(new Set(categoriasCombinadas.map(c => c.idcategoria)))
            .map(id => categoriasCombinadas.find(c => c.idcategoria === id)!);
          setCategorias(categoriasUnicas);
        } else {
          setCategorias(categoriasPredefinidas); // Si no hay datos del backend, usar predefinidas
          console.error('La respuesta de la API no es un array');
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setCategorias(categoriasPredefinidas); // Establecer categorías predefinidas en caso de error
      }
    };

    if (showModal) { // Solo obtener las categorías si el modal está visible
      fetchCategorias();
    }
  }, [showModal]); // Volver a obtener categorías si se muestra el modal

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!nombreProducto || !precio || !imagen || !categoriaId) {
      alert('Todos los campos son obligatorios.');
      return;
    }
  
    setLoading(true);
    setError('');
    setMensaje('');
  
    const productData = {
      nombreProducto,
      precio: parseFloat(precio), // Asegúrate de enviar un número
      imagen,
      categoriaId: parseInt(categoriaId), // Convertir a número
    };
    
    console.log('Datos enviados a la API:', productData); // Verificar datos

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData), // Envía el objeto como JSON
      });

        // Manejar la respuesta de la API
      if (!response.ok) {
        const errorData = await response.json(); // Ver el mensaje de error devuelto por el servidor
        console.error('Error de la API:', errorData); // Mostrar el mensaje de error detallado
        setError(errorData.message || 'Error al crear el producto.');
        return; // Salir de la función si hay un error
      }

  
      if (response.ok) {
        const newProduct: Product = await response.json();
        onProductCreated(newProduct); // Notificar al padre que se creó un nuevo producto
        setMensaje('Producto creado con éxito.');
        setNombreProducto('');
        setPrecio('');
        setImagen('');
        setcategoriaId('');
        onClose(); // Cierra el modal
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear el producto.');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión.');
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
        <h2 className="text-white text-4xl font-bold mb-4 text-center">AGREGAR PRODUCTO</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              placeholder='Ingrese nombre del producto'
              className="w-full p-3 border border-gray-700 rounded bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Precio</label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder='Ingresa precio del producto'
              className="w-full p-3 border border-gray-700 rounded bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Imagen</label>
            <input
              type="url"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)} 
              placeholder='Ingrese url de la imagen'
              className="w-full p-3 border border-gray-700 rounded bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Categoría</label>
            <select
              value={categoriaId}
              onChange={(e) => setcategoriaId(e.target.value)}
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
              type="submit"
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

export default ModalNuevoProducto;
