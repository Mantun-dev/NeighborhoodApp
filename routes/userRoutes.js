import express from 'express';
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

router.route('/login').post(adminLogin);
router.route('/logout').get(signOut);
router.route('/forgotpassword').post(forgotPassRequest);
router.route('/selfregistration').post(selfRegistration);

router.route('/').get(getAllUsers).post(newUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
