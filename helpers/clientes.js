import Plan from "../models/planes";

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
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarFechaIngreso: (fI) => {
        if (fI !== undefined) {
            if (!dateValido(fI)) {
                throw new Error("fechaIngreso no es una fecha válida");
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarDocumento: (d) => {
        if (d !== undefined) {
            if (isNaN(Number(d))) {
                throw new Error("El documento solo puede contener números");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarFechaNacimiento: (fN) => {
        if (fN !== undefined) {
            if (!dateValido(fN)) {
                throw new Error("fechaNacimiento no es una fecha válida");
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarEdad: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La edad solo puede contener números");
            } else if (e < 0) {
                throw new Error("La edad debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarTelefono: (t) => {
        if (t !== undefined) {
            if (isNaN(Number(t))) {
                throw new Error("El teléfono solo puede contener números");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarPeso: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("El peso solo puede contener números");
            } else if (e < 0) {
                throw new Error("El peso debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarImc: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("El imc solo puede contener números");
            } else if (e < 0) {
                throw new Error("El imc debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarBrazo: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("El brazo solo puede contener números");
            } else if (e < 0) {
                throw new Error("El brazo debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarPierna: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La pierna solo puede contener números");
            } else if (e < 0) {
                throw new Error("La pierna debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarCintura: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La cintura solo puede contener números");
            } else if (e < 0) {
                throw new Error("La cintura debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarEstatura: (e) => {
        if (e !== undefined) {
            if (isNaN(Number(e))) {
                throw new Error("La estatura solo puede contener números");
            } else if (e < 0) {
                throw new Error("La estatura debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    },
    validarIdPlan: async (idP) => {
        if (idP !== undefined) {
            try {
				const buscarPlan = await Plan.findById(idP);
				if (!buscarPlan) {
					throw new Error("El plan del cliente no existe");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error("Error al buscar el plan en la base de datos: " + error.message);
			}
        } else {
            return true;
        }
    }
};

export default helpersClientes;