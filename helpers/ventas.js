import validator from "validator";
import Inventario from "../models/inventarios.js";

const { isMongoId } = validator;

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
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("Ingrese una fecha válida.");
            }
        }
        return true;
    },
    validarValorUnitario: (vU) => {
        if (vU != undefined) {
            if (isNaN(Number(vU))) {
                throw new Error("El valorUnitario debe ser un valor numerico");
            } else if (vU < 0) {
                throw new Error("El valorUnitario debe ser un numero positivo");
            }
            return true;
        }
        return true;
    },
    validarValorTotal: (vT) => {
        if (vT != undefined) {
            if (isNaN(Number(vT))) {
                throw new Error("El valorTotal debe ser un valor numerico");
            } else if (vT < 0) {
                throw new Error("El valorTotal debe ser un numero positivo");
            }
            return true;
        }
        return true;
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
                }
                return true;
            } catch (error) {
                throw new Error("Error al buscar el inventario en la base de datos: " + error.message);
            }
        }
        return true;
    },
};

export default helpersVentas;
