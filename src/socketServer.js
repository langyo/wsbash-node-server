const SocketManager = require('./socketManager.js');
const CommandRegister = require('./commandRegister.js');
const WebSocket = require('ws');
const shortid = require('shortid');

module.exports = class SocketServer {
  constructor(port) {
    this.server = new WebSocket.Server({ port }, () => console.log("Servering at localhost:", port));

    this.clients = {};
    this.commandRegister = new CommandRegister();
    this.server.on('connection', conn => {
      let id = shortid.generate();
      clients[id] = new SocketManager(conn, id, this.commandRegister);
    });

    this.register.bind(this);
    this.receive.bind(this);
  }

  register() { this.commandRegister.apply(arguments); };
  receive() { this.commandRegister.apply(arguments); };
}
