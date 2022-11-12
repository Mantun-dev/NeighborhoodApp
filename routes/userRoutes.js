import express from 'express';
import {
  getAllUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

import {
  usersLogin,
  forgotPassRequest,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/login').post(usersLogin);
router.route('/forgotpassword').post(forgotPassRequest);

router.route('/').get(getAllUsers).post(newUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
