const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, 'dist');
const port = process.env.PORT || 3000;

let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

let games = new Map();

io.on('connection', (socket) => {

    socket.on('singIn', (username) => {
        socket.broadcast.emit('newUserConnected', username, socket.id);
    });

    socket.on('IssueChallenge', (id, username) => {
        io.to(id).emit('Challenge', socket.id, username);
    });

    socket.on('challengeAccepted', (user) => {
        io.to(user.id).emit('startGame');
        io.to(socket.id).emit('startGame');
    });

    socket.on('peaceMoved', (pieceId, newField, OpponentId) => {
        console.log(pieceId, newField, OpponentId);
        io.to(OpponentId).emit('movePiece', pieceId, newField);
    });

    socket.emit('user-connect');
        socket.on('startGame', (gameId) => {
        socket.join(gameId);
        games.set(gameId, {gameStartedBy: socket.id});
    });


    socket.on('joiningGame', (code) => {
        code = parseInt(code);
        if(games.has(code)) {
          let game = games.get(code);
          game.joinedBy = socket.id;
          socket.join(code);
          io.in(code).emit('gameOn', code, false);

        } else {
            console.log('game not found');
        }
    })

    socket.on('pieceMoved', (gameId, pieceId, startingField, moveTo) => {
        console.log('server is recived a move and emited it..');
        console.log(gameId, pieceId, startingField, moveTo);

            io.in(gameId).emit('movePiece', pieceId, startingField, moveTo)
    });

  });

server.listen(port, () => {
    console.log('server is up on ' + port);
  })