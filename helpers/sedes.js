const helpersSedes={
    validarCodigo: (c) => {
        if (c != undefined) {
            if (isNaN(Number(c))) {
                throw new Error("El codigo debe ser un numero valido");
            }
			return true;
        }
        return true;
    },
    validarTelefono: (t) => {
        if (t != undefined) {
            if (isNaN(Number(t))) {
                throw new Error("El telefono debe ser un numero valido");
            }
            return true
        }
        return true;
    }
}

export default helpersSedes