const RegisterForm = () => {
    
  return (
    <div className="border-4 border-blue-400 bg-blue-800 bg-opacity-25 rounded-lg max-w-md w-full p-4 mt-6 mb-6">
      <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">REGISTRARSE</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-semibold mb-2 text-white-700">Nombre</label>
          <input type="text" id="nombre" name="nombre" className="w-full p-3 rounded bg-transparent border-2 border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:border-blue-300" placeholder="Ingrese Nombre de usuario" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white-700">Email</label>
          <input type="email" id="email" name="email" className="w-full p-3 rounded bg-transparent border-2 border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:border-blue-300" placeholder="Ingrese correo electrónico" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-2 text-white-700">Contraseña</label>
          <input type="password" id="password" name="password" className="w-full p-3 rounded bg-transparent border-2 border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:border-blue-300" placeholder="Ingrese contraseña" />
        </div>
        <div className="flex justify-center space-x-4 gap-4">
          <button type="submit" className="border-2 border-blue-400 text-blue-500 py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition">
            Registrarse
          </button>
          <a href='/login' className="border-2 border-white-400 text-white-500 py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition text-center">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 
