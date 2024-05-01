import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    codigo: { type: String, require: true },
    descripcion: { type: String },
    valor: { type: Number },
    dias: { type: Number },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Plane", planSchema);
