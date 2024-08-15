import nodemailer from "nodemailer";

const enviarCorreoRecuperacion = async (email, token) => {
    try {
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
    } catch (error) {
        console.log(error.message);
    }
};

const enviarCorreoAviso = async (email, nombre, fechaV) => {
    try {
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
            text: `Hola ${nombre},

Tu plan de membresía vence el ${fechaV}. Para no interrumpir tu rutina, te invitamos a renovarlo pronto.

¡Gracias por entrenar con nosotros!

Saludos,
ForzaGym`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message);
    }
};

export { enviarCorreoRecuperacion, enviarCorreoAviso };
