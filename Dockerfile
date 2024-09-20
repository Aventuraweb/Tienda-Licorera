# Utilizar la imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del frontend
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Construir la aplicación de frontend
RUN npx tsc

# Exponer el puerto del servidor web
EXPOSE 4321

# Comando para ejecutar el entorno de desarrollo 
CMD ["npm", "run", "dev"]
