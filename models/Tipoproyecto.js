const {Schema, model} = require ('mongoose');

const TipoproyectoSchema = Schema({
  
    nombre:{
        type: String,
        require: true,
        enum: [
            'ensayo', 'artículo', 'monografía', 'trabajo final de pregrado', 'trabajo final de especialización',
        ]
    },

    fechaCreacion:{
        type: Date,
        required: true,
    },

    fechaActualizacion:{
        type: Date,
        required: true,
    },
    
});

module.exports = model('Tipoproyecto',TipoproyectoSchema);