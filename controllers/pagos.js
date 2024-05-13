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
            const { fecha } = req.params;
            const pagos = await Pago.find({ fecha: fecha });
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
            const { documento, plan, fecha, valor } = req.body;
            let activarCampos = {};
            if (documento !== undefined) activarCampos.documento = documento;
            if (plan !== undefined) activarCampos.plan = plan;
            if (fecha !== undefined) activarCampos.fecha = fecha;
            if (valor !== undefined) activarCampos.valor = valor;
            const pagos = await Pago.findByIdAndUpdate(id, activarCampos, { new: true });
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