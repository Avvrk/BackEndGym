import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpPlanes from '../controllers/planes.js';
import helpersPlanes from '../helpers/planes.js';

const router = Router();

router.get('/', httpPlanes.getPlanes);

router.get('/activos', httpPlanes.getPlanesActivos);

router.get('/inactivos', httpPlanes.getPlanesInactivos);

router.post('/', [
    check('codigo', 'El código del plan es requerido.').notEmpty(),
    check('descripcion', 'La descripción del plan es requerida.').notEmpty(),
    check('valor', 'El valor del plan es requerido.').notEmpty(),
    check('valor', 'El valor del plan debe ser un número válido.').isNumeric(),
    check('dias', 'El número de días del plan es requerido.').notEmpty(),
    check('dias', 'El número de días del plan debe ser un número válido.').isNumeric(),
    validarCampos
], httpPlanes.postPlanes);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('valor').custom(helpersPlanes.validarValor),
    check('dias').custom(helpersPlanes.validarDias),
    validarCampos
], httpPlanes.putPlanes);

router.put('/activar/:id', [
    check('id', 'El ID del plan es requerido.').notEmpty(),
    check('id', 'El ID del plan debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpPlanes.putPlanesActivar);
 
router.put('/inactivar/:id', [
    check('id', 'El ID del plan es requerido.').notEmpty(),
    check('id', 'El ID del plan debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpPlanes.putPlanesInactivar);



export default router;