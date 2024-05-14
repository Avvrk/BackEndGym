import validator from "validator";
import Inventario from "../models/inventarios.js"

const { isNumeric, isMongoId } = validator;

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha;
}

const helpersVentas = {
	validarFecha: (f) => {
		if (f != undefined) {
			if (!dateValido(f)) {
				throw new Error("La fecha debe ser una fecha valida");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},
	validarValorUnitario: (vU) => {
		if (vU != undefined) {
			if (isNaN(Number(vU))) {
				throw new Error("El valorUnitario debe ser un valor numerico");
			} else if (vU < 0) {
				throw new Error("El valorUnitario debe ser un numero positivo");
			} else {
				return true
			}
		} else {
			return true;
		}
	},
	validarValorTotal: (vT) => {
		if (vT != undefined) {
			if (isNaN(Number(vT))) {
				throw new Error("El valorTotal debe ser un valor numerico");
			} else if (vT < 0) {
				throw new Error("El valorTotal debe ser un numero positivo");
			} else {
				return true
			}
		} else {
			return true;
		}
	},
	validarIdInventario: async (idI) => {
		if (idI != undefined) {
			if (!isMongoId(idI)) {
				throw new Error("El idInventario debe ser un mongoId valido");
			}
			try {
				const buscarInventario = await Inventario.findById(iM);
                if (buscarInventario == undefined) {
                    throw new Error("El inventario no existe");
                } else {
                    return true;
                }
			} catch (error) {
				throw new Error("Error al buscar el inventario en la base de datos: " + error.message);
			}
		} else {
			return true;
		}
	}
};

export default helpersVentas;