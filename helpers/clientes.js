import Plan from "../models/planes.js";

// Función para verificar si una cadena de fecha es válida y está en el formato YYYY-MM-DD
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
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("Ingrese una fecha válida.");
            }
        }
        return true;
    },
    validarDocumento: (d) => {
        if (d !== undefined) {
            if (isNaN(Number(d))) {
                throw new Error("El documento solo puede contener números");
            }
        }
        return true;
    },
    validarEdad: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La edad solo puede contener números");
            }
            if (e < 0) {
                throw new Error("La edad debe ser un numero positivo");
            }
        }
        return true;
    },
    validarTelefono: (t) => {
        if (t !== undefined) {
            if (isNaN(Number(t))) {
                throw new Error("El teléfono solo puede contener números");
            }
        }
        return true;
    },
    validarPeso: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("El peso solo puede contener números");
            }
            if (e < 0) {
                throw new Error("El peso debe ser un numero positivo");
            }
        }
        return true;
    },
    validarImc: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("El imc solo puede contener números");
            }
            if (e < 0) {
                throw new Error("El imc debe ser un numero positivo");
            }
        }
        return true;
    },
    validarBrazo: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("El brazo solo puede contener números");
            }
            if (e < 0) {
                throw new Error("El brazo debe ser un numero positivo");
            }
        }
        return true;
    },
    validarPierna: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La pierna solo puede contener números");
            }
            if (e < 0) {
                throw new Error("La pierna debe ser un numero positivo");
            }
        }
        return true;
    },
    validarCintura: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La cintura solo puede contener números");
            }
            if (e < 0) {
                throw new Error("La cintura debe ser un numero positivo");
            }
        }
        return true;
    },
    validarEstatura: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La estatura solo puede contener números");
            }
            if (e < 0) {
                throw new Error("La estatura debe ser un numero positivo");
            }
        }
        return true;
    },
    validarIdPlan: async (idP) => {
        if (idP !== undefined) {
            try {
                const buscarPlan = await Plan.findById(idP);
                if (!buscarPlan) {
                    throw new Error("El plan del cliente no existe");
                }
                return true;
            } catch (error) {
                throw new Error("Error al buscar el plan en la base de datos: " + error.message);
            }
        }
        return true;
    }
};

export default helpersClientes;
