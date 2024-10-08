import { Router } from 'express';
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-datos.js';
import httpInventarios from '../controllers/inventarios.js';
import helpersInventarios from '../helpers/inventarios.js';
import { validarJWT  } from "../middlewares/validar-jwt.js";


const router = Router();

router.get('/', validarJWT, httpInventarios.getInventarios);

router.get('/id/:id', [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.getInventariosId);

router.get('/activos', validarJWT, httpInventarios.getInventarioActivos);

router.get('/inactivos', validarJWT, httpInventarios.getInventarioInactivos);

router.get('/total', validarJWT, httpInventarios.getInventariosTotal);

router.post('/', [
    check('codigo', 'El código no puede estar vacío.').notEmpty(),
    check('codigo').custom(helpersInventarios.validarCodigoRepetido),
    check('descripcion', 'La descripción no puede estar vacía.').notEmpty(),
    check('valor', 'El valor debe ser un número válido.').isNumeric(),
    check('cantidad', 'La cantidad debe ser un número válido.').isNumeric(),
    check('_idProveedor', 'Ingrese un mongo id valido').isMongoId(),
    check('_idProveedor').custom(helpersInventarios.validarIdProveedor),
    validarJWT,
    validarCampos
], httpInventarios.postInventarios);

router.put('/:id', [
    check('id', 'Se necesita un mongoId válido.').isMongoId(),
    check('codigo').custom(async (codigo, { req }) => {
        const id = req.params.id;
        await helpersInventarios.validarCodigoRepetido(codigo, id);
    }),
    check('valor').custom(helpersInventarios.validarValor),
    check('cantidad').custom(helpersInventarios.validarCantidad),
    check('_idProveedor', 'Ingrese un mongo id valido').isMongoId(),
    check('_idProveedor').custom(helpersInventarios.validarIdProveedor),
    validarJWT,
    validarCampos
], httpInventarios.putInventarios);

router.put('/activar/:id', [
    check('id', 'Se necesita un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.getInventarioActivos);

router.put('/inactivar/:id', [
    check('id', 'Se necesita un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.getInventarioInactivos);

export default router;
