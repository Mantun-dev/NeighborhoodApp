import { nanoid } from 'nanoid';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/relationsModel.js';
import { forgotPassEmail, accountConfirmation } from '../helpers/emails.js';
import { signToken } from '../helpers/tokens.js';

// ? LOGGIN

const usersLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Por favor introduza un correo y una contraseña',
    });
  }

  const user = await User.findOne({
    where: { email },
    attributes: [
      'id',
      'password',
      'fullName',
      'confirmed',
      'rol',
      'colID',
      'status',
    ],
  });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Usuario o contraseñas invalido',
    });
  }
  if (!user.confirmed) {
    return res.status(400).json({
      status: 'fail',
      msg: 'El usuario aun no ha sido confirmado',
    });
  }

  const correct = await user.verificarPassword(password, user.password);

  if (!user || !correct) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Usuario o contraseñas invalido',
    });
  }
  const token = signToken({
    id: user.id,
    name: user.fullName,
    rol: user.rol,
    neighborhoodID: user.colID,
  });

  res
    .cookie('_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      status: 'ok',
      msg: `Bienvenido ${user.fullName}`,
      token,
    });
};

// ? ADMIN LOGIN

const adminLogin = async (req, res, next) => {
  let result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Por favor complete todos los campos para poder iniciar sesion',
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    attributes: [
      'id',
      'password',
      'fullName',
      'confirmed',
      'rol',
      'colID',
      'status',
    ],
  });

  if (!user || !user.status) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Usuario o contraseñas invalido',
    });
  }
  if (!user.confirmed) {
    return res.status(400).json({
      status: 'fail',
      msg: 'El usuario aun no ha sido confirmado',
    });
  }

  if (user.rol !== 'Admin') {
    return res.status(400).json({
      status: 'fail',
      msg: 'El usuario no cuenta con los privilegios para ingresar',
    });
  }

  const correct = await user.verificarPassword(password, user.password);

  if (!user || !correct) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Usuario o contraseñas invalido',
    });
  }
  const token = signToken({
    id: user.id,
    name: user.fullName,
    neighborhoodID: user.colID,
  });

  res
    .cookie('_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      status: 'ok',
      msg: `Bienvenido ${user.fullName}`,
      token,
    });
};

// ? FORGOT PASSWORD BUTTON REQUEST

const forgotPassRequest = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return;
  }

  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'fullName', 'token', 'email'],
  });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      msg: 'El usuario no existe',
    });
  }
  user.token = nanoid(10);
  forgotPassEmail({
    email: user.email,
    name: user.fullName,
    token: user.token,
  });
  user.save();
  res.status(200).json({
    status: 'ok',
    msg: `Se ha enviado un correo a ${email}`,
  });
};

// ? FORT PASSWORD UPDATE

const IsPassword = (pass) => {
  const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  return regex.test(pass);
};
const updatePassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!IsPassword(password)) {
    return res.status(200).render('auth/forgotPassword', {
      page: 'Reset Password',
      top: 'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.',
    });
  }

  const user = await User.findOne({
    where: { token },
    attributes: ['id', 'password', 'token'],
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.token = null;
  user.confirmed = true;
  await user.save();
  return next();
};

// ? SELF REGISTRATION BUTTON REQUEST
const selfRegistration = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return;
  }

  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'fullName', 'token', 'email'],
  });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      msg: 'El usuario no existe',
    });
  }
  user.token = nanoid(10);
  accountConfirmation({
    email: user.email,
    name: user.fullName,
    token: user.token,
  });
  user.save();
  res.status(200).json({
    status: 'ok',
    msg: `Se ha enviado un correo a ${email}`,
  });
};

const signOut = (req, res) => {
  try {
    res.cookie('_token', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: 'ok',
      msg: `Hasta la proxima!`,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  usersLogin,
  adminLogin,
  forgotPassRequest,
  updatePassword,
  selfRegistration,
  signOut,
};
