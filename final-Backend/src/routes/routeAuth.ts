import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Rutas de autenticación
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);

export default router;
