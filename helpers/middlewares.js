const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const checkToken = async (req, res, next) => {
    // Comprobar si el TOKEN viene incluido en la cabecera Authorization
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera de Authorization' });
    }

    const token = req.headers['authorization'];

    // Comprobar si el TOKEN es correcto
    // Si el token está mal, verify lanza una excepción
    let obj;
    try {
        obj = jwt.verify(token, 'clave ultra secretisima');
    } catch (error) {
        return res.json({ fatal: 'El token es incorrecto!!!' });
    }

    // Recuperar el usuario a partir de su ID
    // { user_id: 2, exp: 1680252545, iat: 1680252245 }
    req.user = await User.findById(obj.user_id).populate('cart'); //al poner populate cart hace que en lugar de trarse solo el id, se trae otod el producto entero.


    next();
}

const checkAdmin = (req, res, next) => {
    // Si ejecuto un código que va después de la ejecución del método checkToken, tengo disponible la variable req.user
    // OBJETIVO: Si el usuario logado es admin, llamamos a next. Si no, respondemos con error
    if (req.user.role !== 'admin') {
        return res.json({ fatal: 'Debes ser ADMIN' });
    }
    next();
}

module.exports = {
    checkToken, checkAdmin
}