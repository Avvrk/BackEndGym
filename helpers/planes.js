import Plan from "../models/planes.js"

const helpersPlanes={
    validarValor: (v) => {
        if (v != undefined) {
            if (isNaN(Number(v))) {
				throw new Error("El valor debe ser un numero valido");
			} else if (v < 0) {
				throw new Error("El valor debe ser un numero positivo");
			}
			return true;
        }
        return true;
    },
    validarDias: (d) => {
        if (d != undefined) {
            if (isNaN(Number(d))) {
                throw new Error("Los dias deben ser un numero valido");
            } else if (d < 0) {
                throw new Error("El valor debe ser un numero positivo");
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
            
            const buscarCodigo = await Plan.findOne(query).lean();
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

export default helpersPlanes