import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.js';

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            //30 days
            expiresIn: "30d"
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

const generarJWTPassword = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            //30 days
            expiresIn: "5m"
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

const validarJWT = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        let usuario = await Usuario.findById(uid);


        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido! ."//- usuario no existe DB
            })
        }

        if (usuario.estado == 0) {
            return res.status(401).json({
                msg: "Token no válido!!  " //- usuario con estado: false
            })
        }

        req.usuariobdtoken = usuario

        next();
        
    } catch (error) {


        res.status(401).json({
            msg: "Token no valido"
        })
    }
}

const validarJWTPassword = async (req, res, next) => {
    const token = req.header("tokenP");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        let usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido: usuario no existe en la base de datos."
            });
        }

        if (usuario.estado === 0) {
            return res.status(401).json({
                msg: "Token no válido: usuario desactivado."
            });
        }

        req.usuariobdtoken = usuario;

        next();
        
    } catch (error) {
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};


export { generarJWT, validarJWT, generarJWTPassword, validarJWTPassword }


