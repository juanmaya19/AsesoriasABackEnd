const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://juanmaya19:juanmaya91@ac-jkgdc2z-shard-00-00.rvqozuv.mongodb.net:27017,ac-jkgdc2z-shard-00-01.rvqozuv.mongodb.net:27017,ac-jkgdc2z-shard-00-02.rvqozuv.mongodb.net:27017/asesorias?ssl=true&replicaSet=atlas-12lqx9-shard-0&authSource=admin&retryWrites=true&w=majority';   

        await mongoose.connect(url);

        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}