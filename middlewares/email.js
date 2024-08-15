import nodemailer from "nodemailer";

const enviarCorreoRecuperacion = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "gymforzaoficial@gmail.com",
            pass: process.env.FROM_EMAIL_2FA,
        },
    });

    const mailOptions = {
        from: "gymforzaoficial@gmail.com",
        to: email,
        subject: "Recuperación de contraseña",
        text: `Utiliza el siguiente enlace para restablecer tu contraseña: \nhttps://gymmmm.netlify.app/#/reset-password?tokenP=${token}`,
    };

    await transporter.sendMail(mailOptions);
};

const enviarCorreoAviso = async (email, nombre, fechaV) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "gymforzaoficial@gmail.com",
            pass: process.env.FROM_EMAIL_2FA,
        },
    });

    const mailOptions = {
        from: "gymforzaoficial@gmail.com",
        to: email,
        subject: "¡Tu plan de gimnasio está por vencer! Renueva ahora",
        text: 
        `Hola ${nombre},

        Tu plan de membresía vence el ${fechaV}. Para no interrumpir tu rutina, te invitamos a renovarlo pronto.

        Beneficios de renovar ahora:

        Acceso continuo a nuestras instalaciones.
        Promociones exclusivas para renovaciones anticipadas.

        ¡Gracias por entrenar con nosotros!

        Saludos,
        ForzaGym`,
    };

    await transporter.sendMail(mailOptions);
};

export { enviarCorreoRecuperacion, enviarCorreoAviso }