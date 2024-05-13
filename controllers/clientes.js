import Cliente from "../models/clientes.js";

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
			const { plan } = req.params;
			const clientes = await Cliente.countDocuments({ plan: plan });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getClientesCumpleaños: async (req, res) => {
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
			const clientes = await Cliente.find({ fechaIngreso: new Date(fecha) });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	postClientes: async (req, res) => {
		try {
			const { nombre, fechaIngreso, documento, fechaNacimiento, edad, direccion, telefono, objetivo, estado, plan } = req.body;
			const clientes = new Cliente({
				nombre,
				fechaIngreso,
				documento,
				fechaNacimiento,
				edad,
				direccion,
				telefono,
				objetivo,
				estado,
				plan,
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
			const { fecha, peso, imc, brazo, pierna, cintura, estatura } = req.body;
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
			const { nombre, fechaIngreso, documento, fechaNacimiento, edad, direccion, telefono, objetivo, plan } = req.body;
			let actualizarCampos = {};
			if (nombre !== undefined) actualizarCampos.nombre = nombre;
			if (fechaIngreso !== undefined) actualizarCampos.fechaIngreso = fechaIngreso;
			if (documento !== undefined) actualizarCampos.documento = documento;
			if (fechaNacimiento !== undefined) actualizarCampos.fechaNacimiento = fechaNacimiento;
			if (edad !== undefined) actualizarCampos.edad = edad;
			if (direccion !== undefined) actualizarCampos.direccion = direccion;
			if (telefono !== undefined) actualizarCampos.telefono = telefono;
			if (objetivo !== undefined) actualizarCampos.objetivo = objetivo;
			if (plan !== undefined) actualizarCampos.plan = plan;
			const clientes = await Cliente.findByIdAndUpdate(id, actualizarCampos, { new: true });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	putClientesSeguimiento: async (req, res) => {
		try {
			const { id } = req.params;
			const { index, fecha, peso, imc, brazo, pierna, cintura, estatura } = req.body;
			const clientes = await Cliente.findById(id);
            clientes.seguimiento.forEach((elemento, i) => {
                if (i == index) {
					if (fecha !== undefined) elemento.fecha = fecha;
					if (peso !== undefined) elemento.peso = peso;
					if (imc !== undefined) elemento.imc = imc;
					if (brazo !== undefined) elemento.brazo = brazo;
					if (pierna !== undefined) elemento.pierna = pierna;
					if (cintura !== undefined) elemento.cintura = cintura;
					if (estatura !== undefined) elemento.estatura = estatura;
                }
            })
			res.json({ clientes });
		} catch (error) {
            res.status(500).json({ error: error.message });
        }
	},
	putClientesActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	putClientesInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
			res.json({ clientes });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

export default httpClientes;
