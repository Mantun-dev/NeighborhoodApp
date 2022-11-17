import jwt from 'jsonwebtoken';

const signToken = (datos) =>
  jwt.sign(
    {
      id: datos.id,
      name: datos.name,
      neighborhood: datos.neighborhood,
      neighborhoodID: datos.neighborhoodID,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

export { signToken };
