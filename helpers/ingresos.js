// import Ingreso from '../models/ingresos.js';

function dateValido(dateS) {
    return !isNaN(Date.parse(dateS));
}

const helpersIngresos = {
    validarFecha: (f) => {
        if (f != undefined) {
            if (!dateValido(f)) {
                throw new Error("La fecha no es una fecha valida");
            }
        }
    },
};

export default helpersIngresos;
