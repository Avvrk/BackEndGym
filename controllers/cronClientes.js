import cron from 'node-cron';
import Cliente from '../models/clientes.js';
import { enviarCorreoAviso } from '../middlewares/email.js';

cron.schedule('0 0 * * *', async () => {
    try {
        const clientes = await Cliente.find();
        clientes.forEach(c => {
            const fechaF = c.fechaVencimiento;
            let fechaD = new Date(fechaF)
            fechaD.setHours(0, 0, 0, 0);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            const diferenciaDias = (fechaD - hoy) / (1000 * 60 * 60 * 24); // Diferencia en días

            if (diferenciaDias <= 5) {
                enviarCorreoAviso(c.correo, c.nombre, fechaD.toISOString().split("T")[0])
            }
        })
    } catch (error) {
        console.error(error.message);
    }
})

export default cron;