import Plan from "../models/proveedores.js";

const httpProveedores = {
    getProveedor: async (req, res) => {
        try {
            const proveedores = await Plan.find();
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProveedorId: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedores = await Plan.findById(id);
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProveedorActivos: async (req, res) => {
        try {
            const proveedores = await Plan.find({ estado: 1 });
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProveedorInactivos: async (req, res) => {
        try {
            const proveedores = await Plan.find({ estado: 0 });
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postProveedor: async (req, res) => {
        try {
            const { nombre, telefono, correo } = req.body;
            const proveedores = new Plan({ nombre, telefono, correo });
            await proveedores.save();
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const proveedores = await Plan.findByIdAndUpdate(id, info, { new: true });
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putProveedorActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedores = await Plan.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putProveedorInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedores = await Plan.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpProveedores;