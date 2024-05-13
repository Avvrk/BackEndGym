import validator from 'validator';

const { isNumeric } = validator;

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split('T')[0];
    return dateString === formatoFecha;
}

const helpersClientes = {
    validarFecha: (f) => {
        if (f !== undefined) {
            if (!dateValido(f)) {
                throw new Error("fecha de seguimiento no es una fecha válida");
            }
        }
    },
    validarFechaIngreso: (fI) => {
        if (fI !== undefined) {
            if (!dateValido(fI)) {
                throw new Error("fechaIngreso no es una fecha válida");
            }
        }
    },
    validarDocumento: (d) => {
        if (d !== undefined) {
            if (!isNumeric(d)) {
                throw new Error("El documento solo puede contener números");
            }
        }
    },
    validarFechaNacimiento: (fN) => {
        if (fN !== undefined) {
            if (!dateValido(fN)) {
                throw new Error("fechaNacimiento no es una fecha válida");
            }
        }
    },
    validarEdad: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("La edad solo puede contener números");
            } else if (e < 0) {
                throw new Error("La edad debe ser un numero positivo");
            }
        }
    },
    validarTelefono: (t) => {
        if (t !== undefined) {
            if (!isNumeric(t)) {
                throw new Error("El teléfono solo puede contener números");
            }
        }
    },
    validarPeso: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("El peso solo puede contener números");
            } else if (e < 0) {
                throw new Error("El peso debe ser un numero positivo");
            }
        }
    },
    validarImc: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("El imc solo puede contener números");
            } else if (e < 0) {
                throw new Error("El imc debe ser un numero positivo");
            }
        }
    },
    validarBrazo: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("El brazo solo puede contener números");
            } else if (e < 0) {
                throw new Error("El brazo debe ser un numero positivo");
            }
        }
    },
    validarPierna: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("La pierna solo puede contener números");
            } else if (e < 0) {
                throw new Error("La pierna debe ser un numero positivo");
            }
        }
    },
    validarCintura: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("La cintura solo puede contener números");
            } else if (e < 0) {
                throw new Error("La cintura debe ser un numero positivo");
            }
        }
    },
    validarEstatura: (e) => {
        if (e !== undefined) {
            if (!isNumeric(e)) {
                throw new Error("La estatura solo puede contener números");
            } else if (e < 0) {
                throw new Error("La estatura debe ser un numero positivo");
            }
        }
    }
};

export default helpersClientes;