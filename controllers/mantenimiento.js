import Mantenimiento from "../models/mantenimiento.js";

const httpMantenimientos = {
    getMantenimientos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find();
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMantenimientosId: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findById(id);
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMantenimientosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const mantenimientos = await Mantenimiento.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postMantenimientos: async (req, res) => {
        try {
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
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMantenimientos: async (req, res) => {
        try {
            const { id } = req.params;
            const { idMaquina, fecha, descripcion, responsable, precio } = req.body;
            let actualizarCampos = {};
            if (idMaquina !== undefined) actualizarCampos.idMaquina = idMaquina;
            if (fecha !== undefined) actualizarCampos.fecha = fecha;
            if (descripcion !== undefined) actualizarCampos.descripcion = descripcion;
            if (responsable !== undefined) actualizarCampos.responsable = responsable;
            if (precio !== undefined) actualizarCampos.precio = precio;
            const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, actualizarCampos, { new: true });
            res.json({ mantenimiento });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpMantenimientos;