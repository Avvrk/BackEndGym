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
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("Ingrese una fecha válida.");
            }
        }
        return true;
    },
    validarIdSede: async (id) => {
        if (id != undefined) {
			try {
				const buscarSede = await Sede.findById(id);
				if (!buscarSede) {
					throw new Error("La sede del usuario no existe");
				}
				return true;
			} catch (error) {
				throw new Error("Error al buscar la sede en la base de datos: " + error.message);
			}
		}
		return true;
    }
}

export default helpersMaquinas
