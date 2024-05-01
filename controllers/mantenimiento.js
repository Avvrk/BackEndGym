import Mantenimiento from "../models/mantenimiento.js";

const httpMantenimientos = {
    getMantenimientos: async (req, res) => {
        const mantenimientos = await Mantenimiento.find();
        res.json({ mantenimientos });
    },
    getMantenimientosFechas: async (req, res) => {
        const { fechaInicio, fechaFin } = req.body;
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);
        const mantenimientos = await Mantenimiento.find({
            fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
        });
        res.json({ mantenimientos });
    },
    postMantenimientos: async (req, res) => {
        const { idMaquina, fecha, descripcion, responsable, precio } = req.body;
        const mantenimiento = new Mantenimiento({
            idMaquina,
            fecha,
            descripcion,
            responsable,
            precio,
        });
        await mantenimiento.save();
        res.json({ mantenimiento });
    },
    putMantenimientos: async (req, res) => {
        const { id } = req.params;
        const { idMaquina, fecha, descripcion, responsable, precio } = req.body;
        if (idMaquina != undefined) {
            const inventariosIdM = await Ingreso.findByIdAndUpdate(
                id,
                { idMaquina },
                { new: true }
            );
            res.json({ inventariosIdM });
        } else if (fecha != undefined) {
            const inventariosF = await Ingreso.findByIdAndUpdate(
                id,
                { fecha },
                { new: true }
            );
            res.json({ inventariosF });
        } else if (descripcion != undefined) {
            const inventariosD = await Ingreso.findByIdAndUpdate(
                id,
                { descripcion },
                { new: true }
            );
            res.json({ inventariosD });
        } else if (responsable != undefined) {
            const inventariosR = await Ingreso.findByIdAndUpdate(
                id,
                { responsable },
                { new: true }
            );
            res.json({ inventariosR });
        } else if (precio != undefined) {
            const inventariosP = await Ingreso.findByIdAndUpdate(
                id,
                { precio },
                { new: true }
            );
            res.json({ inventariosP });
        }
    },
};

export default httpMantenimientos;
