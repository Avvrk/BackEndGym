import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    codigo: { type: String, require: true },
    descripcion: { type: String },
    valor: { type: Number },
    cantidad: { type: Number },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Inventario", inventarioSchema);
