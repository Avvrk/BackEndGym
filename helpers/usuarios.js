import validator from "validator";
import Sede from "../models/sedes.js";

const { isNumeric } = validator;

const helpersUsuarios = {
	validarTelefono: (t) => {
		if (t != undefined) {
			if (!isNumeric(t)) {
				throw new Error("El telefono debe ser un numero valido");
			}
		}
	},
	validarIdSede: async (idS) => {
		if (idS != undefined) {
			if (!isMongoId(idS)) {
                throw new Error("El ID de la sede no es válido");
            }
			try {
				const buscarSede = await Sede.findById(idS);
				if (!buscarSede) {
					throw new Error("La sede del usuario no existe");
				}
			} catch (error) {
				throw new Error("Error al buscar la sede en la base de datos: " + error.message);
			}
		}
	},
};

export default helpersUsuarios;
