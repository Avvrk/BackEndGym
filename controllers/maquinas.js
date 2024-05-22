import Maquina from "../models/maquinas.js";

const httpMaquinas = {
    getMaquinas: async (req, res) => {
        try {
            const maquinas = await Maquina.find();
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMaquinasId: async (req, res) => {
        try {
            const { id } = req.params;
            const maquinasId = await Maquina.findById(id);
            res.json({ maquinasId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMaquinasActivos: async (req, res) => {
        try {
            const maquinasAc = await Maquina.find({ estado: 1 });
            res.json({ maquinasAc });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMaquinasInactivos: async (req, res) => {
        try {
            const maquinasIn = await Maquina.find({ estado: 0 });
            res.json({ maquinasIn });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postMaquinas: async (req, res) => {
        try {
            const { codigo, sede, idSede, descripcion, fechaIngreso, FechaUltMan, estado } = req.body;
            const maquinas = new Maquina({
                codigo,
                sede,
                idSede,
                descripcion,
                fechaIngreso,
                FechaUltMan,
                estado,
            });
            await maquinas.save();
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMaquinas: async (req, res) => {
        try {
            const { id } = req.params;
            const { codigo, sede, descripcion, fechaIngreso, FechaUltMan } = req.body;
            let activarCampos = {};
            if (codigo !== undefined) activarCampos.codigo = codigo;
            if (sede !== undefined) activarCampos.sede = sede;
            if (descripcion !== undefined) activarCampos.descripcion = descripcion;
            if (fechaIngreso !== undefined) activarCampos.fechaIngreso = fechaIngreso;
            if (FechaUltMan !== undefined) activarCampos.FechaUltMan = FechaUltMan;
            const maquinas = await Maquina.findByIdAndUpdate(id, activarCampos, { new: true });
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMaquinasActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const maquinas = await Maquina.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMaquinasInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const maquinas = await Maquina.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpMaquinas;