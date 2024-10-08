import Venta from "../models/ventas.js";
import Inventario from "../models/inventarios.js";

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
    getVentasFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const ventas = await Venta.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ ventas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postVentas: async (req, res) => {
        try {
            const { fecha, idInventario, valorUnitario, valorTotal, cantidad } = req.body;
            const ventas = new Venta({
                fecha,
                idInventario,
                valorUnitario,
                valorTotal,
                cantidad,
            });

            const i = await Inventario.findById(idInventario)
            if (!i) {
                return res.status(404).json({ error: "Inventario no encontrado", msg: i });
            }

            i.cantidad -= cantidad

            await i.save();
            await ventas.save();
            res.json({ ventas });
        } catch (errorr) {
            console.error(errorr);
            res.status(500).json({ error: "Error en el servidor", errorr });
        }
    },
    putVentas: async (req, res) => {
        try {
            const { id } = req.params;
            const { cantidadAnterior,...info } = req.body;

            const i = await Inventario.findById(info.idInventario)
            if (!i) {
                return res.status(404).json({ error: "Inventario no encontrado", msg: i });
            }

            i.cantidad += cantidadAnterior

            i.cantidad -= info.cantidad

            await i.save();
            const ventas = await Venta.findByIdAndUpdate(id, info, { new: true });
            res.json({ ventas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
};

export default httpVentas;
