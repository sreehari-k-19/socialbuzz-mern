import express from 'express';
import { forgotPassword, googleRegister, loginUser, registerUser, resetPassword, verifiy } from '../controllers/AuthController.js';
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id/verify/:token/',verifiy)
router.post('/forgotpassword',forgotPassword)
router.post('/resetpassword',resetPassword)
router.post('/google',googleRegister)
export default router;