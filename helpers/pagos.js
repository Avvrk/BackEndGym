import validator from "validator";
import Cliente from "../models/clientes.js";

const { isMongoId } = validator;

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha;
}

const helpersPagos = {
    validarCliente: async (c) => {
        if (c !== undefined) {
            if (!isMongoId(c)) {
                throw new Error("El ID del cliente no es válido");
            }
            try {
                const buscarCliente = await Cliente.findById(c);
                if (!buscarCliente) {
                    throw new Error("El cliente con este ID no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el cliente en la base de datos: " + error.message);
            }
        } else {
            return true;
        }
    },
    validarFecha: (f) => {
        if (f !== undefined) {
            if (!dateValido(f)) {
                throw new Error("La fecha debe ser una fecha válida");
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarValor: (v) => {
        if (v !== undefined) {
            if (isNaN(Number(v))) {
                throw new Error("El valor debe ser numérico");
            } else if (v < 0) {
                throw new Error("El valor debe ser un numero positivo")
            } else {
                return true
            }
        } else {
            return true;
        }
    },
};

export default helpersPagos;
