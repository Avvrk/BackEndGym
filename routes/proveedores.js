import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProveedores from '../controllers/proveedores.js';

const router = Router();

router.get('/',
    //  validarJWT,
     httpProveedores.getProveedor);

router.get('/id/:id', [
    check('id', 'Se necesita un mongoId válido').isMongoId(),
    // validarJWT,
    validarCampos
], httpProveedores.getProveedorId);

router.get('/activos',
    //  validarJWT, 
     httpProveedores.getProveedorActivos);

router.get('/inactivos', 
    // validarJWT, 
    httpProveedores.getProveedorInactivos);

router.post('/', [
    check('nombre', 'El nombre del proveedor es requerido.').notEmpty(),
    check('telefono', 'El teléfono del proveedor es requerido.').notEmpty(),
    check('telefono', 'El teléfono del proveedor debe ser válido').isNumeric(),
    check('correo', 'El correo del proveedor es requerido.').notEmpty(),
    check('correo', 'El correo del proveedor debe ser válido.').isEmail(),
    // validarJWT,
    validarCampos
], httpProveedores.postProveedor);

router.put('/:id', [
    check('id', 'El ID del proveedor es requerido.').notEmpty(),
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    // validarJWT,
    validarCampos
], httpProveedores.putProveedor);

router.put('/activar/:id', [
    check('id', 'El ID del proveedor es requerido.').notEmpty(),
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    // validarJWT,
    validarCampos
], httpProveedores.putProveedorActivar);

router.put('/inactivar/:id', [
    check('id', 'El ID del proveedor es requerido.').notEmpty(),
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    // validarJWT,
    validarCampos
], httpProveedores.putProveedorInactivar);



export default router;