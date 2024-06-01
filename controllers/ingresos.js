import Ingreso from "../models/ingresos.js";

const httpIngresos = {
    getIngresos: async (req, res) => {
        try {
            const ingresos = await Ingreso.find();
            res.json({ ingresos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getIngresosId: async (req, res) => {
        try {
            const { id } = req.params
            const ingresos = await Ingreso.findById(id);
            res.json({ ingresos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postIngresos: async (req, res) => {
        try {
            const { fecha, sede, cliente } = req.body;
            const ingresos = new Ingreso({ fecha, sede, cliente });
            await ingresos.save();
            res.json({ ingresos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putIngresos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const ingresos = await Ingreso.findByIdAndUpdate(id, info, { new: true });
            res.json({ ingresos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpIngresos;