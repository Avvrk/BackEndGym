import planes from "../models/planes.js";
import Plan from "../models/planes.js";

const httpPlanes = {
    getPlanes: async (req, res) => {
        try {
            const planes = await Plan.find();
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPlanesId: async (req, res) => {
        try {
            const { id } = req.params;
            const planes = await Plan.findById(id);
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPlanesActivos: async (req, res) => {
        try {
            const planes = await Plan.find({ estado: 1 });
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPlanesInactivos: async (req, res) => {
        try {
            const planes = await Plan.find({ estado: 0 });
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postPlanes: async (req, res) => {
        try {
            const { codigo, descripcion, valor, dias, estado } = req.body;
            const planes = new Plan({ codigo, descripcion, valor, dias, estado });
            await planes.save();
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putPlanes: async (req, res) => {
        try {
            const { id } = req.params;
            const { codigo, descripcion, valor, dias } = req.body;
            let actualizarCampos = {};
            if (codigo !== undefined) actualizarCampos.codigo = codigo;
            if (descripcion !== undefined) actualizarCampos.descripcion = descripcion;
            if (valor !== undefined) actualizarCampos.valor = valor;
            if (dias !== undefined) actualizarCampos.dias = dias;
            const planes = await Plan.findByIdAndUpdate(id, actualizarCampos, { new: true });
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putPlanesActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const planes = await Plan.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putPlanesInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const planes = await Plan.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ planes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpPlanes;