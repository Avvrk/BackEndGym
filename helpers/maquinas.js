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
            }
        }
    },
    validarUltMan: (fUM) => {
        if (fUM != undefined) {
            if (!dateValido(fUM)) {
                throw new Error("La fecha debe ser una fecha valida")
            }
        }
    }
}

export default helpersMaquinas