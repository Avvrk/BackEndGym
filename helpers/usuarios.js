// import Usuario from '../models/usuarios.js';
import pkg from 'validator';

const { isNumeric } = pkg;

const helpersUsuarios={
    validarTelefono: (t) => {
        if (t != undefined) {
            if (!isNumeric(t)) {
                throw new Error("El telefono debe ser un numero valido");
            }
        }
    }
}

export default helpersUsuarios