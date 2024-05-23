import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpPlanes from '../controllers/planes.js';
import helpersPlanes from '../helpers/planes.js';

const router = Router();

router.get('/', validarJWT, httpPlanes.getPlanes);

router.get('/id/:id', [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpPlanes.getPlanesId);

router.get('/activos', validarJWT, httpPlanes.getPlanesActivos);

router.get('/inactivos', validarJWT, httpPlanes.getPlanesInactivos);

router.post('/', [
    check('codigo', 'El código del plan es requerido.').notEmpty(),
    check('descripcion', 'La descripción del plan es requerida.').notEmpty(),
    check('valor', 'El valor del plan es requerido.').notEmpty(),
    check('valor', 'El valor del plan debe ser un número válido.').isNumeric(),
    check('dias', 'El número de días del plan es requerido.').notEmpty(),
    check('dias', 'El número de días del plan debe ser un número válido.').isNumeric(),
    validarJWT,
    validarCampos
], httpPlanes.postPlanes);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('valor').custom(helpersPlanes.validarValor),
    check('dias').custom(helpersPlanes.validarDias),
    validarJWT,
    validarCampos
], httpPlanes.putPlanes);

router.put('/activar/:id', [
    check('id', 'El ID del plan es requerido.').notEmpty(),
    check('id', 'El ID del plan debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPlanes.putPlanesActivar);
 
router.put('/inactivar/:id', [
    check('id', 'El ID del plan es requerido.').notEmpty(),
    check('id', 'El ID del plan debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPlanes.putPlanesInactivar);



export default router;