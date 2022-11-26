import express from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

import {
  signOut,
  adminLogin,
  forgotPassRequest,
  selfRegistration,
} from '../controllers/authController.js';

import routeProtection from '../middlewares/routeProtection.js';

const router = express.Router();

router
  .route('/login')
  .post(
    body('email')
      .isEmail()
      .notEmpty()
      .withMessage('Por favor introduzca un correo electronico valido'),
    body('password')
      .notEmpty()
      .withMessage('Por favor introduzca una contrasena'),
    adminLogin
  );
router.route('/logout').get(signOut);
router.route('/forgotpassword').post(forgotPassRequest);
router.route('/selfregistration').post(selfRegistration);

router
  .route('/')
  .get(routeProtection, getAllUsers)
  .post(
    body('fullName').notEmpty().withMessage('Nombre'),
    body('email').isEmail().withMessage('Correo'),
    body('phone')
      .isNumeric()
      .withMessage('Por favor ingrese un telefono válido'),
    body('dni').isNumeric().withMessage('Por favor ingrese un DNI válido'),
    body('phone')
      .isLength({ max: 8 })
      .withMessage('Por favor ingrese un telefono válido'),
    body('dni')
      .isLength({ max: 13 })
      .withMessage('Por favor ingrese un DNI válido'),
    routeProtection,

    newUser
  );
router
  .route('/:id')
  .get(routeProtection, getUser)
  .patch(routeProtection, updateUser)
  .delete(routeProtection, deleteUser);

export default router;
