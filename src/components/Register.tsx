import React, { useState } from "react";

function Register() {
  const [mensaje, setMensaje] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);  // Para manejar el estado de éxito
  const [error, setError] = useState("");  // Para manejar errores

  // Función que se ejecutará cuando se envíe el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar la recarga de la página

    const payload = { nombreUsuario, correo, password };

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir credenciales en la solicitud
        body: JSON.stringify(payload),
      });

      if (response.ok) {  // Verifica si la respuesta es un código 200-299
        const data = await response.json();
        setSuccess(true);
        setMensaje("Usuario registrado con éxito");
        alert('Usuario registrado con éxito');
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión');
    }
  };

  return (
    <div className="border-4 border-blue-400 bg-blue-800 bg-opacity-25 rounded-lg max-w-md w-full p-4 mt-6 mb-6">
      <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
        REGISTRARSE
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor='nombre'
            className="block text-sm font-semibold mb-2 text-white-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full p-3 rounded bg-transparent border-2 border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:border-blue-300"
            placeholder="Ingrese Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor='email'
            className="block text-sm font-semibold mb-2 text-white-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-3 rounded bg-transparent border-2 border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:border-blue-300"
            placeholder="Ingrese correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor='password'
            className="block text-sm font-semibold mb-2 text-white-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-transparent border-2 border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:border-blue-300"
            placeholder="Ingrese contraseña"
          />
        </div>
        {mensaje && (
          <div className={`mb-4 text-center ${success ? 'text-green-500' : 'text-red-500'}`}>
            {mensaje}
          </div>
        )}
        <div className="flex justify-center space-x-4 gap-4">
          <button
            className="border-2 border-blue-400 text-blue-500 py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition"
            type="submit"
          >
            Registrarse
          </button>
          <a href='/login' className="border-2 border-white-400 text-white-500 py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition text-center">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
