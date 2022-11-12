import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const db = new Sequelize(
  process.env.BD_NAME,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: process.env.BD_DIALECT,
    define: {
      timestamps: true /* AGREGA CUANDO FUE  CREADO Y CUANDO FUE ACTUALIZADO*/,
    },
    pool: {
      max: 5, // MAXIMAS SOLICITUDES
      min: 0, // DESCONECTA PARA AHORRAR
      acquire: 30000, // TIEMPO ANTES DE MARCAR UN ERROR
      idle: 10000, // SEGUNDOS EN LOS QUE SE PONE IDLE
    },
    operatorAliases: false,
  }
);

export default db;
