import mongoose from 'mongoose';

const maquinaSchema = new mongoose.Schema({
    codigo: { type: String, require: true },
    sede: { type: String },
    idSede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', require: true },
    descripcion: { type: String },
    fechaIngreso: { type: Date, default: Date.now() },
    fechaUltMan: { type: Date },
    estado: { type: Number, default: 1 }
});

export default mongoose.model('Maquina', maquinaSchema);