import jwt from 'jsonwebtoken';

const signToken = (datos) =>
  jwt.sign({ id: datos.id, name: datos.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export { signToken };