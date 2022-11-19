import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { nanoid } from 'nanoid';
import { User } from '../models/relationsModel.js';
import { accountConfirmation } from '../helpers/emails.js';

const getAllUsers = async (req, res) => {
  const { _token } = req.cookies;
  const decoded = jwt.verify(_token, process.env.JWT_SECRET);

  const users = await User.findAll({
    where: { adminID: decoded.id },
    attributes: ['id', 'fullName', 'phone', 'neighborhoodName'],
  });
  res.send(users);
};

const newUser = async (req, res) => {
  const { _token } = req.cookies;
  const decoded = jwt.verify(_token, process.env.JWT_SECRET);
  try {
    const {
      fullName,
      email,
      dni,
      password,
      neighborhoodName,
      address,
      rol,
      phone,
    } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { dni }],
      },
    });

    if (user) {
      return res.status(404).json({
        status: 'fail',
        msg: 'Este usuario ya existe',
      });
    }

    const nUser = await User.create({
      fullName,
      email,
      dni,
      password,
      neighborhoodName: decoded.neighborhood,
      address,
      token: nanoid(10),
      rol,
      phone,
      adminID: decoded.id,
      colID: decoded.neighborhoodID,
    });

    accountConfirmation({
      name: nUser.fullName,
      email: nUser.email,
      token: nUser.token,
    });

    return res.status(201).json({
      status: 'ok',
      msg: 'Usuario agregado exitosamente',
      nUser,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'fail',
      msg: 'Por favor complete todos los campos necesarios',
    });
  }
};

const getUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 'ok', msg: 'Implementing', id });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 'ok', msg: 'Implementing', id });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        msg: 'El usuario no existe',
      });
    }
    await user.destroy();
    return res.status(201).json({
      status: 'ok',
      msg: 'El usuario ha sido eliminado',
    });
  } catch (error) {
    return res.status(201).json({
      status: 'ok',
      msg: error,
    });
  }
};

export { getAllUsers, newUser, getUser, updateUser, deleteUser };
