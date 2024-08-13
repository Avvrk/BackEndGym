import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    codigo: { type: String, require: true, unique: true },
    descripcion: { type: String },
    valor: { type: Number },
    cantidad: { type: Number },
    _idProveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedore" },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Inventario", inventarioSchema);
