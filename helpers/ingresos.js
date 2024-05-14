function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split('T')[0];
    return dateString === formatoFecha;
}

const helpersIngresos = {
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("La fecha no tiene el formato esperado (YYYY-MM-DD).");
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
};

export default helpersIngresos;