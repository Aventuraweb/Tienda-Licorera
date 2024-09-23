# Utilizar la imagen base de Node.js
FROM node:18-bullseye

# Instala el cliente mysql
RUN apt-get update && apt-get install -y default-mysql-client && apt-get clean

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto que utiliza la aplicación (cambiar según la configuración del backend)
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "start"]