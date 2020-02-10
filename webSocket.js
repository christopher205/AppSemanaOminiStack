const socketio = require('socket.io');
const parseStringparseArray = require('./utils/parseStringparseArray')
const calculaDistancia = require('./utils/calculaDistancia')

let io;
const connections = [];

exports.setupWebSocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {
        console.log( socket.id)

        const { latitude, longitude, skills} = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            skills: parseStringparseArray(skills),
        })
    });
}
exports.findConnections = (coordinates, skills) => {
    return connections.filter(connections => {
        return calculaDistancia(coordinates, connections.coordinates) < 10
        && connections.skills.some(item => skills.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connections => {
        io.to(connections.id).emit(message, data);
    });
}