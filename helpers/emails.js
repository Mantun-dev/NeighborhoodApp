import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const forgotPassEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { name, email, token } = data;

  await transport.sendMail({
    from: 'Mantun Vistors App',
    to: email,
    subject: 'Restablecer Contraseña',
    text: 'Sigue las instrucciones para cambiar la contraseña',
    html: `<p> Hola ${name}, </p>

   <p> Has solicitado un cambio de contraseña.</p>

    <p>Por favor haz click en el siguiente enlace para cambiar tu contraseña:

    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/newpassword/${token}">Restablecer Contraseña</a></p>

    <p>Si has recibido este mensaje y no eres parte de Mantun, por favor ignora el correo.</p>

    <p>Saludos,</p>
    <p>Mantun Apps</p>
    
    `,
  });
};

const accountConfirmation = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { name, email, token } = data;

  await transport.sendMail({
    from: 'Mantun Vistors App',
    to: email,
    subject: 'Confirma tu cuenta',
    text: 'Sigue las instrucciones activar tu cuenta.',
    html: `<p> Hola ${name}, </p>

   <p>Bienvenido al sistema de control vecindal de Mantun.</p>

    <p>Por favor haz click en el siguiente enlace para cambiar tu contraseña y activar tu cuenta:

    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/confirmation/${token}">Activar Cuenta</a></p>

    <p>Si has recibido este mensaje y no eres parte de Mantun, por favor ignora el correo.</p>

    <p>Saludos,</p>
    <p>Mantun Apps</p>
    
    `,
  });
};

export { forgotPassEmail, accountConfirmation };
