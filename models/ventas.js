import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    codigoProducto: { type: String },
    idInvetario: { type: mongoose.Schema.Types.ObjectId, ref: 'Invetario', require: true },
    valorUnitario: { type: Number },
    valorTotal: { type: Number },
});

export default mongoose.model("Venta", ventaSchema);
