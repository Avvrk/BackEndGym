import Sede from "../models/sedes.js";

const httpSedes = {
    getSedes: async (req, res) => {
        try {
            const sedes = await Sede.find();
            res.json({ sedes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getSedesid: async (req, res) => {
        try {
            const { id } = req.params
            const sedes = await Sede.findById(id);
            res.json({ sedes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getSedesActivos: async (req, res) => {
        try {
            const sedes = await Sede.find({ estado: 1 });
            res.json({ sedes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getSedesInactivos: async (req, res) => {
        try {
            const sedes = await Sede.find({ estado: 0 });
            res.json({ sedes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postSedes: async (req, res) => {
        try {
            const { nombre, direccion, codigo, horario, ciudad, telefono, estado } = req.body;
            const sede = new Sede({
                nombre,
                direccion,
                codigo,
                horario,
                ciudad,
                telefono,
                estado,
            });
            await sede.save();
            res.json({ sede });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putSedes: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, direccion, codigo, horario, ciudad, telefono } = req.body;
            let activarCampos = {};
            if (nombre !== undefined) activarCampos.nombre = nombre;
            if (direccion !== undefined) activarCampos.direccion = direccion;
            if (codigo !== undefined) activarCampos.codigo = codigo;
            if (horario !== undefined) activarCampos.horario = horario;
            if (ciudad !== undefined) activarCampos.ciudad = ciudad;
            if (telefono !== undefined) activarCampos.telefono = telefono;
            const sedes = await Sede.findByIdAndUpdate(id, activarCampos, { new: true });
            res.json({ sedes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putSedesActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const sede = await Sede.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ sede });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putSedesInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const sede = await Sede.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ sede });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpSedes;