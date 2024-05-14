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
    }
};

export default helpersInventarios;