import Inventario from "../models/inventarios.js";

const httpInventarios = {
    getInventarios: async (req, res) => {
        try {
            const inventarios = await Inventario.find();
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getInventariosId: async (req, res) => {
        try {
            const { id } = req.params;
            const inventarios = await Inventario.findById(id);
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getInventarioActivos: async (req, res) => {
        try {
            const inventarios = await Inventario.find({ estado: 1 });
            res.json({ inventarios })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getInventarioInactivos: async (req, res) => {
        try {
            const inventarios = await Inventario.find({ estado: 0 });
            res.json({ inventarios })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getInventariosTotal: async (req, res) => {
        try {
            const inventariosTotal = await Inventario.find();
            const total = inventariosTotal.reduce((acc, item) => { return acc + item.valor; }, 0);
            res.json({ total: total });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postInventarios: async (req, res) => {
        try {
            const { codigo, descripcion, valor, cantidad, _idProveedor } = req.body;
            const inventarios = new Inventario({ codigo, descripcion, valor, cantidad, _idProveedor });
            await inventarios.save();
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putInventarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const inventarios = await Inventario.findByIdAndUpdate(id, info, { new: true });
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putInventariosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const inventarios = await Inventario.findByIdAndUpdate(id, {estado: 1}, {new: true});
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putInventariosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const inventarios = await Inventario.findByIdAndUpdate(id, {estado: 0}, {new: true});
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpInventarios;
