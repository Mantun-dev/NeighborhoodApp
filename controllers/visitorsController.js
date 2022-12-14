import { nanoid } from 'nanoid';
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
    const { dni, fullName, phone, colID, userID, arrivalDate } = req.body;

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
      userID,
      colID,
    });

    return res.status(200).json({
      status: 'ok',
      msg: 'Visita creada exitosamente',
      fullName,
      arrivalDate,
      securityCode: nVisitor.securityCode,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: 'fail',
      msg: 'Por favor complete todos los campos necesarios',
    });
  }
};

const getVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findOne({ where: { id } });

    if (!visitor) {
      return res.status(404).json({
        status: 'ok',
        msg: 'No exite este visitante en nuestros registros',
      });
    }

    return res.status(200).json({
      status: 'ok',
      msg: 'Se ha encontrado el siguiente visitante',
      visitor,
    });
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      msg: error,
    });
  }
};

// ? SE VERIFICA SI LA VISITA EXISTE Y SI SU CODIGO NO HA SIDO USADO

const arrival = async (req, res) => {
  try {
    const { guardID, securityCode } = req.body;
    const check = await Visitor.findOne({ where: { securityCode } });

    if (!check || check.departureDate != null) {
      return res.status(401).json({
        status: 'fail',
        msg: 'Esta visita no existe o el codigo ha expirado',
      });
    }

    const visitor = await db.query('CALL ARRIVAL(:_SECURITY_CODE)', {
      replacements: {
        _SECURITY_CODE: securityCode,
      },
    });

    await check.update({ guardID, arrivalDate: new Date() });

    return res.status(200).json({
      status: 'ok',
      msg: 'La visita ha llegado',
      visitor,
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
    const { guardID, securityCode } = req.body;
    const departureDate = new Date();

    const visitor = await Visitor.findOne({ where: { securityCode } });

    // await visitor.update({ guardID, departureDate: new Date() });

    if (!visitor) {
      return res.status(401).json({
        status: 'ok',
        msg: 'La visita no existe',
      });
    }

    if (visitor.departureDate != null) {
      return res.status(401).json({
        status: 'fail',
        msg: 'El codigo de salida ya ha sido registrado',
      });
    }

    await db.query('CALL VISITOR_DEPARTURE(:_ID, :_GUARDID, :_DEPARTUREDATE)', {
      replacements: {
        _ID: visitor.id,
        _GUARDID: guardID,
        _DEPARTUREDATE: departureDate,
      },
    });

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
  try {
    const { id } = req.params;

    const visitor = await Visitor.findOne({ where: { id } });

    if (!visitor) {
      return res.status(404).json({
        status: 'fail',
        msg: 'La visite no existe',
      });
    }

    await visitor.destroy();

    return res.status(200).json({
      status: 'ok',
      msg: 'Se ha eliminado la visita',
      visitor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      msg: error,
    });
  }
};

// ? FUNCION PARA LOS REPORTES

const reports = async (req, res) => {
  try {
    let { initialDate, endDate } = req.body;

    if (!initialDate || !endDate) {
      return res.status(401).json({
        status: 'fail',
        msg: 'Por favor introduza un rango de fechas valido',
      });
    }

    if (initialDate > endDate) {
      return res.status(401).json({
        status: 'fail',
        msg: 'La fecha inicial no puede ser mayor que la fecha final',
      });
    }

    const { _token } = req.cookies;
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    initialDate = new Date(initialDate);
    endDate = new Date(endDate);
    const colID = decoded.neighborhoodID;

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
    return res.status(500).json({
      status: 'fail',
      msg: error,
    });
  }
};

const visitorRecords = async (req, res) => {
  try {
    let { initialDate, endDate } = req.body;
    const { userID } = req.body;

    if (!initialDate || !endDate) {
      return res.status(401).json({
        status: 'fail',
        msg: 'Por favor introduza un rango de fechas valido',
      });
    }

    if (initialDate > endDate) {
      return res.status(401).json({
        status: 'fail',
        msg: 'La fecha inicial no puede ser mayor que la fecha final',
      });
    }

    initialDate = new Date(initialDate);
    endDate = new Date(endDate);

    const visitorsHistory = await db.query(
      'CALL VISTOR_RECORD(:_USER_ID, :_INITIAL_DATE, :_END_DATE)',
      {
        replacements: {
          _USER_ID: userID,
          _INITIAL_DATE: initialDate,
          _END_DATE: endDate,
        },
      }
    );

    return res.status(200).json({
      status: 'ok',
      msg: 'Generando Reporte',
      visitorsHistory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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
  visitorRecords,
};
