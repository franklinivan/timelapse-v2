const router = require('express').Router();
const product = require('../models/Product');
const user = require('../models/User');

// Rutas para cursos
router.get('/curso/:name', isAuthenticated, (req, res) => {
    
    const { name } = req.params;

    try {

        //Pequeña validacion para que un ADMIN no ingrese a esta ruta.
        if (req.user.role !== 'admin') {
            res.render('courses/whatsapp/seccion1', { name });

        } else {
            res.redirect('/');
        }

    } catch (err) {
        console.log(err);
    }

});

// Ruta para la prueba n1
// router.get('/curso-p1/:name', isAuthenticated, async (req, res) => {

//     try {
//         const { name } = req.params;
//         const userProgress = await user.findById(req.user.id);

//         const course = await product.find({ name: name });
        
//         let idCourse = '';
//         let progress = 0;

//         console.log(course);
//         console.log('..............................');

//         course.forEach(element => {
//             idCourse = element._id;
//         });

//         console.log(idCourse);

//         userProgress.cursos.forEach(element => {
//             if (element.id_curso == idCourse.toString()) {
//                 progress = element.progress;
//             }
//         });
//         console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx');
//         console.log(progress);

//         //Pequeña validacion para que un ADMIN no ingrese a esta ruta.
//         if (req.user.role !== 'admin') {
//             res.render('courses/whatsapp/prueba1', { name, progress });
//         } else {
//             res.redirect('/');
//         }

//     } catch (err) {
//         console.log(err);
//     }
// });

// Ruta paso 1 (prueba 1)
// router.post('/progresion/:name', async (req, res) => {

//     try {
//         const progress = req.body.progress;
//         const name = req.params.name;
//         const course = await product.find({ name: name });
//         let idCourse = '';

//         course.forEach(element => {
//             idCourse = element._id
//         });

//         await user.updateOne(
//             { _id: req.user.id, 'cursos.id_curso': idCourse },
//             {
//                 $set: { "cursos.$.progress": parseInt(progress) }
//             }
//         )
//         res.redirect('/curso-p1/' + name);

//     } catch (err) {
//         console.log(err);
//     }
// });

// Ruta rehacer progreso
// router.post('/rehacerProgreso/:name', async (req, res) => {

//     try {
//         const name = req.params.name;
//         const course = await product.find({ name: name });
//         let idCourse = '';

//         course.forEach(element => {
//             idCourse = element._id
//         });

//         await user.updateOne(
//             { _id: req.user.id, 'cursos.id_curso': idCourse },
//             {
//                 $set: { "cursos.$.progress": 0 }
//             }
//         )
//         res.redirect('/curso-p1/' + name);

//     } catch (err) {
//         console.log(err);
//     }
// });

router.get('/prueba', isAuthenticated, (req, res) => {
    res.render('pages/prueba');
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;