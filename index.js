import express from "express";
import dbConexion from "./database/conexionMongoose.js";
import clientes from "./routes/clientes.js";
import ingresos from "./routes/ingresos.js";
import invetarios from "./routes/inventarios.js";
import mantenimientos from "./routes/mantenimientos.js";
import maquinas from "./routes/maquinas.js";
import pagos from "./routes/pagos.js";
import planes from "./routes/planes.js";
import proveedores from "./routes/proveedores.js";
import sedes from "./routes/sedes.js";
import usuarios from "./routes/usuarios.js";
import ventas from "./routes/ventas.js";
import "dotenv/config";
import cors from "cors";


import cron from 'node-cron';
import httpClientes from "./controllers/clientes.js";

import "./controllers/cronClientes.js"

cron.schedule('0 0 * * *', async () => {
    await httpClientes.actualizarEstado();
}, {
    scheduled: true,
    timezone: "America/Bogota"
})

const app = express();

app.use(cors());
app.use(express.json());
app.use("/clientes", clientes);
app.use("/ingresos", ingresos);
app.use("/inventarios", invetarios);
app.use("/mantenimientos", mantenimientos);
app.use("/maquinas", maquinas);
app.use("/pagos", pagos);
app.use("/planes", planes);
app.use("/proveedores", proveedores);
app.use("/sedes", sedes);
app.use("/usuarios", usuarios);
app.use("/ventas", ventas);

app.listen(process.env.PORT, async () => {
    await dbConexion();
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
