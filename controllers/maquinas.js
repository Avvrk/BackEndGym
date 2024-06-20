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
            const maquinas = await Maquina.findById(id);
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMaquinasActivos: async (req, res) => {
        try {
            const maquinas = await Maquina.find({ estado: 1 });
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMaquinasInactivos: async (req, res) => {
        try {
            const maquinas = await Maquina.find({ estado: 0 });
            res.json({ maquinas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postMaquinas: async (req, res) => {
        try {
            const { codigo, sede, idSede, descripcion, fechaIngreso, fechaUltMan, estado } = req.body;
            const maquinas = new Maquina({
                codigo,
                sede,
                idSede,
                descripcion,
                fechaIngreso,
                fechaUltMan,
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
            const { ...info } = req.body;
            const maquinas = await Maquina.findByIdAndUpdate(id, info, { new: true });
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
