// import Inventario from "../models/inventarios.js";
import pkg from 'validator';

const { isNumeric } = pkg;

const helpersInventarios = {
    validarValor: (v) => {
        if (v != undefined) {
            if (!isNumeric(v)) {
                throw new Error("El valor solo puede ser numeros");
            }
        }
    },
    validarCantidad: (c) => {
        if (c != undefined) {
            if (!isNumeric(c)) {
                throw new Error("La cantidad solo puede ser numeros");
            }
        }
    }
};

export default helpersInventarios;
