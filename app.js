//passo 1: importar aas configurações do servidor
const { set } = require('./config/server');
var app = require('./config/server');

//passo 2: parametrizar a porta de escuta
var server = app.listen(3001, function(){
    console.log('servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

// criar a conexão por websocket

io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário Desconectou');
    })

    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaCliente',
             {apelido: data.apelido, mensagem: data.mensagem}
             );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
            );

            if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {

        socket.emit(
            'participantesParaCliente',
                {apelido: data.apelido}
                );

        socket.broadcast.emit(
            'participantesParaCliente',
            {apelido: data.apelido}
            );
        }
    })
});

