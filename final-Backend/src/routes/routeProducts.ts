import { Router } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productsController';
import { authenticateUser } from '../middleware/authMiddleware'; // Middleware para verificar autenticación

const router = Router();

// CRUD de productos
router.post('/products', authenticateUser, createProduct);
router.get('/products',  authenticateUser, getProducts);
router.put('/products/:id', authenticateUser, updateProduct);
router.delete('/products/:id', authenticateUser, deleteProduct);

export default router;
