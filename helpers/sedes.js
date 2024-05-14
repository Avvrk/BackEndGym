import validator from 'validator';

const { isNumeric } = validator;

const helpersSedes={
    validarCodigo: (c) => {
        if (c != undefined) {
            if (isNaN(Number(c))) {
                throw new Error("El codigo debe ser un numero valido");
            } else {
				return true;
			}
        } else {
            return true;
        }
    },
    validarTelefono: (t) => {
        if (t != undefined) {
            if (isNaN(Number(t))) {
                throw new Error("El telefono debe ser un numero valido");
            } else {
                return true
            }
        } else {
            return true;
        }
    }
}

export default helpersSedes