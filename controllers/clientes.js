import Cliente from "../models/clientes.js";
import Plan from "../models/planes.js";
import { addDays } from "date-fns";

const httpClientes = {
	getClientes: async (req, res) => {
		try {
			const clientes = await Cliente.find();
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesId: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Cliente.findById(id);
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesActivos: async (req, res) => {
		try {
			const clientes = await Cliente.find({ estado: 1 });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesInactivos: async (req, res) => {
		try {
			const clientes = await Cliente.find({ estado: 0 });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesSeguimiento: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Cliente.findById(id).select("seguimiento");
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesPlan: async (req, res) => {
		try {
			const { idPlan } = req.params;
			const clientes = await Cliente.find({ _idPlan: idPlan });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesCumpleanios: async (req, res) => {
		try {
			const { fecha } = req.params;
			const clientes = await Cliente.find({ fechaNacimiento: new Date(fecha) });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesIngresaron: async (req, res) => {
		try {
			const { fecha } = req.params;
			const clientes = await Cliente.find({
				fechaIngreso: new Date(fecha),
			});
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	postClientes: async (req, res) => {
		try {
			const {
				nombre,
				correo,
				fechaIngreso,
				documento,
				tipoDocumento,
				fechaNacimiento,
				edad,
				direccion,
				telefono,
				objetivo,
				estado,
				plan,
				_idPlan,
				observaciones,
				// foto,
			} = req.body;

			let fechaActual = new Date();
			fechaActual.setHours(0, 0, 0, 0);
			
			const buscarPlan = await Plan.findById(_idPlan);

			let nuevaFecha = addDays(fechaActual, buscarPlan.dias);
			
			const clientes = new Cliente({
				nombre,
				correo,
				fechaIngreso,
				documento,
				tipoDocumento,
				fechaNacimiento,
				edad,
				direccion,
				telefono,
				objetivo,
				estado,
				plan,
				_idPlan,
				observaciones,
				fechaVencimiento: nuevaFecha,
				// foto,
			});
			await clientes.save();
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	postClientesSeguimineto: async (req, res) => {
		try {
			const { id } = req.params;
			const { fecha, peso, imc, brazo, pierna, cintura, estatura } =
				req.body;
			const clientes = await Cliente.findById(id);
			clientes.seguimiento.push({
				fecha,
				peso,
				imc,
				brazo,
				pierna,
				cintura,
				estatura,
			});
			await clientes.save();
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	putClientes: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;

			let fechaActual = new Date();
			fechaActual.setHours(0, 0, 0, 0);
			
			const buscarPlan = await Plan.findById(info._idPlan);
			const buscarCliente = await Cliente.findById(id);
			if(buscarCliente.estado === 1 && info._idPlan != buscarCliente._idPlan || buscarCliente.estado === 0) {
				let nuevaFecha = addDays(fechaActual, buscarPlan.dias);
				info.fechaVencimiento = nuevaFecha
			}

			const clientes = await Cliente.findByIdAndUpdate(id, info, {
				new: true,
			});
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	putClientesSeguimiento: async (req, res) => {
		try {
			const { id } = req.params;
			const {
				index,
				fecha,
				peso,
				imc,
				brazo,
				pierna,
				cintura,
				estatura,
			} = req.body;
			const clientes = await Cliente.findById(id);
			clientes.seguimiento.forEach((elemento, i) => {
				if (elemento._id == index) {
					if (fecha !== undefined) elemento.fecha = fecha;
					if (peso !== undefined) elemento.peso = peso;
					if (imc !== undefined) elemento.imc = imc;
					if (brazo !== undefined) elemento.brazo = brazo;
					if (pierna !== undefined) elemento.pierna = pierna;
					if (cintura !== undefined) elemento.cintura = cintura;
					if (estatura !== undefined) elemento.estatura = estatura;
				}
			});
			await clientes.save();
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	putClientesActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Cliente.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	putClientesInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Cliente.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	actualizarEstado: async (req, res) => {
		try {
			const hoy = new Date();
			const resultado = await Cliente.updateMany(
				{ fechaVencimiento: { $lt: hoy } },
				{ $set: { estado: 0 } }
			)
		} catch (error) {
			console.error(error.message);
		}
	}
};

export default httpClientes;
