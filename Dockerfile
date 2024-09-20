# Utilizar la imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Construir el proyecto si se utiliza TypeScript
RUN npm run build

# Exponer el puerto que utiliza la aplicación (cambiar según la configuración del backend)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
