import {Server} from "socket.io"
import { createServer } from "http";

const httpServer = createServer();

interface ServerToClientEvents {
    sendData: (data:any) => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
interface ClientToServerEvents {
  message: (data:any) => void;
}
  
interface InterServerEvents {
  ping: () => void;
}
  
interface SocketData {
  name: string;
  age: number;
}

type MessageData = {
  text:string,
  avatar:string,
  username:string
}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors:{
        origin:"*"
    }
});

io.on("connection", (socket) => {
  console.log(io.of("/").sockets.size);
    socket.on("message",(data:MessageData)=>{
        io.emit('sendData',{
            data,
            id:socket.id
        })
    })
});

httpServer.listen(9000);