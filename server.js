import dotenv from 'dotenv';

import app from './app.js';
import db from './config/db.js';

dotenv.config({ path: '.env' });

const port = process.env.PORT || 8000;

try {
  await db.authenticate();
  db.sync(); // CREA LA TABLA SI NO EXISTE
  console.log('CONEXION CORRECTA');
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});
