import React, { useState } from "react";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar la recarga de la página

    const payload = { correo, password };

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir credenciales en la solicitud
        body: JSON.stringify(payload),
      });

      if (response.ok) { // Verifica si la respuesta es un código 200-299
        const data = await response.json();
        setSuccess(true);
        setMensaje("Usuario autenticado con éxito");
        alert('Usuario autenticado con éxito');
        window.location.href = '/productos'; 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión');
    }
  };

  return (
    <div className="border-4 border-blue-400 bg-blue-800 bg-opacity-25 rounded-lg max-w-md w-full p-4 mt-20 mb-6">
      <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
        INICIAR SESIÓN
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Correo</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-2 border-2 border-blue-400 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-2 border-blue-400 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center space-x-4 gap-4">
          <button
            type="submit"
            className="border-2 border-blue-400 text-blue-500 py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
          <a href='/registro' className="border-2 border-white-400 text-white-500 py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition text-center">
            Registrarse
          </a>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
