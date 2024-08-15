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
            subject: "Recuperación de Contraseña 🗝️",
           html: `
              <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #007bff;">Recuperación de Contraseña 🪪</h2>
            <p>Hola 👋,</p>
            <p>Hemos recibido 🔔 una solicitud para restablecer la contraseña 🔐 de tu cuenta. Si no has solicitado este cambio, por favor ignora 📧 este correo.</p>
            <p>Para restablecer tu contraseña, haz clic 😊 en el siguiente enlace:</p>
            <p>
              <a href="https://gymmmm.netlify.app/#/reset-password?tokenP=${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
            </p>
            <p>Si el enlace no funciona 😢, copia y pega la siguiente URL en tu navegador 🔎 :</p>
            <p><a href="https://gymmmm.netlify.app/#/reset-password?tokenP=${token}">https://gymmmm.netlify.app/#/reset-password?tokenP=${token}</a></p>
            <p>Saludos,</p>
            <p>El equipo de Forza Gym 💪</p>
          </div>
        `,
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
            subject: "¡Tu Membresía Está a Punto de Expirar!⏳",
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #007bff;">Recordatorio ⏰ , ¡Tu Membresía Está por Expirar pronto! 🚨</h2>
            <p>Hola <strong>${nombre}</strong> 👋,</p>
            <p>Queremos recordarte que tu membresía en Forza Gym 🏋️‍♂️ expira el <strong>${fechaV}</strong> 📅.</p>
            <p>Para evitar interrupciones en tu acceso al gimnasio 🚶‍♂️‍➡️ y seguir disfrutando de nuestras instalaciones y servicios 💪, te invitamos a renovarla cuanto antes. 🪪 </p>
            <p>Si tienes alguna pregunta o necesitas ayuda 🫡 , no dudes en contactarnos 📞. Estamos aquí para asistirte. 😊 </p>
            <p>¡Gracias por ser parte de esta maravillosa familia! 🏆</p>
            <p>Saludos,</p>
            <p>El equipo de Forza Gym 💪</p>
            </div>
            `,

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message);
    }
};

export { enviarCorreoRecuperacion, enviarCorreoAviso };
