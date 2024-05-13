import validator from "validator";

const { isNumeric } = validator;

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
			}
		}
	},
	validarValorUnitario: (vU) => {
		if (vU != undefined) {
			if (!isNumeric(vU)) {
				throw new Error("El valorUnitario debe ser un valor numerico");
			} else if (vU < 0) {
				throw new Error("El valorUnitario debe ser un numero positivo");
			}
		}
	},
	validarValorTotal: (vT) => {
		if (vT != undefined) {
			if (!isNumeric(vT)) {
				throw new Error("El valorTotal debe ser un valor numerico");
			} else if (vT < 0) {
				throw new Error("El valorTotal debe ser un numero positivo");
			}
		}
	},
};

export default helpersVentas;