import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoriaController';
import { authenticateUser } from '../middleware/authMiddleware'; // Middleware para verificar autenticación

const router = Router();

// CRUD de categoria
router.post('/categoria', authenticateUser, createCategory);
router.get('/categoria', authenticateUser, getCategories);
router.put('/categoria/:id', authenticateUser, updateCategory);
router.delete('/categoria/:id', authenticateUser, deleteCategory);

export default router;
