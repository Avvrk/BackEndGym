import Venta from "../models/ventas.js";

const httpVentas = {
    getVentas: async (req, res) => {
        try {
            const ventas = await Venta.find();
            res.json({ ventas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    getVentasId: async (req, res) => {
        try {
            const { id } = req.params;
            const ventas = await Venta.findById(id);
            res.json({ ventas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    postVentas: async (req, res) => {
        try {
            const { fecha, codigoProducto, valorUnitario, valorTotal } = req.body;
            const venta = new Venta({
                fecha,
                codigoProducto,
                valorUnitario,
                valorTotal,
            });
            await venta.save();
            res.json({ venta });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    putVentas: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const ventas = await Venta.findByIdAndUpdate(id, info, { new: true });
            res.json({ ventas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
};

export default httpVentas;