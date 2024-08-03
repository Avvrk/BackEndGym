import mongoose from "mongoose";

const sedeSchema = new mongoose.Schema({
    nombre: { type: String },
    telefono: { type: Number },
    correo: { type: String },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Proveedore", sedeSchema);