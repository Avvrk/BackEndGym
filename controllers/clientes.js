import Cliente from "../models/clientes.js";

const httpClientes = {
    getClientes: async (req, res) => {
        const clientes = await Cliente.find();
        res.json({ clientes });
    },
    getClientesActivos: async (req, res) => {
        const clientesAc = await Cliente.find({ estado: 1 });
        res.json({ clientesAc });
    },
    getClientesInactivos: async (req, res) => {
        const clientesIn = await Cliente.find({ estado: 0 });
        res.json({ clientesIn });
    },
    getClientesSeguimiento: async (req, res) => {
        const { id } = req.params;
        const clientesS = await Cliente.findById(id).select("seguimiento");
        res.json({ clientesS });
    },
    getClientesPlan: async (req, res) => {
        const { plan } = req.params;
        const clientesP = await Cliente.countDocuments({ plan: plan });
        res.json({ clientesP });
    },
    getClientesCumpleaños: async (req, res) => {
        const { fecha } = req.params;
        const clientesC = await Cliente.find({ fechaNacimiento: new Date(fecha) });
        res.json({ clientesC });
    },
    getClientesIngresaron: async (req, res) => {
        const { fecha } = req.params;
        const clientesInF = await Cliente.find({ fechaIngreso: new Date(fecha) });
        const clientesInC = await Cliente.countDocuments({ fechaIngreso: new Date(fecha) });
        res.json({ clientesInF, clientesInC });
    },
    postClientes: async (req, res) => {
        const { nombre, fechaIngreso, documento, fechaNacimiento, edad, direccion, telefono, objetivo, estado, plan, } = req.body;
        const clientes = new Cliente({ 
            nombre, 
            fechaIngreso, 
            documento, 
            fechaNacimiento, 
            edad, 
            direccion, 
            telefono, 
            objetivo, 
            estado, 
            plan, });
        await clientes.save();
        res.json({ clientes });
    },
    putClientes: async (req, res) => {
        const { id } = req.params;
        const { nombre, fechaIngreso, documento, fechaNacimiento, edad, direccion, telefono, objetivo, plan, } = req.body;
        if (nombre != undefined) {
            const clientesN = await Cliente.findByIdAndUpdate(id, { nombre }, { new: true });
            res.json({ clientesN });
        } else if (fechaIngreso != undefined) {
            const clientesFI = await Cliente.findByIdAndUpdate(id, { fechaIngreso }, { new: true });
            res.json({ clientesFI });
        } else if (documento != undefined) {
            const clientesD = await Cliente.findByIdAndUpdate(id, { documento }, { new: true });
            res.json({ clientesD });
        } else if (fechaNacimiento != undefined) {
            const clientesFN = await Cliente.findByIdAndUpdate(id, { fechaNacimiento }, { new: true });
            res.json({ clientesFN });
        } else if (edad != undefined) {
            const clientesE = await Cliente.findByIdAndUpdate(id, { edad }, { new: true });
            res.json({ clientesE });
        } else if (direccion != undefined) {
            const clientesDi = await Cliente.findByIdAndUpdate(id, { direccion }, { new: true });
            res.json({ clientesDi });
        } else if (telefono != undefined) {
            const clientesT = await Cliente.findByIdAndUpdate(id, { telefono }, { new: true });
            res.json({ clientesT });
        } else if (objetivo != undefined) {
            const clientesO = await Cliente.findByIdAndUpdate(id, { telefono }, { new: true });
            res.json({ clientesO });
        } else if (plan != undefined) {
            const clientesP = await Cliente.findByIdAndUpdate(id, { plan }, { new: true });
            res.json({ clientesP });
        }
    },
    putClientesActivar: async (req, res) => {
        const { id } = req.params;
        const clientes = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
        res.json({ clientes });
    },
    putClientesInactivar: async (req, res) => {
        const { id } = req.params;
        const clientes = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        res.json({ clientes });
    },
};

export default httpClientes;
