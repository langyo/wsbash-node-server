import { send, register, receive, connectionEvents } from "./webSocketServer";
import db from "./databaseDriver";

export const register = (platform) => connectionEvents.on('h5', (name) => {
  register(name, {
    
  });
});