import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
    idMaquina: { type: mongoose.Schema.Types.ObjectId, ref: "Maquina", required: true },
    fecha: { type: Date, default: Date.now() },
    descripcion: { type: String },
    responsable: { type: String },
    precio: { type: Number },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Mantenimiento", mantenimientoSchema);
