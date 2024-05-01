import Pago from "../models/pagos.js";

const httpPagos = {
    getPagos: async (req, res) => {
        const pagos = await Pago.find();
        res.json({ pagos });
    },
    getPagosFechas: async (req, res) => {
        const { fecha } = req.params;
        const pagosF = await Pago.find({ fecha: fecha });
        res.json({ pagosF });
    },
    getPagosPlan: async (req, res) => {
        const { plan } = req.params;
        const pagosP = await Pago.find({ plan: plan });
        res.json({ pagosP });
    },
    getPagosCliente: async (req, res) => {
        const { id } = req.params; //el documento es el id del cliente
        const pagosC = await Pago.findById(id);
        res.json({ pagosC });
    },
    getPagosActivos: async (req, res) => {
        const pagosAc = await Pago.find({ estado: 1 });
        res.json({ pagosAc });
    },
    getPagosInactivos: async (req, res) => {
        const pagosIn = await Pago.find({ estado: 0 });
        res.json({ pagosIn });
    },
    postPagos: async (req, res) => {
        const { documento, plan, fecha, valor, estado } = req.body; //el documento es el id del cliente
        const pagos = new Pago({ documento, plan, fecha, valor, estado });
        await pagos.save();
        res.json({ pagos });
    },
    putPagos: async (req, res) => {
        const { id } = req.params;
        const { documento, plan, fecha, valor } = req.body;
        if ( documento != undefined ) {
            const pagosD = await Pago.findByIdAndUpdate(
                id,
                { documento },
                { new: true } 
            );
            res.json({ pagosD });
        } else if ( plan != undefined ) {
            const pagosP = await Pago.findByIdAndUpdate(
                id,
                { plan },
                { new: true }
            );
            res.json({ pagosP });
        } else if ( fecha != undefined ) {
            const pagosF = await Pago.findByIdAndUpdate(
                id,
                { plan },
                { new: true }
            );
            res.json({ pagosF });
        } else if ( valor != undefined ) {
            const pagosV = await Pago.findByIdAndUpdate(
                id,
                { plan },
                { new: true }
            );
            res.json({ pagosV });
        }
    },
    putPagosActivar: async (req, res) => {
        const { id } = req.params; //el documento es del cliente
        const pagos = await Pago.findByIdAndUpdate(id, { estado: 1 }, { new: true });
        res.json({ pagos });
    },
    putPagosInactivar: async (req, res) => {
        const { id } = req.params; //el documento es del cliente
        const pagos = await Pago.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        res.json({ pagos });
    },
};

export default httpPagos;
