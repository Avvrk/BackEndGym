import mongoose from 'mongoose';

const maquinaSchema = new mongoose.Schema({
    codigo: { type: String, require: true },
    sede: { type: String },
    descripcion: { type: String },
    fechaIngreso: { type: Date, default: Date.now() },
    fechaUltMan: { type: Date },
    estado: { type: Number, default: 1 }
});

export default mongoose.model('Maquina', maquinaSchema);