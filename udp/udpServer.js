var udp = require('dgram');
var crypto = require('crypto');

const alg = "aes-256-ctr"
const psw = "bsc"
var menssage = null;
var menssage2=null;


// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

function criptografar(data){
    const cypher = crypto.createCipher(alg,psw);
    const cript =  cypher.update(data,'utf8','hex')
    return cript    
}

//funcão q descripta 
function descriptografar(palavra) {
    const decypher = crypto.createDecipher(alg,psw)
    const decript = decypher.update(palavra,'hex','utf8')
    return decript;
};

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  message = criptografar(String.toString(msg));
  message2 = descriptografar(message);
  console.log('Data received from client : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

//sending msg
server.send([menssage,message2],info.port,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('enviado');
  }

});

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(2222);
