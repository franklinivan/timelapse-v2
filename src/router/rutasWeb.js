const router = require('express').Router();
const product = require('../models/Product');

// Rutas de inicio
router.get('/', (_, res) => {
    res.render('index');
});

// Rutas de tienda
router.get('/tienda', async (_, res) => {

    try {

        const cursos = await product.find({});

        res.render('pages/tienda', {
            cursos
        });

    } catch (err) {
        console.log(err);
    }

});

// Rutas de tienda -- ver detalles de producto
router.get('/tienda/:name', async (req, res) => {

    const { name } = req.params;

    try {
        const productName = await product.find({ name });

        productDetails = productName[0];

        res.render('pages/producto', { productDetails });

    } catch (err) {
        console.log(err);
    }

});

// Rutas de carrito
router.get('/carrito', (_, res) => {
    res.render('pages/carrito');
});

router.get('/checkout', (_, res) => {
    res.render('pages/checkout');
});

router.get('/sobreNosotros', (_, res) => {
    res.render('pages/sobreNosotros');
});

router.get('/politicaPrivacidad', (_, res) => {
    res.render('pages/politicaPrivacidad');
});

module.exports = router;