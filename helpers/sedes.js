import Sede from "../models/sedes.js"

const helpersSedes={
    validarTelefono: (t) => {
        if (t != undefined) {
            if (isNaN(Number(t))) {
                throw new Error("El telefono debe ser un numero valido");
            }
            return true
        }
        return true;
    },
    validarCodigoRepetido: async (codigo, id = null) => {
        console.log(id);
        try {
            const query = { codigo: codigo.toString() };

            // Si se proporciona un ID, exclúyelo de la búsqueda
            if (id && mongoose.Types.ObjectId.isValid(id)) {
                query._id = { $ne: new mongoose.Types.ObjectId(id) }; // Usa `new` para crear una nueva instancia de ObjectId
            }
            
            const buscarCodigo = await Sede.findOne(query).lean();
            console.log(buscarCodigo);
            if (buscarCodigo) {
                throw new Error("El código está repetido");
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },
}

export default helpersSedes