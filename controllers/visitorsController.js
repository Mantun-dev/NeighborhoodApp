import Visitor from '../models/vistorsModel.js';
import { nanoid } from 'nanoid';

const getAllVisitors = async (req, res) => {
  const visitors = await Visitor.findAll();
  return res.status(200).json({
    status: 'ok',
    msg: 'Todas las visitas',
    visitors,
  });
};

const newVisitor = async (req, res) => {
  try {
    const { guestType, arrivalDate } = req.body;

    const nVisitor = await Visitor.create({
      securityCode: nanoid(10),
      guestType,
      arrivalDate,
    });

    return res.status(200).json({
      status: 'ok',
      msg: 'Visita creada exitosamente',
      nVisitor,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'fail',
      msg: 'Por favor complete todos los campos necesarios',
    });
  }
};

const getVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findOne({ where: { id } });

    return res.status(200).json({
      status: 'ok',
      msg: 'Se ha encontrado el siguiente visitante',
      visitor,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const { departureDate, securityCode } = req.body;
    const visitor = await Visitor.findOne({ where: { id } });
    await visitor.update({ departureDate, securityCode });

    return res.status(200).json({
      status: 'ok',
      msg: 'Visitor Updated',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      msg: 'La visita no existe',
    });
  }
};

const deleteVisitor = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    msg: 'Visitor Deleted',
  });
};

export { getAllVisitors, newVisitor, getVisitor, updateVisitor, deleteVisitor };
