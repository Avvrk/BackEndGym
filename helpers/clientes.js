
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
};


export default helpersClientes;
