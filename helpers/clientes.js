// import Cliente from '../models/clientes.js';
import pkg from 'validator';

const { isNumeric } = pkg;

function dateValido(dateS) {
    return !isNaN(Date.parse(dateS));
}

const helpersClientes = {
    validarFechaIngreso: (fI) => {
        if (fI != undefined) {
            if (!dateValido(fI)) {
                throw new Error("fechaIngreso no es una fecha valida");
            }
        }
    },
    validarDocumento: (d) => {
        if (d != undefined) {
            if (!isNumeric(d)) {
                throw new Error("El documento solo puede ser numeros");
            }
        }
    },
    validarFechaNacimiento: (fN) => {
        if (fN != undefined) {
            if (!dateValido(fI)) {
                throw new Error("fechaNacimiento no es una fecha valida");
            }
        }
    },
    validarEdad: (e) => {
        if (e != undefined) {
            if (!isNumeric(e)) {
                throw new Error("La edad solo puede ser numeros");
            }
        }
    },
    validarTelefono: (t) => {
        if (t != undefined) {
            if (!isNumeric(t)) {
                throw new Error("El telefono solo puede ser numeros");
            }
        }
    },
};

export default helpersClientes;
