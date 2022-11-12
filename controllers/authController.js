import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { forgotPassEmail } from '../helpers/emails.js';
import { signToken } from '../helpers/tokens.js';

const usersLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      msg: 'Por favor introduza un correo y una contraseñas ',
    });
  }

  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'password', 'fullName', 'confirmed'],
  });

  console.log(user);

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
  const token = signToken({ id: user.id, name: user.fullName });
  console.log(token);

  res.status(200).json({
    status: 'ok',
    msg: `Bienvenido ${user.fullName}`,
    token,
  });
};

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

const updatePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    where: { token },
    attributes: ['id', 'password', 'token'],
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.token = null;
  await user.save();
};

export { usersLogin, forgotPassRequest, updatePassword };
