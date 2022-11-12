const {Schema, model} = require ('mongoose');

const ClienteSchema = Schema({
    
    nombre:{
        type: String,
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

module.exports = model('Cliente',ClienteSchema);