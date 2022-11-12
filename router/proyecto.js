const { Router } = require('express');
const Proyecto = require('../models/Proyecto');

const router = Router();




router.post('/', async function (req, res) {
    try {
        const existeProyecto = await Proyecto.findOne({ numero: req.body.numero });
        if (existeProyecto) {
            return res.status(400).send('Ya existe el Proyecto');
        }

        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaInicio = req.body.fechaInicio;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapa = req.body.etapa._id;
        proyecto = await proyecto.save();

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al crear el proyecto');

    }

});

router.put('/:proyectoId', async function (req, res) {
    try {
        let proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(400).send('Proyecto no existe');
        }

        const existeProyectoPorNumero = await Proyecto.findOne({ numero: req.body.numero, _id: { $ne: proyecto._id } });
        if (existeProyectoPorNumero) {
            return res.status(400).send('Ya existe el numero para otro Proyecto');
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaInicio = req.body.fechaInicio;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.fechaActualizacion = new Date();
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapa = req.body.etapa._id;
        proyecto = await proyecto.save();

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Proyectos');
    }
});




module.exports = router;