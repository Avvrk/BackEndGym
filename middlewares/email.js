import nodemailer from 'nodemailer';

export const enviarCorreoRecuperacion = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gymforzaoficial@gmail.com',
      pass: 'Password2000',
    },
  });

  const mailOptions = {
    from: 'gymforzaoficial@gmail.com', 
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Utiliza el siguiente enlace para restablecer tu contraseña: https://gymmmm.netlify.app/#/reset-password?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};
