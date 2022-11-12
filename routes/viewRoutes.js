import express from 'express';
import { updatePassword } from '../controllers/authController.js';
import {
  loginForm,
  regForm,
  adminPanel,
  forgotPass,
  accountConfirmationEmail,
} from '../controllers/viewsController.js';

const router = express.Router();

router.get('/login', loginForm);
router.get('/admin', adminPanel);
router.get('/registro', regForm);
router.get('/confirmation/:token', accountConfirmationEmail);
router.get('/newpassword/:token', forgotPass);
router.post('/newpassword/:token', updatePassword);

export default router;
