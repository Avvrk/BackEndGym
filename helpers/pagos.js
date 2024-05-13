import validator from "validator";
import Cliente from "../models/clientes.js";

const { isNumeric, isMongoId } = validator;

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
                }
            } catch (error) {
                throw new Error("Error al buscar el cliente en la base de datos: " + error.message);
            }
        }
    },
    validarFecha: (f) => {
        if (f !== undefined) {
            if (!dateValido(f)) {
                throw new Error("La fecha debe ser una fecha válida");
            }
        }
    },
    validarValor: (v) => {
        if (v !== undefined) {
            if (!isNumeric(v)) {
                throw new Error("El valor debe ser numérico");
            }
        }
    },
};

export default helpersPagos;