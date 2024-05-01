import mongoose from "mongoose";

const ingresoSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    sede: { type: String },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", require: true, },
});

export default mongoose.model("Ingreso", ingresoSchema);
