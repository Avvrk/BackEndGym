import { generarJWT, validarJWT } from "../middlewares/validar-jwt.js";
import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";

const httpUsuarios = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            res.json({ usuarios });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    getUsuariosActivos: async (req, res) => {
        try {
            const usuarios = await Usuario.find({ estado: 1 });
            res.json({ usuarios });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    getUsuariosInactivos: async (req, res) => {
        try {
            const usuarios = await Usuario.find({ estado: 0 });
            res.json({ usuarios });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    getUsuariosLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Usuario.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    msg: "Usuario / Password no son correctos.",
                });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    msg: "Usuario / Password no son correctos",
                });
            }

            const token = await generarJWT(user._id);
            res.json({
                usuario: user,
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Hable con su WebMaster.",
            });
        }
    },
    postUsuariosLog: async (req, res) => {
        try {
            const { sede, idSede, nombre, email, telefono, password, rol, estado } = req.body;
            const usuario = new Usuario({
                sede,
                idSede,
                nombre,
                email,
                telefono,
                password,
                rol,
                estado,
            });
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(password, salt);
            await usuario.save();
            res.json({ usuario });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    putUsuarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { sede, nombre, email, telefono, password, rol } = req.body;
            let activarCampos = {};
            if (sede !== undefined) activarCampos.sede = sede;
            if (nombre !== undefined) activarCampos.nombre = nombre;
            if (email !== undefined) activarCampos.email = email;
            if (telefono !== undefined) activarCampos.telefono = telefono;
            if (password !== undefined) activarCampos.password = password;
            if (rol !== undefined) activarCampos.rol = rol;
            const usuario = await Usuario.findByIdAndUpdate(id, activarCampos, { new: true });
            res.json({ usuario });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    putUsuariosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ usuario });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    putUsuariosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ usuario });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
};

export default httpUsuarios;