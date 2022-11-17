import { User } from '../models/relationsModel.js';

const checkToken = async (token) => {
  const user = await User.findOne({
    where: { token },
    attributes: ['id', 'fullName', 'token', 'confirmed', 'password'],
  });

  return user;
};

const checkPassToken = async (token) => {
  const user = await User.findOne({
    where: { token },
    attributes: ['id', 'token', 'password'],
  });

  return user;
};

export { checkToken, checkPassToken };
