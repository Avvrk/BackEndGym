// import Inventario from "../models/inventarios.js";
import validator from 'validator';

const { isNumeric } = validator;

const helpersInventarios = {
    validarValor: (valor) => {
        if (valor !== undefined) {
            if (!isNumeric(valor)) {
                throw new Error("El valor debe ser numérico.");
            } else if (valor < 0) {
                throw new Error("El valor debe ser positivo.");
            }
        }
    },
    validarCantidad: (cantidad) => {
        if (cantidad !== undefined) {
            if (!isNumeric(cantidad)) {
                throw new Error("La cantidad debe ser numérica.");
            } else if (cantidad < 0) {
                throw new Error("La cantidad debe ser positiva.");
            }
        }
    }
};

export default helpersInventarios;