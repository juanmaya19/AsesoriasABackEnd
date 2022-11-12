const {Schema, model} = require ('mongoose');

const EtapaSchema = Schema({
  
    nombre:{
        type: String,
        require: true,
        enum: [
            'anteproyecto', 'entrega parcial 1', 'entrega parcial 2', 'entrega final',
        ]
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

module.exports = model('Etapa',EtapaSchema);