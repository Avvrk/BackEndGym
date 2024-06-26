import Inventario from "../models/inventarios.js";

const helpersInventarios = {
    validarValor: (valor) => {
        if (valor !== undefined) {
            if (isNaN(Number(valor))) {
                throw new Error("El valor debe ser numérico.");
            } else if (valor < 0) {
                throw new Error("El valor debe ser positivo.");
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarCantidad: (cantidad) => {
        if (cantidad !== undefined) {
            if (isNaN(Number(cantidad))) {
                throw new Error("La cantidad debe ser numérica.");
            } else if (cantidad < 0) {
                throw new Error("La cantidad debe ser positiva.");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarIdInventario: async (idI) => {
        if (idI !== undefined) {
            try {
				const buscarProducto = await Inventario.findById(idI);
				if (!buscarProducto) {
					throw new Error("El producto no existe");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error("Error al buscar el producto en la base de datos: " + error.message);
			}
        } else {
            return true;
        }
    },
    validarCodigoRepetido: async (codigo, id = null) => {
        try {
            const query = { codigo };
    
            // Si se proporciona un ID, exclúyelo de la búsqueda
            if (id) {
                query._id = { $ne: id };
            }
            const buscarCodigo = await Inventario.findOne(query);
            console.log(buscarCodigo);
            if (buscarCodigo) {
                throw new Error("El código está repetido");
            }
    
            return true;
        } catch (error) {
            throw new Error("Error al buscar el código en la base de datos: " + error.message);
        }
    }
};

export default helpersInventarios;