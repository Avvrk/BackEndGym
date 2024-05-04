import { generarJWT, validarJWT } from "../middlewares/validar-jwt.js";
import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs";

const httpUsuarios = {
	getUsuarios: async (req, res) => {
		const usuarios = await Usuario.find();
		res.json({ usuarios });
	},
	getUsuariosActivos: async (req, res) => {
		const usuariosAc = await Usuario.find({ estado: 1 });
		res.json({ usuariosAc });
	},
	getUsuariosInactivos: async (req, res) => {
		const usuariosIn = await Usuario.find({ estado: 0 });
		res.json({ usuariosIn });
	},
	getUsuariosLogin: async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await Usuario.findOne({ email });
			if (!user) {
				return res.status(401).json({
					msg: "Usuario / Password no son correctoshhh.",
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
			console.log(error)
			return res.status(500).json({
				msg: "Hable con su WebMaster.",
			});
		}
	},
	postUsuariosLog: async (req, res) => {
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
		res.json({
			usuario
		});
	},
    putUsuarios: async (req, res) => {
        const { id } = req.params;
        const { sede, nombre, email, telefono, password, rol } = req.body;
		if ( sede != undefined ) {
			const usuarioS = await Usuario.findByIdAndUpdate(
				id,
				{ sede },
				{ new: true }
			);
			res.json({ usuarioS })
		} else if ( nombre != undefined ) {
			const usuarioN = await Usuario.findByIdAndUpdate(
				id,
				{ nombre },
				{ new: true }
			);
			res.json({ usuarioN });
		} else if ( email != undefined ) {
			const usuarioE = await Usuario.findByIdAndUpdate(
				id,
				{ email },
				{ new: true }
			);
			res.json({ usuarioE });
		} else if ( telefono != undefined ) {
			const usuarioT = await Usuario.findByIdAndUpdate(
				id,
				{ telefono },
				{ new: true }
			);
			res.json({ usuarioT });
		} else if ( password != undefined ) {
			const usuarioP = await Usuario.findByIdAndUpdate(
				id,
				{ password },
				{ new: true }
			);
			res.json({ usuarioP });
		} else if ( rol != undefined ) {
			const usuarioR = await Usuario.findByIdAndUpdate(
				id,
				{ rol },
				{ new: true }
			);
			res.json({ usuarioR });
		}
    },
	putUsuariosActivar: async (req, res) => {
		const { id } = req.params;
		const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
		res.json({ usuario });
	},
	putUsuariosInactivar: async (req, res) => {
		const { id } = req.params;
		const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
		res.json({ usuario });
	},
};

export default httpUsuarios;

// login: async (req, res) => {
//     const { cc, password} = req.body;

//     try {
//         const user = await Usuario.findOne({ cc })
//         if (!user) {
//             return res.status(401).json({
//                 msg: "Usuario / Password no son correctos"
//             })
//         }

//         if (user.estado === 0) {
//             return res.status(401).json({
//                 msg: "Usuario / Password no son correctos"
//             })
//         }

//         const validPassword = bcryptjs.compareSync(password, user.password);
//         if (!validPassword) {
//             return res.status(401).json({
//                 msg: "Usuario / Password no son correctos"
//             })
//         }

//         const token = await generarJWT(user._id,user.rol);
//         res.json({
//             usuario: user,
//             token
//         })

//     } catch (error) {

//         return res.status(500).json({

//             msg: "Hable con el WebMaster"
//         })
//     }
// }
