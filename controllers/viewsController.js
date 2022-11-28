import jwt from 'jsonwebtoken';
import { checkPassToken, checkToken } from './tokensController.js';

const loginForm = async (req, res) => {
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
  const { _token } = req.cookies;
  const decoded = jwt.verify(_token, process.env.JWT_SECRET);
  res.status(200).render('auth/adminPanel', {
    page: 'Admin Panel',
    barra: true,
    user: decoded.name,
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
    res.status(200).render('auth/forgotPassword', {
      page: 'Account Confirmation',
      top: `¡Woha! ¡Bienvenido ${userToken.fullName}!`,
      instructions:
        'Por favor introduce una nueva contraseña para completar la activacion de tu cuenta',
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

const newNeighborhood = async (req, res) => {
  res.status(200).render('auth/neighborhoods', {
    page: 'Neighborhoods',
    barra: true,
  });
};
const userProfile = async (req, res) => {
  const { _token } = req.cookies;
  const decoded = jwt.verify(_token, process.env.JWT_SECRET);
  res.status(200).render('auth/userProfile', {
    page: 'Neighborhoods',
    barra: true,
    name: decoded.name,
  });
};

const reports = async (req, res) => {
  res.status(200).render('reports/reportsView', {
    page: 'Reports',
    barra: true,
  });
};

export {
  loginForm,
  regForm,
  adminPanel,
  forgotPass,
  accountConfirmationEmail,
  newNeighborhood,
  userProfile,
  reports,
};
