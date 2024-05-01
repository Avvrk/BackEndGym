import Ingreso from "../models/ingresos.js";

const httpIngresos = {
    getIngresos: async (req, res) => {
        const ingresos = await Ingreso.find();
        res.json({ ingresos });
    },
    postIngresos: async (req, res) => {
        const { fecha, sede, cliente } = req.body; const ingresos = new Ingreso({ fecha, sede, cliente });
        ingresos.save();
        res.json({ ingresos });
    },
    putIngresos: async (req, res) => {
        const { id } = req.params;
        const { fecha, sede, cliente } = req.body;
        if (fecha != undefined) {
            const ingresosF = await Ingreso.findByIdAndUpdate(id, { fecha }, { new: true });
            res.json({ ingresosF });
        } else if (sede != undefined) {
            const ingresosS = await Ingreso.findByIdAndUpdate(id, { sede }, { new: true });
            res.json({ ingresosS });
        } else if (cliente != undefined) {
            const ingresosC = await Ingreso.findByIdAndUpdate(id, { cliente }, { new: true });
            res.json({ ingresosC });
        }
    },
};

export default httpIngresos;
