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

const helpersIngresos = {
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("No es una fecha válida.");
            }
        }
        return true;
    },
};

export default helpersIngresos;
