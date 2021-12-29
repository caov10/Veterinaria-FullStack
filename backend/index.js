const http = require('http');
const requestHandler = require('./request-handler');
const recursos=require('./recursos');

global.recursos = recursos;

const server = http.createServer(requestHandler);
  

server.listen(3300, ()=>{
          console.log("El servidor esta escuchando peticion");
});