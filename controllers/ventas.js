import Venta from "../models/ventas.js";

const httpVentas = {
    getVentas: async (req, res) => {
        const ventas = await Venta.find();
        res.json({ ventas });
    },
    getVentasID: async (req, res) => {
        const { id } = req.params;
        const ventas = await Venta.findById(id);
    },
    postVentas: async (req, res) => {
        const { fecha, codigoProducto, valorUnitario, valorTotal } = req.body;
        const venta = new Venta({
            fecha,
            codigoProducto,
            valorUnitario,
            valorTotal,
        });
        await venta.save();
        res.json({
            venta,
        });
    },
    putVentas: async (req, res) => {
        const { id } = req.params;
        const { fecha, codigoProducto, valorUnitario, valorTotal } = req.body;
        if ( fecha != undefined ) {
            const ventasF = await Venta.findOneAndUpdate(
                id,
                { fecha },
                { new: true }
            );
            res.json({ ventasF });
        } else if ( codigoProducto != undefined ) {
            const ventasCP = await venta.findOneAndUpdate(
                id,
                { codigoProducto },
                { new: true }
            );
            res.json({ ventasCP });
        } else if ( valorUnitario != undefined ) {
            const ventasVU = await venta.findOneAndUpdate(
                id,
                { valorUnitario },
                { new: true }
            );
            res.json({ ventasVU });
        } else if ( valorTotal != undefined ) {
            const ventasVT = await Venta.findByIdAndUpdate(
                id,
                { valorTotal },
                { new: true }
            );
            res.json({ ventasVT });
        }
    }
};

export default httpVentas;
