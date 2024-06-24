import Pago from "../models/pagos.js";

const httpPagos = {
    getPagos: async (req, res) => {
        try {
            const pagos = await Pago.find();
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPagosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const pagos = await Pago.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPagosPlan: async (req, res) => {
        try {
            const { plan } = req.params;
            const pagos = await Pago.find({ plan: plan });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPagosCliente: async (req, res) => {
        try {
            const { id } = req.params;
            const pagos = await Pago.findById(id);
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPagosActivos: async (req, res) => {
        try {
            const pagos = await Pago.find({ estado: 1 });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPagosInactivos: async (req, res) => {
        try {
            const pagos = await Pago.find({ estado: 0 });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postPagos: async (req, res) => {
        try {
            const { documento, plan, fecha, valor, estado } = req.body; //el documento es el id del cliente
            const pagos = new Pago({ documento, plan, fecha, valor, estado });
            await pagos.save();
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putPagos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const pagos = await Pago.findByIdAndUpdate(id, info, { new: true });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putPagosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const pagos = await Pago.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putPagosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const pagos = await Pago.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ pagos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpPagos;
