var buffer = require('buffer');
var udp = require('dgram');
var sync = require("readline-sync")
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from(sync.question("qual a palavra ser encryptada: "));

client.send(data,2222,'localhost',function(error){
    if(error){
      client.close();
    }else{
      console.log('Data sent !!!');
    }
  });

client.on('message',function(msg,info){
  console.log('o nome encriptado: ' + msg.toString());  
});

//sending msg
client.on('message',function(msg,info){
    console.log('o nome encriptado: ' + msg.toString());  
  });
