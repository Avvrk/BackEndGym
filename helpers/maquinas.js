import Sede from "../models/sedes.js";

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha;
}

const helpersMaquinas={
    validarFechaIngreso: (fI) => {
        if (fI != undefined) {
            if (!dateValido(fI)) {
                throw new Error("La fecha debe ser una fecha valida")
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarUltMan: (fUM) => {
        if (fUM != undefined) {
            if (!dateValido(fUM)) {
                throw new Error("La fecha debe ser una fecha valida")
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarIdSede: async (id) => {
        if (id != undefined) {
			try {
				const buscarSede = await Sede.findById(idS);
				if (!buscarSede) {
					throw new Error("La sede del usuario no existe");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error("Error al buscar la sede en la base de datos: " + error.message);
			}
		} else {
			return true;
		}
    }
}

export default helpersMaquinas