import { nanoid } from 'nanoid';
import { JSON, Op } from 'sequelize';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import { Visitor, Guest } from '../models/relationsModel.js';

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
    const { arrivalDate } = req.body;

    const { dni, fullName, phone, colID } = req.body;

    const guest = await Guest.findOne({ where: { dni } });

    if (!guest) {
      await Guest.create({
        fullName,
        dni,
        phone,
      });
    }

    const nVisitor = await Visitor.create({
      securityCode: nanoid(10),
      arrivalDate,
      guestID: guest.id,
      userID: 1,
      colID,
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

// ? SE VERIFICA SI LA VISITA EXISTE Y SI SU CODIGO NO HA SIDO USADO

const arrival = async (req, res) => {
  try {
    const { id } = req.params;
    const visitor = await Visitor.findOne({ where: { id } });

    if (!visitor || visitor.departureDate != null) {
      return res.status(500).json({
        status: 'fail',
        msg: 'Esta visita no existe o el codigo ha expirado',
      });
    }

    const { guardID } = req.body;
    await visitor.update({ guardID, arrivalDate: new Date() });

    return res.status(200).json({
      status: 'ok',
      msg: 'La visita ha llegado',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      msg: error,
    });
  }
};

// ? SE ACTUALIZA LA FECHA DE SALIDA Y SE ANULA EL CODIGO

const departure = async (req, res) => {
  try {
    const { guardID } = req.body;
    const { id } = req.params;
    const departureDate = new Date();

    const visitor = await Visitor.findOne({ where: { id } });

    // await visitor.update({ guardID, departureDate: new Date() });

    if (!visitor) {
      return res.status(404).json({
        status: 'ok',
        msg: 'La visita no existe',
        test,
      });
    }

    if (visitor.departureDate != null) {
      return res.status(404).json({
        status: 'fail',
        msg: 'El codigo de salida ya ha sido registrado',
      });
    }

    const test = await db.query(
      'CALL VISITOR_DEPARTURE(:_ID, :_GUARDID, :_DEPARTUREDATE)',
      {
        replacements: {
          _ID: id,
          _GUARDID: guardID,
          _DEPARTUREDATE: departureDate,
        },
      }
    );

    return res.status(200).json({
      status: 'ok',
      msg: 'La visita ha salido de la colonia',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      msg: error,
    });
  }
};

const deleteVisitor = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    msg: 'Visitor Deleted',
  });
};

// ? FUNCION PARA LOS REPORTES

const reports = async (req, res) => {
  try {
    let { initialDate, endDate } = req.body;

    if (!initialDate || !endDate) {
      return res.status(404).json({
        status: 'fail',
        msg: 'Por favor introduza un rango de fechas valido',
      });
    }

    if (initialDate > endDate) {
      return res.status(404).json({
        status: 'fail',
        msg: 'La fecha inicial no puede ser mayor que la fecha final',
      });
    }

    const { _token } = req.cookies;
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    initialDate = new Date(initialDate);
    endDate = new Date(endDate);
    const colID = decoded.neighborhoodID;

    // const visitors = await Visitor.findAll({
    //   where: {
    //     colID,
    //     arrivalDate: { [Op.between]: [initialDate, endDate] },
    //   },
    // });

    const visitors = await db.query(
      'CALL VISITOR_REPORTS(:_COL_ID, :_INITIAL_DATE, :_END_DATE)',
      {
        replacements: {
          _COL_ID: colID,
          _INITIAL_DATE: initialDate,
          _END_DATE: endDate,
        },
      }
    );

    return res.status(200).json({
      status: 'ok',
      msg: 'Generando Reporte',
      visitors,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'fail',
      msg: error,
    });
  }
};

export {
  getAllVisitors,
  newVisitor,
  getVisitor,
  arrival,
  departure,
  deleteVisitor,
  reports,
};
