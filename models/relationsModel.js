import User from '../models/usersModel.js';
import Colonias from '../models/neighborhoodsModel.js';
import Guest from '../models/guestsModel.js';
import Visitor from '../models/vistorsModel.js';

// * Un administrador puede agregar muchos usuarios

User.hasMany(User, { foreignKey: 'adminID' });

// * Una colonia pertenece a un administrador

Colonias.belongsTo(User, { foreignKey: 'adminID' });

// * Una colonia tiene muchos usuarios/guardias

Colonias.hasMany(User, { foreignKey: 'colID' });

// * Una colonia tiene muchos visitantes

Colonias.hasMany(Visitor, { foreignKey: 'colID' });

// * GUEST
Guest.hasMany(Visitor, { foreignKey: 'guestID' });

// * VISITOR

User.hasMany(Visitor, { foreignKey: 'userID' });

// * GUARD

User.hasMany(Visitor, { foreignKey: 'guardID' });

export { User, Colonias, Guest, Visitor };
