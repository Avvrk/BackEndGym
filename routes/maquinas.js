import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpMaquinas from '../controllers/maquinas.js';
import helpersMaquinas from '../helpers/maquinas.js';

const router = Router();

router.get('/', validarJWT, httpMaquinas.getMaquinas);

router.get('/id/:id', [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinas.getMaquinasId);

router.get('/activos', validarJWT, httpMaquinas.getMaquinasActivos);

router.get('/inactivos', validarJWT, httpMaquinas.getMaquinasInactivos);

router.post('/', [
    check('codigo', 'El código no puede estar vacío.').notEmpty(),
    check('sede', 'La sede no puede estar vacía.').notEmpty(),
    check('idSede', 'El ID de la sede debe ser un mongoId válido.').isMongoId(),
    check('idSede').custom(helpersMaquinas.validarIdSede),
    check('descripcion', 'La descripción es requerida.').notEmpty(),
    check('fechaIngreso').custom(helpersMaquinas.validarFecha),
    check('fechaUltMan', 'La fecha del último mantenimiento no puede estar vacía.').notEmpty(),
    check('fechaUltMan').custom(helpersMaquinas.validarFecha),
    validarJWT,
    validarCampos
], httpMaquinas.postMaquinas);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('fechaIngreso').custom(helpersMaquinas.validarFecha),
    check('fechaUltMan').custom(helpersMaquinas.validarFecha),
    validarJWT,
    validarCampos
], httpMaquinas.putMaquinas);

router.put('/activar/:id', [
    check('id', 'Se necesita un mongoId válido para activar la máquina.').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinas.putMaquinasActivar);

router.put('/inactivar/:id', [
    check('id', 'Se necesita un mongoId válido para inactivar la máquina.').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinas.putMaquinasInactivar);


export default router;
