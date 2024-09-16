import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import '../src/config/db'

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Configuración de seguridad
app.use(helmet());

// Logger de solicitudes HTTP usando `morgan` y el stream definido
app.use(morgan('combined'));

// Middleware para parseo de JSON
app.use(express.json());


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
  