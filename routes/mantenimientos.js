import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpMantenimientos from '../controllers/mantenimiento.js';
import helpersMantenimiento from '../helpers/mantenimiento.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, httpMantenimientos.getMantenimientos);

router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').isISO8601().toDate(),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosFechas);

router.post('/', [
    check('idMaquina', 'El ID de la máquina es requerido.').notEmpty(),
    check('idMaquina', 'El ID de la máquina debe ser un mongoId válido.').isMongoId(),
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida.').isISO8601().toDate(),
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

export default router;