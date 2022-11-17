import User from '../models/usersModel.js';
import Colonias from '../models/neighborhoodsModel.js';

// * Un administrador puede agregar muchos usuarios

User.hasMany(User, { foreignKey: 'adminID' });

// * Una colonia pertenece a un administrador

Colonias.belongsTo(User, { foreignKey: 'adminID' });

// * Una colonia tiene muchos usuarios/guardias

Colonias.hasMany(User, { foreignKey: 'colID' });

export { User, Colonias };
