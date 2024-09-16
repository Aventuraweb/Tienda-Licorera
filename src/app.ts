import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import {sessionStore} from '../src/config/db'; 
import authRoutes from '../src/routes/routeAuth'
import { logger, stream } from '../src/utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Configuración de seguridad
app.use(helmet());

// Logger de solicitudes HTTP usando `morgan` y el stream definido
app.use(morgan('combined', { stream }));

// Middleware para parseo de JSON
app.use(express.json());

// Configurar la sesión con almacenamiento en MySQL
app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60000,
      },
    })
  );

// Definir las rutas de la API
app.use('/api', authRoutes); 

  // Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
  