import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 4321, // Asegúrate de que coincida con el puerto que usas en tu frontend
    proxy: {
      '/api': {
        target: 'http://node_api:3000', // Aquí `node_api` debe coincidir con el nombre del contenedor Docker de tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
