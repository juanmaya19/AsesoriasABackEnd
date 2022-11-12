const { Router } = require('express');
const Cliente = require('../models/Cliente');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const clientes = await Cliente.find();
        res.send(clientes);
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.post('/', async function (req, res) {
    try {
        const existeCliente = await Cliente.findOne({ nombre: req.body.nombre });
        if (existeCliente) {
            return res.status(400).send('Ya existe el Cliente');
        }

        let cliente = new Cliente();
        cliente.nombre = req.body.nombre;
        cliente.fechaCreacion = new Date();
        cliente.fechaActualizacion = new Date();

        cliente = await cliente.save();

        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al crear el proyecto');

    }


});

router.put('/:clienteId',
    async function (req, res) {
        
            let cliente = await Cliente.findById(req.params.clienteId);
            if (!cliente) {
                return res.send('Cliente no existe');
            }

            const existeCliente = await Cliente.findOne({ nombre: req.body.nombre, _id: {$ne: cliente._id} });
            if (existeCliente) {
                return res.send('Ya existe el Cliente');
            }


            cliente.nombre = req.body.nombre;
            cliente.fechaActualizacion = new Date();
           

            cliente = await cliente.save();

            res.send(cliente);
       
    });

   



module.exports = router;



