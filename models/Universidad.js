const {Schema, model} = require ('mongoose');

const UniversidadSchema = Schema({
    nombre:{
        type: String,
        require: true,
    },

    direccion:{
        type: String,
        require: true,
    },

   telefono :{
        type: Number,
        require: true,
    },

    fechaCreacion:{
        type: Date,
        require: true,
    },

    fechaActualizacion:{
        type: Date,
        require: true,
    },
   
});

module.exports = model('Universidad',UniversidadSchema);