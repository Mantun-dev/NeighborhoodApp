import express from 'express';
import { updatePassword } from '../controllers/authController.js';
import {
  loginForm,
  regForm,
  adminPanel,
  forgotPass,
  accountConfirmationEmail,
  newNeighborhood,
  userProfile,
  reports,
} from '../controllers/viewsController.js';

import routeProtection from '../middlewares/routeProtection.js';

const router = express.Router();

router.get('/login', loginForm);
router.get('/reportes', routeProtection, reports);
router.get('/profile', routeProtection, userProfile);
router.get('/admin', routeProtection, adminPanel);
router.get('/registro', routeProtection, regForm);
router.get('/colonias', routeProtection, newNeighborhood);
router
  .route('/confirmation/:token')
  .get(accountConfirmationEmail, loginForm)
  .post(updatePassword, loginForm);
router.get('/newpassword/:token', forgotPass, loginForm);
router.post('/newpassword/:token', updatePassword, loginForm);

export default router;
