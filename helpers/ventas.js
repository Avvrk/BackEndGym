// import Venta from '../models/ventas.js';
import pkg from "validator";

const { isNumeric, isMongoId } = pkg;

function dateValido(dateS) {
    return !isNaN(Date.parse(dateS));
}

const helpersVentas = {
    validarFecha: (f) => {
        if (f != undefined) {
            if (!dateValido(f)) {
                throw new Error("La fecha debe ser una fecha valida");
            }
        }
    },
    validarValorUnitario: (vU) => {
        if (vU != undefined) {
            if (!isNumeric(vU)) {
                throw new Error("El valorUnitario debe ser un valor numerico");
            }
        }
    },
    validarValorTotal: (vT) => {
        if (vT != undefined) {
            if (!isNumeric(vT)) {
                throw new Error("El valorTotal debe ser un valor numerico");
            }
        }
    },
};

export default helpersVentas;
