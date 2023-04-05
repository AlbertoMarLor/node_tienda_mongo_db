const router = require('express').Router();
const { checkToken } = require('../helpers/middlewares');


router.use('/products', checkToken, require('./api/products'));  //metemos de por medio el middleware checktoken para bloquear el acceso
router.use('/users', require('./api/users')); //aqui no podemos poner el checktoken, nos cargariamos el registro y el login

module.exports = router;