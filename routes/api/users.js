const router = require('express').Router();
const bcrypt = require('bcryptjs');


const User = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');





router.get('/buy/:productId', checkToken, async (req, res) => {
    const { productId } = req.params;
    req.user.cart.push(productId);   //las lineas 15 y 16 son exclusivas de mongodb, no se hace en mySQL
    await req.user.save();  //el metodo save hace que se guarde en la bd
    res.json({ success: 'Producto agregado' }); // necesario para que no se quede tostado.
})


router.get('/cart', checkToken, (req, res) => {
    res.json(req.user.cart);
});


router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8); //el valor por defecto es 10, es mejor poneruno bajito

    try {
        const newUser = await User.create(req.body);
        res.json(newUser)
    } catch (error) {
        res.json({ fatal: error.message })
    }

});


router.post('/login', async (req, res) => {

    //Comprobamos si el email esta registrado
    const user = await User.findOne({ email: req.body.email });

    if (!user) {                    //ojo, mySQl devuelve un array, pero mongo devuelve un objeto
        return res.json({ Error: 'Error en usuario y/o contraseña' });

    }
    const iguales = bcrypt.compareSync(req.body.password, user.password)
    if (!iguales) {
        return res.json({ Error: 'Error en usuario y/o contraseña' });
    }
    res.json({
        success: "Login correcto!!😋",
        token: createToken(user)
    });
});

module.exports = router;