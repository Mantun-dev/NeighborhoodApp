import jwt from 'jsonwebtoken';
import { Colonias } from '../models/relationsModel.js';

const getAllNeighborhoods = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    msg: 'Todas las colonias',
  });
};

const newNeighborhood = async (req, res) => {
  const { _token } = req.cookies;
  const decoded = jwt.verify(_token, process.env.JWT_SECRET);

  const { name, county, state } = req.body;
  try {
    const newNeighborhood = await Colonias.create({
      name,
      county,
      state,
      adminID: decoded.id,
    });

    return res.status(200).json({
      status: 'ok',
      msg: 'Colonia agregada exitosamente',
      newNeighborhood,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      msg: 'Por favor complete todos los campos necesarios',
    });
  }
};

const getNeighborhood = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    msg: 'Here is your Neighborhood',
  });
};

const updateNeighborhood = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    msg: 'Neighborhood Updated',
  });
};

const deleteNeighborhood = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    msg: 'Neighborhood Deleted',
  });
};

export {
  getAllNeighborhoods,
  newNeighborhood,
  getNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
};
