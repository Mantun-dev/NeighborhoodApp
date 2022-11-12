import { Op } from 'sequelize';
import { nanoid } from 'nanoid';

import User from '../models/userModel.js';
import { accountConfirmation } from '../helpers/emails.js';

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ status: 'ok', msg: 'Implementing', users });
};

const newUser = async (req, res) => {
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
      neighborhoodName,
      address,
      token: nanoid(10),
      rol,
      phone,
    });

    accountConfirmation({
      name: nUser.fullName,
      email: nUser.email,
      token: nUser.token,
    });

    return res.status(201).json({
      status: 'ok',
      msg: 'Usuario agregado exitosamente',
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

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 'ok', msg: 'Implementing', id });
};

export { getAllUsers, newUser, getUser, updateUser, deleteUser };
