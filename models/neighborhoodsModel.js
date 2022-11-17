import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Colonias = db.define('colonias', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El nombre de la colonia no puede ir vacio',
      },
    },
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El municipio no puede ir vacio',
      },
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El departamento no puede ir vacio',
      },
    },
  },
});

export default Colonias;
