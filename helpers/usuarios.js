import Sede from "../models/sedes.js";
import bcryptjs from "bcryptjs";

const helpersUsuarios = {
    validarTelefono: (t) => {
        if (t != undefined) {
            if (isNaN(Number(t))) {
                throw new Error("El teléfono debe ser un número válido.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    validarIdSede: async (idS) => {
        if (idS != undefined) {
            try {
                const buscarSede = await Sede.findById(idS);
                if (!buscarSede) {
                    throw new Error("La sede del usuario no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la sede en la base de datos: " + error.message);
            }
        } else {
            return true;
        }
    },
    validarContrasenia: (contrasenia, contraseniaEncriptada) => {
        const validarContraseña = bcryptjs.compareSync(contrasenia, contraseniaEncriptada);
        if (!validarContraseña) {
            throw new Error("La contraseña es incorrecta");
        } else {
            return true;
        }
    },
};

export default helpersUsuarios;
