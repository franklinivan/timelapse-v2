const router = require('express').Router();
const user = require('../models/user');
const multer = require('multer');
const bcrypt = require('bcrypt');

// Ruta perfil usuario
router.get('/perfil', isAuthenticated, async (req, res) => {

    try {
        const purchasedCourses  = await user.aggregate([ // operación para obtener los cursos del usuario log.
            {
                $lookup:
                {
                    from: 'products',
                    localField: 'cursos',
                    foreignField: '_id',
                    as: 'cursos'
                }
            },
            {
                $match: {
                    user: req.user.user // match es para filtrar sólo a un usuario, en este caso el que este log.
                }
            }
        ]);

        const userCourses = purchasedCourses[0].cursos; // filtro para obtener sólo los cursos.

        //Pequeña validacion para que un ADMIN no ingrese a esta ruta.
        if (req.user.role != 'admin') {

            res.render('user/perfil', {
                userCourses
            });

        } else {
            res.redirect('/');
        }

    } catch (err) {
        console.log(err);
    }
});

// Ruta view editar perfil
//Pequeña validacion para que un ADMIN no ingrese a esta ruta.
router.get('/editarPerfil', isAuthenticated, (req, res) => {

    if (req.user.role != 'admin') {
        res.render('user/editarPerfil');
    } else {
        res.redirect('/');
    }
});

// Ruta actualizar info perfil
router.post('/editarPerfil/:id', async (req, res) => {

    const { id } = req.params;
    const { body } = req;

    try {
        await user.findByIdAndUpdate(id, body);
        res.redirect('/editarPerfil');

    } catch (err) {
        console.log(err);
    }
});

// Ruta actualizar contraseña
router.post('/editarContrasena/:id', async (req, res) => {

    const { id } = req.params;
    const { body } = req;

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    body.password = hash; // se le asigna el hash a la password.

    try {
        await user.findByIdAndUpdate(id, body);
        res.redirect('/editarPerfil');

    } catch (err) {
        console.log(err);
    }
});


//USAMOS LA DEPENDENCIA MULTER PARA ALMACENAR UNA IMAGEN EN LA CARPETA PRODUCT
const upload = multer({
    storage: multer.diskStorage({
        destination: '../public/images/profiles',
        filename: (_, file, cb) => {
            cb(null, file.originalname)
        }
    })
});


// Ruta actualizar foto perfil
router.post('/editarFoto/:id', upload.single('profile'), async (req, res) => {

    const { id } = req.params;
    const logo = req.file.originalname;

    try {
        if (req.file != undefined) {
            await user.updateOne({ _id: id }, { profile: logo });
        };
        res.redirect('/editarPerfil');

    } catch (err) {
        console.log(err);
    }
});


// Ruta mi progreso
router.get('/miProgreso', isAuthenticated, async (req, res) => {

    try {
        const cursosComprados = await user.aggregate([
            {
                $lookup:
                {
                    from: 'products',
                    localField: 'cursos.id_curso',
                    foreignField: '_id',
                    as: 'cursosComprados'
                }
            },
            {
                $match: {
                    user: req.user.user
                }
            },
            { $unwind: "$cursos" }
        ]);
        var cursos = [];

        for (let i = 0; i < cursosComprados.length; i++) {
            var progress = (req.user.cursos[i].progress / 10) * 100;
            var rank = defineRank(progress);

            var logoAndName = findProductLogoAndName(cursosComprados[i].cursosComprados, req.user.cursos[i].id_curso)

            cursos.push({
                "id": req.user.cursos[i].id_curso,
                "name": logoAndName.name,
                "logo": logoAndName.logo,
                "progress": progress,
                "rankName": rank.name,
                "rankLogo": rank.logo,
                "missing": 10 - req.user.cursos[i].progress
            })

        }

        //Pequeña validacion para que un ADMIN no ingrese a esta ruta.
        if (req.user.role != 'admin') {
            res.render('user/progreso', {
                cursos
            });
        } else {
            res.redirect('/');
        }

    } catch (err) {
        console.log(err);
    }

});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function defineRank(progress) {

    if (progress <= 10) {
        return {
            'name': 'Aprendiz',
            'logo': 'novato.png'
        };
    } else if (progress == 20) {
        return {
            'name': 'Medio',
            'logo': 'medio.png'
        };
    }
    return {
        'name': 'Experto',
        'logo': 'master.png'
    };
}

function findProductLogoAndName(cursosTienda, id) {

    var logoAndName = {};

    cursosTienda.forEach(curso => {
        if (JSON.stringify(curso._id) == JSON.stringify(id)) {
            logoAndName = {
                name: curso.name,
                logo: curso.logo
            }
        }
    });

    return logoAndName
}


module.exports = router;