const { Router } = require('express');
const Tipoproyecto = require('../models/Tipoproyecto');
const { validationResult, check } = require('express-validator');

const router = Router();


router.get('/', async function (req, res) {
    try {
        const tipoproyectos = await Tipoproyecto.find();
        res.send(tipoproyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/',
    [
        check('nombre', 'nombre.requerido').isIn(['ensayo', 'artículo', 'monografía', 'trabajo final de pregrado', 'trabajo final de especialización']),
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let tipoproyecto = new Tipoproyecto();
            tipoproyecto.nombre = req.body.nombre;
            tipoproyecto.fechaCreacion = new Date();
            tipoproyecto.fechaActualizacion = new Date();

            tipoproyecto = await tipoproyecto.save();

            res.send(tipoproyecto);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');

        }


    }
);

router.put('/:tipoproyectoId',
    async function (req, res) {

        let tipoproyecto = await Tipoproyecto.findById(req.params.tipoproyectoId);
        if (!tipoproyecto) {
            return res.send('Proyecto no existe');
        }

        const existeTipoproyecto = await Tipoproyecto.findOne({ nombre: req.body.nombre, _id: { $ne: tipoproyecto._id } });
        if (existeTipoproyecto) {
            return res.send('Ya existe el tipo de proyecto');
        }


        tipoproyecto.nombre = req.body.nombre;
        tipoproyecto.fechaActualizacion = new Date();


        tipoproyecto = await tipoproyecto.save();

        res.send(tipoproyecto);

    });

module.exports = router;
