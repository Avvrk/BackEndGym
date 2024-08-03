import nodemailer from 'nodemailer';

export const enviarCorreoRecuperacion = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gymforzaoficial@gmail.com',
      pass: process.env.FROM_EMAIL_2FA,
    },
  });

  const mailOptions = {
    from: 'gymforzaoficial@gmail.com', 
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Utiliza el siguiente enlace para restablecer tu contraseña: \nhttps://gymmmm.netlify.app/#/reset-password?tokenP=${token}`,
  };

  await transporter.sendMail(mailOptions);
};
