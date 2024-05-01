import { Router } from "express";
import { check } from 'express-validator'
import { validarCampos  } from "../middlewares/validar-datos.js";
import httpClientes from "../controllers/clientes.js";
import helpersClientes from "../helpers/clientes.js";
import { validarJWT  } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validarJWT, httpClientes.getClientes);

router.get("/activos", validarJWT, httpClientes.getClientesActivos);

router.get("/inactivos", validarJWT, httpClientes.getClientesInactivos);

router.get("/seguimiento/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpClientes.getClientesSeguimiento);

router.get("/plan/:plan", [
    check('plan', 'El plan no puede estar vacío').notEmpty(),
    validarJWT,
    validarCampos
], httpClientes.getClientesPlan);

router.get("/cumpleanios/:fecha", [
    check('fecha', 'La fecha no puede estar vacía').notEmpty(),
    check('fecha', 'La fecha solo puede ser una fecha').isISO8601().toDate(),
    validarJWT,
    validarCampos
], httpClientes.getClientesCumpleaños);

router.get("/ingresaron/:fecha", [
    check('fecha', 'La fecha no puede estar vacía').notEmpty(),
    check('fecha', 'La fecha solo puede ser una fecha').isISO8601().toDate(),
    validarJWT,
    validarCampos
], httpClientes.getClientesIngresaron);

router.post("/", [
    check('nombre', 'El nombre no puede estar vacío').notEmpty(),
    check('fechaIngreso', 'La fecha de ingreso no puede estar vacía').notEmpty(),
    check('fechaIngreso', 'Debe ser una fecha válida').isISO8601().toDate(),
    check('documento', 'El documento no puede estar vacío').notEmpty(),
    check('documento', 'El documento solo puede ser números').isNumeric(),
    check('fechaNacimiento', 'La fecha de nacimiento no puede estar vacía').notEmpty(),
    check('fechaNacimiento', 'Debe ser una fecha válida').isISO8601().toDate(),
    check('edad', 'La edad no puede estar vacía').notEmpty(),
    check('edad', 'La edad solo puede ser números').isNumeric(),
    check('direccion', 'La dirección no puede estar vacía').notEmpty(),
    check('telefono', 'El teléfono no puede estar vacío').notEmpty(),
    check('telefono', 'El teléfono solo puede ser números').isNumeric(),
    check('objetivo', 'El objetivo no puede estar vacío').notEmpty(),
    check('estado', 'El estado no puede estar vacío').notEmpty(),
    check('estado', 'El estado solo puede ser números').isNumeric(),
    check('plan', 'El plan no puede estar vacío').notEmpty(),
    validarJWT,
    validarCampos
], httpClientes.postClientes);

router.put("/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    check('fechaIngreso').custom(helpersClientes.validarFechaIngreso),
    check('documento').custom(helpersClientes.validarDocumento),
    check('fechaNacimiento').custom(helpersClientes.validarFechaNacimiento),
    check('edad').custom(helpersClientes.validarEdad),
    check('telefono').custom(helpersClientes.validarTelefono),
    validarJWT,
    validarCampos
], httpClientes.putClientes);

router.put("/activar/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpClientes.putClientesActivar);

router.put("/inactivar/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpClientes.putClientesInactivar);

export default router;