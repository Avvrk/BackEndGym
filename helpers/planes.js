// import Plan from '../models/planes.js';
import pkg from 'validator';

const { isNumeric } = pkg;

const helpersPlanes={
    validarValor: (v) => {
        if (v != undefined) {
            if (!isNumeric(v)) {
                throw new Error("El valor debe ser un numero valido");
            }
        }
    },
    validarDias: (d) => {
        if (d != undefined) {
            if (!isNumeric(d)) {
                throw new Error("Los dias deben ser un numero valido");
            }
        }
    }
}

export default helpersPlanes