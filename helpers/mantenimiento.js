import validator from "validator";
import Maquina from "../models/maquinas.js";

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

const helpersMantenimiento = {
    validarIdMaquina: async (iM) => {
        if (iM != undefined) {
            if (!isMongoId(iM)) {
                throw new Error("El ID de la máquina no es válido");
            }
            try {
                const buscarMaquina = await Maquina.findById(iM);
                if (buscarMaquina == undefined) {
                    throw new Error("La maquina no existe");
                }
            } catch (error) {
                throw new Error("Error al buscar la máquina en la base de datos: " + error.message);
            }
        }
    },
    validarFecha: (f) => {
        if (f != undefined) {
            if (!dateValido(f)) {
                throw new Error("La fecha debe ser una fecha valida");
            }
        }
    },
    validarPrecio: (p) => {
        if (p != undefined) {
            if (!isNumeric(p)) {
                throw new Error("El precio debe ser numerico");
            }
            if (p < 0) {
                throw new Error("El precio debe ser un numero positivo");
            }
        }
    },
};

export default helpersMantenimiento;