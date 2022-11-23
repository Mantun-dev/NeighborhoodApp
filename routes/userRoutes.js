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

const router = express.Router();

router
  .route('/login')
  .post(
    body('email').isEmail().notEmpty(),
    body('password').notEmpty(),
    adminLogin
  );
router.route('/logout').get(signOut);
router.route('/forgotpassword').post(forgotPassRequest);
router.route('/selfregistration').post(selfRegistration);

router
  .route('/')
  .get(getAllUsers)
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

    newUser
  );
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
