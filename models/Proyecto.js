const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    numero: {
        type: Number,
        require: true,
        unique: true,
    },

    titulo: {
        type: String,
        require: true,
    },

    fechaInicio: {
        type: String,
        require: true,
    },

    fechaEntrega: {
        type: String,
        require: true,
    },

    valor: {
        type: Number,
        require: true,
    },

    fechaCreacion: {
        type: Date,
        require: true,
    },

    fechaActualizacion: {
        type: Date,
        require: true,
    },

    cliente: {
        type: Schema.Types.ObjectId, ref: 'Cliente', require: true,
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId, ref: 'Tipoproyecto', require: true,
    },
    universidad: {
        type: Schema.Types.ObjectId, ref: 'Universidad', require: true,
    },
    etapa: {
        type: Schema.Types.ObjectId, ref: 'Etapa', require: true,
    },

});


module.exports = model('Proyecto', ProyectoSchema);