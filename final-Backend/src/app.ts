
import express,{ Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import {sessionStore} from '../src/config/db'; 
import authRoutes from '../src/routes/routeAuth'; 
import productsRoutes  from '../src/routes/routeProducts'; 
import categoriaRoutes from '../src/routes/routeCategoria'
import UsersRoutes from '../src/routes/routeUsers'
import { logger, stream } from '../src/utils/logger';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(Cors({
  origin: 'http://localhost:4321', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

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
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1800000,
      },
    })
  );

// Definir las rutas de la API
app.use('/api', authRoutes); 
app.use('/api', productsRoutes)
app.use('/api', UsersRoutes); 
app.use('/api', categoriaRoutes); 

  // Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Servidor frontend corriendo en http://localhost:4321`);
  });
  