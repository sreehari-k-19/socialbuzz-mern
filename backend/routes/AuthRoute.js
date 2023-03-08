import express from 'express';
import { loginUser, registerUser, verifiy } from '../controllers/AuthController.js';
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id/verify/:token/',verifiy)

export default router;