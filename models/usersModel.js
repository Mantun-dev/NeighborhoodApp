import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const User = db.define(
  'users',
  {
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
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      trim: true,
      unique: {
        arg: true,
        msg: 'El correo ya existe en nuestros registros.',
      },
      lowercase: true,
      validate: {
        notNull: {
          msg: 'El correo no puede ir vacio',
        },
        isEmail: {
          msg: 'Por favor introduzca un corre valido',
        },
      },
    },
    securityCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor ingrese una contraseña',
        },
        len: {
          min: 7,
          msg: 'La contraseña debe contener al menos 7 caracteres',
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: {
          msg: 'Por favor ingrese una colonia',
        },
      },
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor ingrese una direccion',
        },
      },
    },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor ingrese un rol',
        },
      },
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    defaultScope: {
      attributes: {
        exclude: [
          'password',
          'dni',
          'fullName',
          'rol',
          'address',
          'securityCode',
          'email',
          'phone',
          'token',
          'confirmed',
          'createdAt',
          'updatedAt',
        ],
      },
    },
  }
);

User.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
