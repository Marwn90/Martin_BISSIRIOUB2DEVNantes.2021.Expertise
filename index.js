const express = require('express')
const app = express()
const server = require('http').createServer(app);


const ws = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
   console.log('A new client Connected!')
   ws.send('welcome New Client!');

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      ws.send('Got ur msg its:  ' + message);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    ws.send('something');
  });

app.get('/', (req, res)=> res.send('hello world'))

server.listen(3000, () => console.log('Lisening on port :3000'))