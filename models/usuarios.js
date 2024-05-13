import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    sede: { type: String, require: true },
    idSede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', require: true },
    nombre: { type: String },
    email: { type: String },
    telefono: { type: Number },
    password: { type: String },
    rol: { type: String },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Usuario", usuarioSchema);
