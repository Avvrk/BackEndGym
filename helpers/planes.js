import validator from 'validator';

const { isNumeric } = validator;

const helpersPlanes={
    validarValor: (v) => {
        if (v != undefined) {
            if (!isNumeric(v)) {
                throw new Error("El valor debe ser un numero valido");
            } else if (v < 0) {
                throw new Error("El valor debe ser un numero positivo");
            }
        }
    },
    validarDias: (d) => {
        if (d != undefined) {
            if (!isNumeric(d)) {
                throw new Error("Los dias deben ser un numero valido");
            } else if (d < 0) {
                throw new Error("El valor debe ser un numero positivo");
            }
        }
    }
}

export default helpersPlanes