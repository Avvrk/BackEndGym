import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nombre: { type: String },
    fechaIngreso: { type: Date, default: Date.now },
    documento: { type: Number, unique: true },
    tipoDocumento: { type: Number},
    fechaNacimiento: { type: Date },
    edad: { type: String },
    direccion: { type: String },
    telefono: { type: Number },
    objetivo: { type: String },
    observaciones: { type: String },
    estado: { type: Number, default: 1 },
    plan: { type: String },
    idPlan: { type: mongoose.Schema.Types.ObjectId, ref: "plane", required: true  },
    fechaVencimiento: { type: Date },
    foto: { type: String },
    seguimiento: [
        {
            fecha: { type: Date },
            peso: { type: Number },
            imc: { type: Number },
            brazo: { type: Number },
            pierna: { type: Number },
            cintura: { type: Number },
            estatura: { type: Number },
        },
    ],
});

export default mongoose.model("Cliente", clienteSchema);
