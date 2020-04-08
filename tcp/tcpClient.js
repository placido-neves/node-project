const net = require('net');
const sync = require('readline-sync')

const port = 7070;
const host = '127.0.0.1';

var client = new net.Socket();

function input(){
	return sync.question("Qual a palavra para ser encriptada: ");
}

client.connect(port, host, function() {
	console.log('Connected');
	client.write(input());
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); 
});

client.on('close', function() {
	console.log('Connection closed');
});