const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { setupWebSocket } = require('./webSocket')

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://christopher:12345@cluster0-o6gdv.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
app.use(routes);


// Tipos de parâmetros:

//Query params: request.query ( Filtros, ordenação, paginação...)
// Route params: request.params: request.params ( Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro )



server.listen(3333);
