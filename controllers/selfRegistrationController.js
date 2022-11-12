import User from '../models/userModel.js';

const checkToken = async (token) => {
  const user = await User.findOne({
    where: { token },
    attributes: ['id', 'fullName', 'token', 'confirmed'],
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
