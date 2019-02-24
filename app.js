const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

//socketio
const socketIO = require('socket.io');
const server = express()
  .use(app)
  .listen(process.env.PORT || 5000, () => console.log(`Listening Socket on ${ 3000 }`));
const io = socketIO(server);


var exports = module.exports = {};

exports.startApp = function (/**Object*/ client) {

    app.set('view engine', 'ejs');

    app.use('/lib', express.static('lib', { redirect : false }));
    app.use('/styles', express.static('src', { redirect : false }));
    app.use('/scripts', express.static('src', { redirect : false }));
    app.use('/src', express.static('src', { redirect : false }));

    app.use(session({secret: 'ssshhhhh'}));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
	
	app.get("/", (req, res) => {
        res.render("index", {data: client});
    });
	
    // ---- 404 Page
    app.use(function (req, res, next) {
        res.status(404).render("404");
    });

};

exports.play = function () {
	io.sockets.emit('message', /* */);
}
