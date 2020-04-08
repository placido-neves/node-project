//importa s modulos
const net = require('net');
const crypto = require("crypto");

//partas e o host e encriptar
const port = 7070;
const host = '127.0.0.1';
const alg = "aes-256-ctr"
const psw = "bsc"

//criando o server
const server = net.createServer();
server.listen(port, host, () => {
    console.log('Servidor tcp rodando na porta: ' + port + '.');
});

//funçao q encripta os dados
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

let sockets = [];

//as fucianalidade do server
server.on('connection', function(sock) {
    var teste = criptografar(data)
    var decript = descriptografar(teste) 

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    //os dados server
    sock.on('data', function(data) {     
        console.log('DATA ' + sock.remoteAddress + ': ' + data);               
        sockets.forEach(function(sock, index, array) {
            sock.write( " said " + teste +'\n'+"palavra descriptada: " +decript );                    
        });
       
    });

    //close o server
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
            console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});