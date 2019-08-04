const Server = require('../src/socketServer.js');

let server = new Server(9233);

server.register('test', (obj, callback) => callback({ info: 'test' }));

server.receive('test', (obj) => console.log(obj));