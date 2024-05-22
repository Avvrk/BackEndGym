import { Router } from "express";
import { check } from 'express-validator'
import { validarCampos } from "../middlewares/validar-datos.js";
import httpIngresos from "../controllers/ingresos.js";
import helpersIngresos from "../helpers/ingresos.js";
import { validarJWT  } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validarJWT, httpIngresos.getIngresos);

router.get("/ingreso/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpIngresos.getIngresosId);

router.post("/", [
    check('fecha', 'La fecha no puede estar vacía').notEmpty(),
    check('fecha', 'Debe ser una fecha válida').isISO8601().toDate(),
    check('sede', 'La sede no puede estar vacía').notEmpty(),
    check('cliente', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpIngresos.postIngresos);

router.put("/:id", [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    check('cliente', 'Se necesita un mongoId válido').isMongoId(),
    check('fecha').custom(helpersIngresos.validarFecha),
    validarJWT,
    validarCampos
], httpIngresos.putIngresos);

export default router;