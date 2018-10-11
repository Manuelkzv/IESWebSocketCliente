//npm install varWebSocket

const webSocetCliente = require('websocket').client;
var clienteWs = new webSocetCliente();

clienteWs.on('connectFailed', function(error){
  console.log("Error de conexión: " + error);
});

clienteWs.on('connect', function(connection){
  console.log("ws Cliente conectado");

  connection.on('close', function(){
    console.log("Conexión terminada");
  });

  connection.on('message', function(mensaje){
    if(mensaje.type === 'utf8'){
      console.log("Recibdo: " + mensaje.utf8Data );
    }
  });

  function identificador(){
    console.log("Envando id");
    if(connection.connected){
      console.log("Generando ID");
      var id = Math.round(Math.random() * 0xFFFFFF);
      console.log(id.toString());
      connection.sendUTF(id.toString());
    }
  }
  identificador();
});

clienteWs.connect('ws://localhost:6666', 'echo-protocol');
