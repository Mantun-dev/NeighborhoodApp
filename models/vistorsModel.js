import { DataTypes } from 'sequelize';

import db from '../config/db.js';

const Visitor = db.define('visitors', {
  securityCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guestType: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Por favor ingrese el tipo de visita',
      },
    },
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
