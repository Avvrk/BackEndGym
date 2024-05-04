// import Usuario from '../models/usuarios.js';
import Sede from '../models/sedes.js';
import pkg from 'validator';

const { isNumeric } = pkg;

const helpersUsuarios={
    validarTelefono: (t) => {
        if (t != undefined) {
            if (!isNumeric(t)) {
                throw new Error("El telefono debe ser un numero valido");
            }
        }
    },
    validarIdSede: async (idS) => {
        const buscarSede = await Sede.findById(idS);
        if (!buscarSede){
            throw new Error ("La sede del usuario no existe")
        }
    }
}

export default helpersUsuarios