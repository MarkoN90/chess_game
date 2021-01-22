<template>

    <img class="" :draggable="allowedToMove" @dragstart="pieceMoving($event)" @drop.prevent="placePiece($event)">

</template>

<script>
export default {

    props: ['color', 'type' ],

    data() {
        return {
           color: this.color,
           type: this.type,
           hasBeenMoved: false
          }
        },
    methods: {
        placePiece(e) {
            console.log('droping ' + e.target);
        }, 

        pieceMoving(e) {
            Event.$emit('pieceActivated', this, e.target.parentElement.id);
        },

        turnUpside() {
            this.$el.classList.add('upside');
        }
    },

    mounted() {
 
    },

    computed: {
     allowedToMove() {
         return (this.$root.allowedToPlay && (this.$root.game.on && this.$root.side === this.color ));
     }
    },
     created() {
     console.log(this.$root.allowedToPlay);
     Event.$on('turnPeaces', () => {
           this.turnUpside();
      });

    }

    


}
</script>
