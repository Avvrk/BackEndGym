import mongoose from 'mongoose'
import Inventario from "../models/inventarios.js";
import Proveedor from "../models/proveedor.js";

const helpersInventarios = {
    validarValor: (valor) => {
        if (valor !== undefined) {
            if (isNaN(Number(valor))) {
                throw new Error("El valor debe ser numérico.");
            } else if (valor < 0) {
                throw new Error("El valor debe ser positivo.");
            }
			return true;
        }
        return true;
    },
    validarCantidad: (cantidad) => {
        if (cantidad !== undefined) {
            if (isNaN(Number(cantidad))) {
                throw new Error("La cantidad debe ser numérica.");
            } else if (cantidad < 0) {
                throw new Error("La cantidad debe ser positiva.");
            }
            return true
        }
        return true;
    },
    validarIdInventario: async (idI) => {
        if (idI !== undefined) {
            try {
				const buscarProducto = await Inventario.findById(idI);
				if (!buscarProducto) {
					throw new Error("El producto no existe");
				}
				return true;
			} catch (error) {
				throw new Error("Error al buscar el producto en la base de datos: " + error.message);
			}
        }
        return true;
    },
    validarIdProveedor: async (idP) => {
        if (idP !== undefined) {
            try {
				const buscarProducto = await Proveedor.findById(idP);
				if (!buscarProducto) {
					throw new Error("El proveedor no existe");
				}
				return true;
			} catch (error) {
				throw new Error("Error al buscar el proveedor en la base de datos: " + error.message);
			}
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
            
            const buscarCodigo = await Inventario.findOne(query).lean();
            console.log(buscarCodigo);
            if (buscarCodigo) {
                throw new Error("El código está repetido");
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default helpersInventarios;