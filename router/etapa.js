const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Etapa = require('../models/Etapa');

const router = Router();


router.get('/', async function (req, res) {
    try {
        const etapas = await Etapa.find();
        res.send(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/',
    [
        check('nombre', 'nombre.requerido').isIn(['anteproyecto', 'entrega parcial 1', 'entrega parcial 2', 'entrega final']),
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let etapa = new Etapa();
            etapa.nombre = req.body.nombre;
            etapa.fechaCreacion = new Date();
            etapa.fechaActualizacion = new Date();

            etapa = await etapa.save();

            res.send(etapa);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');

        }


    }
);

router.put('/:etapaId',
    async function (req, res) {

        let etapa = await Etapa.findById(req.params.etapaId);
        if (!etapa) {
            return res.send('Etapa no existe');
        }

        const existeEtapa = await Etapa.findOne({ nombre: req.body.nombre, _id: { $ne: etapa._id } });
        if (existeEtapa) {
            return res.send('Ya existe la etapa');
        }


        etapa.nombre = req.body.nombre;
        etapa.fechaActualizacion = new Date();


        etapa = await etapa.save();

        res.send(etapa);

    });


module.exports = router;
