var app = require('../app');
var debug = require('debug')('react-backend:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/*소켓용 테스트*/

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var io = require('socket.io').listen(3100);
var channel;
const dbName = 'Trip_Scheduler';

io.on('connection', function (socket) {
    console.log('connect');

    socket.on('channelJoin', async function (data) {
        socket.join(data);
        channel = data;
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
        const db = await client.db(dbName);
        const result = await db.collection('log').find({ channel: channel })
        .sort({ data: 1 })
        .toArray();
        
        socket.emit('receive', { comment: result });
        console.log("소켓입장확인");
        client.close();
    });

    socket.on('send', async function (data) {
        let dataAddinfo = {
            ip: socket.handshake.address, 
            msg: data.msg, 
            date: Date.now(), 
            email:data.email, 
            username: data.username
        };
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
        const db = await client.db(dbName);
        const result = await db.collection('log').insert(
            {
                ip: dataAddinfo.ip,
                msg: dataAddinfo.msg,
                date: dataAddinfo.date,
                channel: data.channel,
                email: dataAddinfo.email,
                username:dataAddinfo.username
            }
        );
        client.close();
        io.sockets.in(data.channel).emit('receive', {comment: dataAddinfo});
    });

    socket.on('createcard', function(data){
        console.log(data.card);
    });

    socket.on('channelLeave', function(data){
        socket.leave(data);
    });

    socket.on('calendarJoin', async (data) => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
        const db = await client.db(dbName);
        const Events = await db.collection('Events');
        const result = await Events.find({ channel: channel }).toArray();
        socket.emit('calreceive', { events: result[0].events });
        client.close();
    });
    socket.on('sendEvents', async (data) => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
        const db = await client.db(dbName);
        const Events = await db.collection('Events');
        const result = await Events.updateOne(
            { channel: channel },
            { $push: {
                events:{
                    id: data.id,
                    title: data.title,
                    start: data.start,
                    end: data.end,
                    contents: data.contents
                }
              }
            },
            { returnOriginal: false }
        );
        io.sockets.in(channel).emit('receiveEvents', {events:data});
        client.close();
    });
    socket.on('removeEvents', async (data) => { //data는 eventid
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
        const db = await client.db(dbName);
        const Events = await db.collection('Events');
        const result = await Events.findOneAndUpdate(
            { channel:channel }, 
            { $pull:{ 'events': { id:data }}},
            { returnOriginal: false }
        );
        console.log(result);
        io.sockets.in(channel).emit('deleteEvents', {id:data, events:result.value.events});
        client.close();
    });
    socket.on('cardJoin', async (data) => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
        const db = await client.db(dbName);
        const Cards = await db.collection('Cards');
        const result = await Cards.find({ channel: channel }).toArray();
        socket.emit('cardreceive', { cards: result[0].events });
        client.close();
    });
});

/*소켓용 테스트*/

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
