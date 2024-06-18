import { json } from "express";
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
    getMantenimientosActivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 1 });
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMantenimientosInactivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 0 });
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getMantenimientosFechas: async (req, res) => {
        const { fechaInicio, fechaFin } = req.body;
        res.json({ fechaInicio, fechaFin });
        // try {
        //     const { fechaInicio, fechaFin } = req.body;
        //     const fechaInicioObj = new Date(fechaInicio);
        //     const fechaFinObj = new Date(fechaFin);
        //     const mantenimientos = await Mantenimiento.find({
        //         fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
        //     });
        //     res.json({ mantenimientos });
        // } catch (error) {
        //     res.status(500).json({ error: error.message });
        // }
    },
    postMantenimientos: async (req, res) => {
        try {
            const { idMaquina, fecha, descripcion, responsable, precio } = req.body;
            const mantenimientos = new Mantenimiento({
                idMaquina,
                fecha,
                descripcion,
                responsable,
                precio,
            });
            await mantenimientos.save();
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMantenimientos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, info, { new: true });
            res.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMantenimientosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            req.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putMantenimientosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            req.json({ mantenimientos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default httpMantenimientos;
