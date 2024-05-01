// import Mantenimiento from '../models/mantenimiento.js';
import pkg from 'validator';
import Maquina from "../models/maquinas.js";

const { isNumeric, isMongoId } = pkg;

function dateValido(dateS) {
    return !isNaN(Date.parse(dateS));
}

const helpersMantenimiento = {
    validarIdMaquina: async (iM) => {
        if (iM != undefined) {
            if (!isMongoId(iM)) {
                throw new Error("El id de la maquina debe ser un mongoId valido")
            }
            const buscarMaquina = await Maquina.findById(iM)
            if (buscarMaquina == undefined) {
                throw new Error("La maquina no existe");
            }
        }
    },
    validarFecha: (f) => {
        if (f != undefined) {
            if (!dateValido(f)) {
                throw new Error("La fecha debe ser una fecha valida")
            }
        }
    },
    validarPrecio: (p) => {
        if (p != undefined) {
            if (!isNumeric(p)) {
                throw new Error("El precio debe ser numerico")
            }
        }
    },
};

export default helpersMantenimiento;
