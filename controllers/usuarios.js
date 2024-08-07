import { generarJWTPassword, generarJWT, validarJWTPassword } from "../middlewares/validar-jwt.js";
import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { enviarCorreoRecuperacion } from "../middlewares/email.js";
import jwt from 'jsonwebtoken';

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
                err: error
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
            const { ...info } = req.body;
            const usuario = await Usuario.findByIdAndUpdate(id, info, { new: true });
            res.json({ usuario });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    putUsuariosContrasenia: async (req, res) => {
        try {
            const { token } = req.params;
            const { nuevaContrasenia } = req.body;
            const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

            const salt = bcryptjs.genSaltSync();
            const encriptada = bcryptjs.hashSync(nuevaContrasenia, salt);
            const usuario = await Usuario.findByIdAndUpdate(uid, { password: encriptada }, { new: true });
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
    recuperarPassword: async (req, res) => {
        const { email } = req.body;
        try {
          const user = await Usuario.findOne({ email });
          if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
          }

          const token = await generarJWTPassword(user._id);
          await enviarCorreoRecuperacion(email, token);

          res.json({ msg: 'Correo de recuperación enviado' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'Error de servidor' });
        }
    },
    avisoToken: async (req, res) => {
        try {
            const usuario = req.usuariodbtoken;

            res.json({
                msg: "Operacion realizada con exito",
                usuario: usuario
            })
        } catch (error) {
            res.json({ msg: 'Error de servidor' })
        }
    },
};

export default httpUsuarios;
