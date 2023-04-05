const router = require('express').Router();

const Product = require('../../models/product.model')

router.get('/', async (req, res) => {

    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});


router.get('/price/:minPrice', async (req, res) => {
    const { minPrice } = req.params;
    try {
        const products = await Product.find({
            price: { $gte: minPrice },  //Greater Than or Equal. Otros operadores -> gt, gte, lt, lte, eq, neq, in.
            available: true
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});

router.get('/department/:department', async (req, res) => {
    const { department } = req.params;
    try {
        const products = await Product.find({ department });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});



router.get('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const products = await Product.findById(productId);
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});




router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }

});


router.put('/stock', async (req, res) => {


    try {
        const result = await Product.updateMany(

            {
                available: true,
                stock: { $lte: 10 }       // este objeto es el filtro que ponemos como condicion para que luego cambie
            },
            { available: false }

        );
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})



router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        res.json(deletedProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})



module.exports = router;