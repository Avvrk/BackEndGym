import mongoose from "mongoose";

const sedeSchema = new mongoose.Schema({
    nombre: { type: String },
    direccion: { type: String },
    codigo: { type: Number, require: true },
    horario: { type: String },
    ciudad: { type: String },
    telefono: { type: Number },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Sede", sedeSchema);
