import planes from "../models/planes.js";
import Plan from "../models/planes.js";

const httpPlanes = {
    getPlanes: async (req, res) => {
        const planes = await Plan.find();
        res.json({ planes });
    },
    getPlanesActivos: async (req, res) => {
        const planesAc = await Plan.find({ estado: 1 });
        res.json({ planesAc });
    },
    getPlanesInactivos: async (req, res) => {
        const planesIn = await Plan.find({ estado: 0 });
        res.json({ planesIn });
    },
    postPlanes: async (req, res) => {
        const { codigo, descripcion, valor, dias, estado } = req.body;
        const planes = new Plan({ codigo, descripcion, valor, dias, estado });
        await planes.save();
        res.json({ planes });
    },
    putPlanes: async ( req, res) => {
        const { id } = req.params;
        const { codigo, descripcion, valor, dias } = req.body;
        if ( codigo != undefined ) {
            const planesC = await Plan.findByIdAndUpdate(
                id,
                { codigo },
                { new: true }
            );
            res.json({ planesC })
        } else if ( descripcion != undefined ) {
            const planesD = await Plan.findByIdAndUpdate(
                id,
                { descripcion },
                { new: true }
            );
            res.json({ planesD })
        } else if ( valor != undefined ) {
            const planesV = await Plan.findByIdAndUpdate(
                id,
                { valor },
                { new: true }
            );
            res.json({ planesV });
        } else if ( dias != undefined ) {
            const planesD = await Plan.findByIdAndUpdate(
                id,
                { dias },
                { new: true }
            );
            res.json({ planesD })
        }
    },
    putPlanesActivar: async (req, res) => {
        const { id } = req.params;
        const planes = await Plan.findByIdAndUpdate(id, { estado: 1 }, { new: true });
        res.json({ planes });
    },
    putPlanesInactivar: async (req, res) => {
        const { id } = req.params;
        const planes = await Plan.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        res.json({ planes });
    },
};

export default httpPlanes;
