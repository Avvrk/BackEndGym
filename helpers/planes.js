const helpersPlanes={
    validarValor: (v) => {
        if (v != undefined) {
            if (isNaN(Number(v))) {
				throw new Error("El valor debe ser un numero valido");
			} else if (v < 0) {
				throw new Error("El valor debe ser un numero positivo");
			} else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarDias: (d) => {
        if (d != undefined) {
            if (isNaN(Number(d))) {
                throw new Error("Los dias deben ser un numero valido");
            } else if (d < 0) {
                throw new Error("El valor debe ser un numero positivo");
            } else {
                return true
            }
        } else {
            return true;
        }
    }
}

export default helpersPlanes