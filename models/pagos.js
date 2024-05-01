import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        require: true,
    },
    plan: { type: String },
    fecha: { type: Date },
    valor: { type: Number },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Pago", pagoSchema);
