import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpPagos from '../controllers/pagos.js';
import helpersPagos from '../helpers/pagos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, httpPagos.getPagos);

router.get('/fechainicio/:fechaInicio/fechafin/:fechaFin', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').isISO8601().toDate(),
    validarJWT,
    validarCampos
], httpPagos.getPagosFechas);

router.get('/pago/:id', [
    check('id', 'El ID del pago debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPagos.getPagosPlan);

router.get('/cliente/:id', [
    check('id', 'El ID del cliente debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPagos.getPagosCliente);

router.get('/activos', validarJWT, httpPagos.getPagosActivos);

router.get('/inactivos', validarJWT, httpPagos.getPagosInactivos);

router.post('/', [
    check('cliente', 'El ID del cliente es requerido.').notEmpty(),
    check('cliente', 'El ID del cliente debe ser un mongoId válido.').isMongoId(),
    check('plan', 'El plan es requerido.').notEmpty(),
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida.').isISO8601().toDate(),
    check('valor', 'El valor es requerido.').notEmpty(),
    check('valor', 'El valor debe ser un número válido.').isNumeric(),
    validarJWT,
    validarCampos
], httpPagos.postPagos);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('cliente').custom(helpersPagos.validarCliente),
    check('fecha').custom(helpersPagos.validarFecha),
    check('valor').custom(helpersPagos.validarValor),
    validarJWT,
    validarCampos
], httpPagos.putPagos);

router.put('/activar/:id', [
    check('id', 'El ID del pago debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPagos.putPagosActivar);

router.put('/inactivar/:id', [
    check('id', 'El ID del pago debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPagos.putPagosInactivar); 


export default router;
