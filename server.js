var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 80);



var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection',

    function (socket) {

        console.log("We have a new client: " + socket.id);


        socket.on('mouse',
            function(data) {

                console.log("Received: 'mouse' " + data.x + " " + data.y);


                socket.broadcast.emit('mouse', data);


            }
        );

        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    }
);
