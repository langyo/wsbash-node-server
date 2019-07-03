import PluginDashboard from "./pluginDashboard";
import { EventEmitter } from 'events';
import WebSocket from 'ws';
import shortid from 'shortid';

const server = new WebSocket.Server({ port: 9201 }, () => console.log("Servering at localhost:", 9201));

let clients = {}

let clientConnectionEventEmitter = new EventEmitter();

server.on('connection', conn => {
    console.log("Get a new connection!");
    let client = new PluginDashboard(conn);
    client.register({
        'system': {
            'register': platform => {
                let name = platform + "-" + shortid.generate();
                console.log("Register connection:", name);
                client.register({
                    'system': { 'register': () => null }
                });
                clients[name] = client;
                clientConnectionEventEmitter.emit(platform);
                return "ok";
            }
        }
    });
});

export let send = (client, ...data) => clients[client].send(data);

export let register = (client, obj) => clients[client].register(obj);

export let receive = (client, obj) => clients[client].receive(obj);

export let connectionEvents = clientConnectionEventEmitter;