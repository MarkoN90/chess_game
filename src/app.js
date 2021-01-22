import Vue from 'vue';

import Board from './components/Board.vue';
import Field from './components/Field.vue';
import Piece from './components/Piece.vue';
import User  from './components/User.vue';

import Socket from './lib/socket.js';

Vue.config.debug = true; Vue.config.devtools = true;

window.Event = new Vue();



let app = new Vue({
    components: {
          Board, Field, Piece
    },
    el: '#app',
    data: {
        allowedToPlay: true,
        IO : new Socket(),
        challengeModalshow : false,
        actionPeace: null,
        opponent: {
            id: null,
            username: null
        },
        challenger: {
            id: null,
            username: null
        },
        startingField: null,
        game: {
            on: false,
            code: '',
            startedGame: null
        },
        username: '',
        singInLayer: true,
        side: 'null'
    },

    computed: {
        whoIsPlaying() {
            if (this.allowedToPlay) {
                return 'Your move';
            } else {
                return  'Waiting on your opponent';
            }
        },
        opponentName() {
            if (this.game.on ) { return this.opponent.username } else { return  '' }
         }
    },

    methods: {
        acceptChallenge() {
            this.opponent = this.challenger;
            this.challengeModalshow = false;
            this.IO.socket.emit('challengeAccepted', this.opponent);
        },

        addSignedUser(username, socketId) {
            let ComponentClass = Vue.extend(User);
            let instance = new ComponentClass({
                propsData: {
                    name: username,
                    id: socketId
                }
            });
             instance.$mount();
             this.$refs.activePlayers.appendChild(instance.$el);
        },

        startGame() {
            let gameId = Math.round(Math.random() * 100000000);
             socket.emit('startGame', gameId)
        },
        joinGame() {
           let gameCode = prompt('give as a game code please?');
            socket.emit('joiningGame', gameCode);
        },
        move(field) {
            socket.emit('pieceMoved', this.game.code, this.actionPiece.$attrs.id, this.startingField.id, field.$attrs.id);

        },
        singIn() {
            this.singInLayer = false;
            this.IO.socket.emit('singIn', this.username);
        }
    },
    created() {

        this.IO.socket.on('Challenge', (challengerId, username) => {
            this.challenger.id = challengerId;
            this.challenger.username = username;

            this.challengeModalshow = true;

        });

        this.IO.socket.on('newUserConnected', (username, socketId) => {
            this.addSignedUser(username, socketId);
        });

        this.IO.socket.on('movePiece', (pieceId, newField) => {
            let element = document.getElementById(newField);
            element.innerHTML = '';
            element.appendChild(document.getElementById(pieceId));
            this.allowedToPlay = true;
        });

         Event.$on('ChallengeIssued', (id, username) => {
             this.opponent.id = id;
             this.opponent.username = username;
             this.IO.socket.emit('IssueChallenge', id, this.username);
        });

        this.IO.socket.on('startGame', () => {
            this.game.on = true;
            if(this.challenger.id == null) {
            this.side = 'black';
            Event.$emit('turnSides', 'black');
            } else {
            this.side = 'white';
            this.allowedToPlay = true;
           }
         });

        Event.$on('pieceDrop', (field) => {
            field.$el.innerHTML = '';
            field.$el.appendChild(this.actionPeace.$el);

            this.IO.socket.emit('peaceMoved', this.actionPeace.$el.id,  field.$el.id, this.opponent.id);
            this.allowedToPlay = false;

         });

        Event.$on('pieceActivated', (piece, second) => {
            this.actionPeace = piece;
        });

    }

});

