var socket = io(),
    username = '';

$('form').submit( emitMessage() );

$('#m').keypress(function (event) {
    if (event.which === 13) {
        emitMessage();
    }
});

socket.on('chat message', function (msg){
        $('#messages').append($('<li>').text( username + ':' + msg));
});

function emitMessage() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
}