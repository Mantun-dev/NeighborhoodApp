import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Guest = db.define('guests', {
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    trim: true,
    validate: {
      notNull: {
        msg: 'Por favor ingrese un nombre',
      },
    },
  },
  dni: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
    unique: {
      arg: true,
      msg: 'El DNI ya existe en nuestros registros.',
    },
    validate: {
      notNull: {
        msg: 'El DNI no puede ir vacio',
      },
    },
  },
  phone: {
    type: DataTypes.INTEGER(8),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El numero de telefono es requerido',
      },
    },
  },
});

export default Guest;
