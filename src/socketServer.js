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
      console.log('A new connection from', conn._socket.remoteAddress, '->', id);
      this.clients[id] = new SocketManager(conn, id, this.commandRegister);
      conn.on('close', (code, reason) => {
        console.log('The connection', id, 'has been closed, code', code, 'and the reason is:', reason);
        delete this.clients[id];
      });
      conn.on('error', err => {
        console.error('The connection', id, 'has crashed an error:', err);
      })
    });

    this.register.bind(this);
    this.receive.bind(this);
  }

  register() { this.commandRegister.register.apply(this.commandRegister, arguments); };
  receive() { this.commandRegister.receive.apply(this.commandRegister, arguments); };
}
