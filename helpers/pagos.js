// import Pago from '../models/pagos.js';
import pkg from 'validator';
import Cliente from "../models/clientes.js";

const { isNumeric, isMongoId } = pkg;

function dateValido(dateS) {
    return !isNaN(Date.parse(dateS));
}

const helpersPagos={
    validarCliente: async (c) => {
        if (c != undefined) {
            if (!isMongoId(c)) {
                throw new Error("El id de la maquina debe ser un mongoId valido")
            }
            const buscarCliente = await Cliente.findById(c)
            if (buscarCliente == undefined) {
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
    validarValor: (v) => {
        if (v != undefined) {
            if (!isNumeric(v)) {
                throw new Error("El valor debe ser numerico")
            }
        }
    }
}

export default helpersPagos