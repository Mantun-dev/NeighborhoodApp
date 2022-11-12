import { checkPassToken, checkToken } from './selfRegistrationController.js';

const loginForm = (req, res) => {
  res.status(200).render('auth/login', {
    page: 'Login',
  });
};

const regForm = (req, res) => {
  res.status(200).render('auth/registro', {
    page: 'User Registration',
    barra: true,
  });
};

const adminPanel = (req, res) => {
  res.status(200).render('auth/adminPanel', {
    page: 'Admin Panel',
    barra: true,
  });
};

const forgotPass = async (req, res) => {
  const { token } = req.params;

  const userToken = await checkPassToken(token);

  if (userToken !== null) {
    res.status(200).render('auth/forgotPassword', {
      page: 'Reset Password',
      top: 'Completa los pasos para cambiar tu contraseña',
    });
  } else {
    return res.status(404).render('auth/accountConfirmation', {
      page: 'Error',
      top: `¡Ups! ¡Algo, salio mal!`,
      message: 'Este enlace a expirado, por favor solicite uno nuevo',
      error: true,
    });
  }
};

const accountConfirmationEmail = async (req, res) => {
  const { token } = req.params;
  const userToken = await checkToken(token);
  if (userToken !== null) {
    res.status(200).render('auth/accountConfirmation', {
      page: 'Account Confirmation',
      top: `¡Woha! ¡Bienvenido ${userToken.fullName}!`,
      message: 'Se ha confirmado tu cuenta correctamente',
    });
    userToken.token = null;
    userToken.confirmed = true;
    userToken.save();
  } else {
    return res.status(404).render('auth/accountConfirmation', {
      page: 'Error',
      top: `¡Ups! ¡Algo, salio mal!`,
      message: 'Este enlace a expirado, por favor solicite uno nuevo',
      error: true,
    });
  }
};

export { loginForm, regForm, adminPanel, forgotPass, accountConfirmationEmail };
