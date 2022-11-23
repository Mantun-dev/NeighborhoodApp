import { DataTypes } from 'sequelize';

import db from '../config/db.js';

const Visitor = db.define('visitors', {
  securityCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  arrivalDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Ingrese una fecha de llegada',
      },
    },
  },
  departureDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default Visitor;
