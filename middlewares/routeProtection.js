import jwt from 'jsonwebtoken';
import { User } from '../models/relationsModel.js';

const routeProtection = async (req, res, next) => {
  // Verificar si hay token

  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect('/login');
  }

  // Comprobar el Token

  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: decoded.id,
      attributes: ['id', 'fullName'],
    });

    if (user) {
      req.user = user;
    } else {
      return res.redirect('/login');
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.clearCookie('_token').redirect('/login');
  }
};

export default routeProtection;
