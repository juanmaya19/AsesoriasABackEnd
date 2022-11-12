
const express = require('express');
const {getConnection} = require('./db/connection-mongo');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

getConnection();


app.use(express.json());

app.use('/cliente', require('./router/cliente'));
app.use('/universidad', require('./router/universidad'));
app.use('/tipoproyecto', require('./router/tipoproyecto'));
app.use('/etapa', require('./router/etapa'));
app.use('/proyecto', require('./router/proyecto'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});