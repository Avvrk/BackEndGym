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
            const { codigo, descripcion, valor, cantidad } = req.body;
            const inventarios = new Inventario({ codigo, descripcion, valor, cantidad });
            await inventarios.save();
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putInventarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { codigo, descripcion, valor, cantidad } = req.body;
            let actualizarCampos = {};
            if (codigo !== undefined) actualizarCampos.codigo = codigo;
            if (descripcion !== undefined) actualizarCampos.descripcion = descripcion;
            if (valor !== undefined) actualizarCampos.valor = valor;
            if (cantidad !== undefined) actualizarCampos.cantidad = cantidad;
            const inventarios = await Inventario.findByIdAndUpdate(id, actualizarCampos, { new: true });
            res.json({ inventarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpInventarios;