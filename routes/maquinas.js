import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpMaquinas from '../controllers/maquinas.js';
import helpersMaquinas from '../helpers/maquinas.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, httpMaquinas.getMaquinas);

router.get('/:id', [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinas.getMaquinasID);

router.get('/maq/activos', validarJWT, httpMaquinas.getMaquinasActivos);

router.get('/maq/inactivos', validarJWT, httpMaquinas.getMaquinasInactivos);

router.post('/', [
    check('codigo', 'El código no puede estar vacío.').notEmpty(),
    check('sede', 'La sede no puede estar vacía.').notEmpty(),
    check('descripcion', 'La descripción es requerida.').notEmpty(),
    check('fechaIngreso', 'La fecha de ingreso debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaUltMan', 'La fecha del último mantenimiento no puede estar vacía.').notEmpty(),
    check('fechaUltMan', 'La fecha del último mantenimiento debe ser una fecha válida.').isISO8601().toDate(),
    validarJWT,
    validarCampos
], httpMaquinas.postMaquinas);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('fechaIngreso').custom(helpersMaquinas.validarFechaIngreso),
    check('fechaUltMan').custom(helpersMaquinas.validarUltMan),
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