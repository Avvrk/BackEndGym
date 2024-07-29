import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpMantenimientos from '../controllers/mantenimiento.js';
import helpersMantenimiento from '../helpers/mantenimiento.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, httpMantenimientos.getMantenimientos);

router.get('/id/:id', [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosId);

router.get('/fecha1/:fechaInicio/fecha2/:fechaFin', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio').custom(helpersMantenimiento.validarFecha),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin').custom(helpersMantenimiento.validarFecha),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosFechas);

router.get('/activos', validarJWT, httpMantenimientos.getMantenimientosActivos);

router.get('/inactivos', validarJWT, httpMantenimientos.getMantenimientosInactivos);

router.post('/', [
    check('idMaquina', 'El ID de la máquina es requerido.').notEmpty(),
    check('idMaquina', 'El ID de la máquina debe ser un mongoId válido.').isMongoId(),
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha').custom(helpersMantenimiento.validarFecha),
    check('descripcion', 'La descripción es requerida.').notEmpty(),
    check('responsable', 'El responsable es requerido.').notEmpty(),
    check('precio', 'El precio es requerido.').notEmpty(),
    check('precio', 'El precio debe ser un número válido.').isNumeric(),
    validarJWT,
    validarCampos
], httpMantenimientos.postMantenimientos);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('idMaquina').custom(helpersMantenimiento.validarIdMaquina),
    check('fecha').custom(helpersMantenimiento.validarFecha),
    check('precio').custom(helpersMantenimiento.validarPrecio),
    validarJWT,
    validarCampos
], httpMantenimientos.putMantenimientos);

router.put('/activar/:id', validarJWT, httpMantenimientos.putMantenimientosActivar);

router.put('/inactivar/:id', validarJWT, httpMantenimientos.putMantenimientosInactivar);

export default router;