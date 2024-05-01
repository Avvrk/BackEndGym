import express from "express";
import dbConexion from "./database/conexionMongoose.js";
import clientes from "./routes/clientes.js";
import ingresos from "./routes/ingresos.js";
import invetarios from "./routes/inventarios.js";
import mantenimientos from "./routes/mantenimientos.js";
import maquinas from "./routes/maquinas.js";
import pagos from "./routes/pagos.js";
import sedes from "./routes/sedes.js";
import usuarios from "./routes/usuarios.js";
import ventas from "./routes/ventas.js";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/clientes", clientes);
app.use("/api/ingresos", ingresos);
app.use("/api/inventarios", invetarios);
app.use("/api/mantenimientos", mantenimientos);
app.use("/api/maquinas", maquinas); 
app.use("/api/pagos", pagos);
app.use("/api/sedes", sedes);
app.use("/api/usuarios", usuarios);
app.use("/api/ventas", ventas); 
 
app.listen(process.env.PORT, async () => {
    await dbConexion();
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
