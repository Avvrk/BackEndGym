// import Sede from '../models/sedes.js';
import pkg from 'validator';

const { isNumeric } = pkg;

const helpersSedes={
    validarCodigo: (c) => {
        if (c != undefined) {
            if (!isNumeric(c)) {
                throw new Error("El codigo debe ser un numero valido");
            }
        }
    },
    validarTelefono: (t) => {
        if (t != undefined) {
            if (!isNumeric(t)) {
                throw new Error("El telefono debe ser un numero valido");
            }
        }
    }
}

export default helpersSedes