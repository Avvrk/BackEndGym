import Maquina from "../models/maquinas.js";

const httpMaquinas = {
    getMaquinas: async (req, res) => {
        const maquinas = await Maquina.find();
        res.json({ maquinas });
    },
    getMaquinasID: async (req, res) => {
        const { id } = req.params;
        const maquinasId = await Maquina.findById(id);
        res.json({ maquinasId });
    },
    getMaquinasActivos: async (req, res) => {
        const maquinasAc = await Maquina.find({ estado: 1 });
        res.json({ maquinasAc });
    },
    getMaquinasInactivos: async (req, res) => {
        const maquinasIn = await Maquina.find({ estado: 0 });
        res.json({ maquinasIn });
    },
    postMaquinas: async (req, res) => {
        const { codigo, sede, descripcion, fechaIngreso, FechaUltMan, estado } = req.body;
        const maquinas = new Maquina({
            codigo,
            sede,
            descripcion,
            fechaIngreso,
            FechaUltMan,
            estado,
        });
        await maquinas.save();
        res.json({ maquinas });
    },
    putMaquinas: async (req, res) => {
        const { id } = req.params;
        const { codigo, sede, descripcion, fechaIngreso, FechaUltMan } = req.body;
        if (codigo != undefined) {
            const maquinaC = await Ingreso.findByIdAndUpdate(
                id,
                { codigo },
                { new: true }
            );
            res.json({ maquinaC });
        } else if (sede != undefined) {
            const maquinaS = await Ingreso.findByIdAndUpdate(
                id,
                { sede },
                { new: true }
            );
            res.json({ maquinaS });
        } else if (descripcion != undefined) {
            const maquinaD = await Ingreso.findByIdAndUpdate(
                id,
                { descripcion },
                { new: true }
            );
            res.json({ maquinaD });
        } else if (fechaIngreso != undefined) {
            const maquinaFI = await Ingreso.findByIdAndUpdate(
                id,
                { fechaIngreso },
                { new: true }
            );
            res.json({ maquinaFI });
        } else if (FechaUltMan != undefined) {
            const maquinaFUM = await Ingreso.findByIdAndUpdate(
                id,
                { FechaUltMan },
                { new: true }
            );
            res.json({ maquinaFUM });
        }
    },
    putMaquinasActivar: async (req, res) => {
        const { id } = req.params;
        const maquinas = await Maquina.findByIdAndUpdate(
            id,
            { estado: 1 },
            { new: true }
        );
        res.json({ maquinas });
    },
    putMaquinasInactivar: async (req, res) => {
        const { id } = req.params;
        const maquinas = await Maquina.findByIdAndUpdate(
            id,
            { estado: 0 },
            { new: true }
        );
        res.json({ maquinas });
    },
};

export default httpMaquinas;
