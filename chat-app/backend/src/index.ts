import WebSocketServer from 'websocket';
import http from 'http';

const server = http.createServer();
server.listen(8080);

const wsServer = new WebSocketServer.server({ httpServer: server});
const clients = new Map(); // username -> connection

wsServer.on('request', function(request){
    const connection = request.accept(null, request.origin);
    let username:string | null = null ;

    connection.on('message', function(message){
        if (message.type != 'utf8') return;
        const data = JSON.parse(message.utf8Data);
        if (data.type == "identify"){
            username = data.username;
            clients.set(username, connection);
            console.log(`${username}` + " is connected");
            return;
        }
        if (data.type === "chat" && username){
            const text = data.text ;
            for (let [user, conn] of clients){
                if (user !== username){
                    conn.sendUTF(JSON.stringify({
                        from: username, 
                        text : text
                    }))
                }
            }
            return;
        }
    })

    connection.on('close', function() {
        if (username) {
            clients.delete(username);
            console.log(`${username} disconnected`);
        }
    });
    connection.on('error', function(err){
        console.log(err);
        return;
    })
})