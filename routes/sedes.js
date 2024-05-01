import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpSedes from '../controllers/sedes.js';
import helpersSedes from '../helpers/sedes.js';

const router = Router();

router.get('/', httpSedes.getSedes);

router.get('/activos', httpSedes.getSedesActivos);

router.get('/inactivos', httpSedes.getSedesInactivos);

router.post('/', [
    check('nombre', 'El nombre de la sede es requerido.').notEmpty(),
    check('direccion', 'La dirección de la sede es requerida.').notEmpty(),
    check('codigo', 'El código de la sede es requerido.').notEmpty(),
    check('horario', 'El horario de la sede es requerido.').notEmpty(),
    check('ciudad', 'La ciudad de la sede es requerida.').notEmpty(),
    check('telefono', 'El teléfono de la sede es requerido.').notEmpty(),
    check('telefono', 'El teléfono de la sede debe ser un número válido.').isNumeric(),
    validarCampos
], httpSedes.postSedes);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('codigo').custom(helpersSedes.validarCodigo),
    check('telefono').custom(helpersSedes.validarTelefono),
    validarCampos
], httpSedes.putSedes);
 
router.put('/activar', [
    check('id', 'El ID de la sede es requerido.').notEmpty(),
    check('id', 'El ID de la sede debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpSedes.putSedesActivar);

router.put('/inactivar', [
    check('id', 'El ID de la sede es requerido.').notEmpty(),
    check('id', 'El ID de la sede debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpSedes.putSedesInactivar);


export default router;