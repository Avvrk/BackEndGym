import Inventario from "../models/inventarios.js";

const httpInventarios = {
    getInventarios: async (req, res) => {
        const inventarios = await Inventario.find();
        res.json({ inventarios });
    },
    getInventariosTotal: async (req, res) => {
        const inventariosTotal = await Inventario.find(); const total = inventariosTotal.reduce((acc, item) => { return acc + item.valor; }, 0);
        res.json({ total: total });
    },
    postInventarios: async (req, res) => {
        const { codigo, descripcion, valor, cantidad } = req.body; const inventarios = new Inventario({ codigo, descripcion, valor, cantidad });
        await inventarios.save();
        res.json({ inventarios });
    },
    putInventarios: async (req, res) => {
        const { id } = req.params; const { codigo, descripcion, valor, cantidad } = req.body; if (codigo != undefined) {
            const invetariosC = await Ingreso.findByIdAndUpdate(id, { codigo }, { new: true });
            res.json({ invetariosC });
        } else if (descripcion != undefined) {
            const invetariosD = await Ingreso.findByIdAndUpdate(id, { descripcion }, { new: true });
            res.json({ invetariosD });
        } else if (valor != undefined) {
            const invetariosV = await Ingreso.findByIdAndUpdate(id, { valor }, { new: true });
            res.json({ invetariosV });
        } else if (cantidad != undefined) {
            const invetariosCa = await Ingreso.findByIdAndUpdate(id, { cantidad }, { new: true });
            res.json({ invetariosCa });
        }
    },
};

export default httpInventarios;
