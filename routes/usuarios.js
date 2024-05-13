import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpUsuarios from '../controllers/usuarios.js';
import helpersUsuarios from '../helpers/usuarios.js';

const router = Router();

router.get('/', httpUsuarios.getUsuarios);

router.get('/activos', httpUsuarios.getUsuariosActivos);

router.get('/inactivos', httpUsuarios.getUsuariosInactivos);

router.post('/login', [
    check('email', 'El correo electrónico es requerido.').notEmpty(),
    check('email', 'El correo electrónico debe tener un formato válido.').not().isEmail(),
    check('password', 'La contraseña es requerida.').notEmpty(),
    validarCampos
], httpUsuarios.getUsuariosLogin);

router.post('/log', [
    check('sede', 'El nombre de la sede es requerido.').notEmpty(),
    check('idSede', 'El ID de la sede debe ser un mongoId válido.').isMongoId(),
    check('idSede').custom(helpersUsuarios.validarIdSede),
    check('nombre', 'El nombre del usuario es requerido.').notEmpty(),
    check('email', 'El correo electrónico es requerido.').notEmpty(),
    check('email', 'El correo electrónico debe tener un formato válido.').not().isEmail(),
    check('telefono', 'El teléfono del usuario es requerido.').notEmpty(),
    check('telefono', 'El teléfono del usuario debe ser un número válido.').isNumeric(),
    check('password', 'La contraseña es requerida.').notEmpty(),
    check('rol', 'El rol del usuario es requerido.').notEmpty(),
    validarCampos
], httpUsuarios.postUsuariosLog);
 
router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('telefono').custom(helpersUsuarios.validarTelefono),
    validarCampos
], httpUsuarios.putUsuarios);

router.put('/activar/:id', [
    check('id', 'El ID del usuario es requerido.').notEmpty(),
    check('id', 'El ID del usuario debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpUsuarios.putUsuariosActivar);

router.put('/inactivar/:id', [
    check('id', 'El ID del usuario es requerido.').notEmpty(),
    check('id', 'El ID del usuario debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpUsuarios.putUsuariosInactivar);


export default router;