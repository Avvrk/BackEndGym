import { Router } from "express";
import { check } from 'express-validator'
import { validarCampos  } from "../middlewares/validar-datos.js";
import httpClientes from "../controllers/clientes.js";
import helpersClientes from "../helpers/clientes.js";
import { validarJWT  } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validarJWT, httpClientes.getClientes);

router.get("/id/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpClientes.getClientesId);

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
], httpClientes.getClientesCumpleanios);

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
    check('foto', 'la foto no puede estar vacío').notEmpty(),
    check('estado', 'El estado no puede estar vacío').notEmpty(),
    check('estado', 'El estado solo puede ser números').isNumeric(),
    check('plan', 'El plan no puede estar vacío').notEmpty(),
    check('idPlan').custom(helpersClientes.validarIdPlan),
    validarJWT,
    validarCampos
], httpClientes.postClientes);

router.post("/seguimiento/:id", [
    check('id', 'El id debe ser un mongoId valido').isMongoId(),
    check('fecha', 'La fecha no puede estar vacia').notEmpty(),
    check('fecha', 'Debe ser una fecha valida').isISO8601().toDate(),
    check('peso', 'El peso no puede estar vacio').notEmpty(),
    check('peso', 'El peso solo puede ser numeros').isNumeric(),
    check('imc', 'El imc no puede estar vacio').notEmpty(),
    check('imc', 'El imc solo puede ser numeros').isNumeric(),
    check('brazo', 'El brazo no puede estar vacio').notEmpty(),
    check('brazo', 'El brazo solo puede ser numeros').isNumeric(),
    check('pierna', 'La pierna no puede estar vacio').notEmpty(),
    check('foto', 'La foto no puede estar vacío').notEmpty(),
    check('pierna', 'La pierna solo puede ser numeros').isNumeric(),
    check('cintura', 'El cintura no puede estar vacio').notEmpty(),
    check('cintura', 'El cintura solo puede ser numeros').isNumeric(),
    check('estatura', 'El estatura no puede estar vacio').notEmpty(),
    check('estatura', 'El estatura solo puede ser numeros').isNumeric(),
    validarJWT,
    validarCampos
], httpClientes.postClientesSeguimineto);

router.put("/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    check('fechaIngreso').custom(helpersClientes.validarFechaIngreso),
    check('documento').custom(helpersClientes.validarDocumento),
    check('fechaNacimiento').custom(helpersClientes.validarFechaNacimiento),
    check('edad').custom(helpersClientes.validarEdad),
    check('telefono').custom(helpersClientes.validarTelefono),
    check('idPlan').custom(helpersClientes.validarIdPlan),
    validarJWT,
    validarCampos
], httpClientes.putClientes);

router.put("/seguimiento/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    check('fecha').custom(helpersClientes.validarFecha),
    check('peso').custom(helpersClientes.validarPeso),
    check('imc').custom(helpersClientes.validarImc),
    check('brazo').custom(helpersClientes.validarBrazo),
    check('pierna').custom(helpersClientes.validarPierna),
    check('cintura').custom(helpersClientes.validarCintura),
    check('estatura').custom(helpersClientes.validarEstatura),
    validarJWT,
    validarCampos
], httpClientes.putClientesSeguimiento);

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