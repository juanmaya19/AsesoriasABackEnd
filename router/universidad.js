const { Router } = require('express');
const Universidad = require('../models/Universidad');
const router = Router();

router.get('/', async function (req, res) {
    try {
        const universidades = await Universidad.find();
        res.send(universidades);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.post('/', async function (req, res) {
    try {
        const existeUniversidad = await Universidad.findOne({ nombre: req.body.nombre });
        if (existeUniversidad) {
            return res.status(400).send('Ya existe la universidad');
        }

        let universidad = new Universidad();
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date();
        universidad.fechaActualizacion = new Date();

        universidad = await universidad.save();

        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al crear el proyecto');

    }


});

router.put('/:universidadId',
    async function (req, res) {

        let universidad = await Universidad.findById(req.params.universidadId);
        if (!universidad) {
            return res.send('Universidad no existe');
        }

        const existeUniversidad = await Universidad.findOne({ nombre: req.body.nombre, _id: { $ne: cliente._id } });
        if (existeUniversidad) {
            return res.send('Ya existe la universidad');
        }


        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaActualizacion = new Date();
       


        universidad = await universidad.save();

        res.send(universidad);

    });


module.exports = router;



