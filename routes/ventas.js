import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import httpVentas from '../controllers/ventas.js';
import helpersVentas from '../helpers/ventas.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, httpVentas.getVentas);

router.get('/id/:id', [
    check('id', 'El ID del producto debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpVentas.getVentasId);

router.get('/fechainicio/:fechaInicio/fechafin/:fechaFin', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio').custom(helpersVentas.validarFecha),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin').custom(helpersVentas.validarFecha),
    validarJWT,
    validarCampos
], httpVentas.getVentasFechas);

router.post('/', [
    check('idInventario', "El id invetario es requerido").notEmpty(),
    check('idInventario', 'El idInventario debe ser un mongoId valido').isMongoId(),
    check('valorUnitario', 'El valor unitario es requerido.').notEmpty(),
    check('valorUnitario', 'El valor unitario debe ser un número válido.').isNumeric(),
    check('valorTotal', 'El valor total es requerido.').notEmpty(),
    check('valorTotal', 'El valor total debe ser un número válido.').isNumeric(),
    check('cantidad', 'La cantidad no puede estar vacia').notEmpty(),
    check('cantidad', 'La cantidad debe ser un numero valido').isNumeric(),
    validarJWT,
    validarCampos
], httpVentas.postVentas);

router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('idInvetario').custom(helpersVentas.validarIdInventario),
    check('fecha').custom(helpersVentas.validarFecha),
    check('valorUnitario').custom(helpersVentas.validarValorUnitario),
    check('valorTotal').custom(helpersVentas.validarValorTotal),
    validarJWT,
    validarCampos
], httpVentas.putVentas);

export default router;
