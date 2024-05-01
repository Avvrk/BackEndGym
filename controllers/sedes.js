import Sede from "../models/sedes.js";

const httpSedes = {
    getSedes: async (req, res) => {
        const sedes = await Sede.find();
        res.json({ sedes });
    },
    getSedesActivos: async (req, res) => {
        const sedesAc = await Sede.find({ estado: 1 });
        res.json({ sedesAc });
    },
    getSedesInactivos: async (req, res) => {
        const sedesIn = await Sede.find({ estado: 0 });
        res.json({ sedesIn });
    },
    postSedes: async (req, res) => {
        const { nombre, direccion, codigo, horario, ciudad, telefono, estado } = req.body;
        const sede = new Sede({
            nombre,
            direccion,
            codigo,
            horario,
            ciudad,
            telefono,
            estado,
        });
        await sede.save();
        res.json({ sede });
    },
    putSedes: async (req, res) => {
        const { id } = req.params;
        const { nombre, direccion, codigo, horario, ciudad, telefono } = req.body;
        if ( nombre != undefined ) {
            const sedesN = await Sede.find(
                id,
                { nombre },
                { new: true }
            );
            res.json({ sedesN })
        } else if ( direccion != undefined ) {
            const sedesD = await Sede.find(
                id,
                { direccion },
                { new: true }
            );
            res.json({ sedesD })
        } else if ( codigo != undefined ) {
            const sedesC = await Sede.find(
                id,
                { codigo },
                { new: true }
            );
            res.json({ sedesC })
        }else if ( horario != undefined ) {
            const sedesH = await Sede.find(
                id,
                { horario },
                { new: true }
            );
            res.json({ sedesH })
        }else if ( ciudad != undefined ) {
            const sedesCi = await Sede.find(
                id,
                { ciudad },
                { new: true }
            );
            res.json({ sedesCi })
        }else if ( telefono != undefined ) {
            const sedesT = await Sede.find(
                id,
                { telefono },
                { new: true }
            );
            res.json({ sedesT })
        }
    },
    putSedesActivar: async (req, res) => {
        const { id } = req.params;
        const sede = await Sede.findByIdAndUpdate(
            id,
            { estado: 1 },
            { new: true }
        );
        res.json({ sede });
    },
    putSedesInactivar: async (req, res) => {
        const { id } = req.params;
        const sede = await Sede.findByIdAndUpdate(
            id,
            { estado: 0 },
            { new: true }
        );
        res.json({ sede });
    },
};

export default httpSedes;
