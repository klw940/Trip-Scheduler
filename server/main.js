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
    var instanceId = socket.id;

    socket.on('channelJoinChat', function (data) {
        console.log('channelJoinChat :', data);
        socket.join(data);
        channel = data;
        console.log(channel);
        MongoClient.connect('mongodb://127.0.0.1:27017/', function (error, client) {
            console.log(channel);
            if (error) console.log(error);
            else {
                const db = client.db(dbName);
                db.collection('log').find({ channel: channel }).sort({ data: 1 }).toArray(function (err, doc) {
                    if (err) console.log(err);
                    doc.forEach(function (item) {
                        console.log(item);
                        socket.emit('receiveChat', { comment: item });
                    });
                    console.log("Chat소켓입장확인");
                    client.close();
                });
            }
        });
    });

    socket.on('sendChat', function (data) {
        console.log('Chat입력소켓')
        console.log('Chatdata :', data)
        let dataAddinfo = {ip: socket.handshake.address, msg: data.msg, date: Date.now(), email:data.email, username: data.username};
        console.log(dataAddinfo)
        MongoClient.connect('mongodb://127.0.0.1:27017/', function (error, client) {
            if (error) console.log(error);
            else {
                const db = client.db(dbName);
                console.log(data.email)
                db.collection('log').insert({
                    ip: dataAddinfo.ip,
                    msg: dataAddinfo.msg,
                    date: dataAddinfo.date,
                    channel: data.channel,
                    email: dataAddinfo.email,
                    username:dataAddinfo.username
                }, function (err, doc) {
                    if (err) console.log(err);
                    client.close();
                });
            }
        });
        console.log('receiveChat : ',data.channel,dataAddinfo);
        io.sockets.in(data.channel).emit('receiveChat', {comment: dataAddinfo});
    });

    socket.on('channelLeave', function(data){
        socket.leave(data);
    });

    // calendar socekt
    socket.on('channelJoinEvent', function (data) {
        console.log('channelJoinEvent:', data);
        socket.join(data);
        channel = data;
        console.log(channel);
        MongoClient.connect('mongodb://127.0.0.1:27017/', function (error, client) {
            console.log(channel);
            if (error) console.log(error);
            else {
                const db = client.db(dbName);
                db.collection('Events').find({ channel: channel }).sort({ data: 1 }).toArray(function (err, doc) {
                    if (err) console.log(err);
                    doc.forEach(function (item) {
                        console.log(item.events);
                        socket.emit('receiveEvents', { comment: item.events });
                    });
                    console.log("Events 소켓입장확인");
                    client.close();
                });
                db.collection('EventsId').find({ groupid: channel }).sort({ data: 1 }).toArray(function (err, doc) {
                    if (err) console.log(err);
                    doc.forEach(function (item) {
                        console.log(item.events.id);
                        socket.emit('receiveEventsId', { comment: item.events.id });
                    });
                    console.log("EventsId 소켓입장확인");
                    client.close();
                });
            }
        });
    });

    socket.on('sendEvents', function (data) {
        console.log('Events 입력소켓')
        console.log('Events data :', data)
        let dataAddinfo = {ip: socket.handshake.address, id: data.id, title: data.title, start:data.start, end: data.end, url: data.url};
        console.log(dataAddinfo)
        MongoClient.connect('mongodb://127.0.0.1:27017/', function (error, client) {
            if (error) console.log(error);
            else {
                const db = client.db(dbName);
                console.log(data.email)
                db.collection('Events').insert(
                    {channel: data.id, $push: {events: {
                                id: data.id, title: data.title, start:data.start, end: data.end, url: data.url
                            }}}, function (err, doc) {
                        if (err) console.log(err);
                        client.close();
                    });
            }
        });
        console.log('receiveEvents : ',data.id, dataAddinfo);
        io.sockets.in(data.id).emit('receiveEvents', {comment: dataAddinfo});
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
