const Server = require('../src/socketServer.js');

let server = new Server(9233);

server.register('test', () => console.log(test));
console.log(server.commandRegister.registerObj);