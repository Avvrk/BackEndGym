// import Maquina from '../models/maquinas.js';

function dateValido(dateS) {
    return !isNaN(Date.parse(dateS));
}

const helpersMaquinas={
    validarFechaIngreso: (fI) => {
        if (fI != undefined) {
            if (!dateValido(fI)) {
                throw new Error("La fecha debe ser una fecha valida")
            }
        }
    },
    validarUltMan: (fUM) => {
        if (fUM != undefined) {
            if (!dateValido(fUM)) {
                throw new Error("La fecha debe ser una fecha valida")
            }
        }
    }
}

export default helpersMaquinas