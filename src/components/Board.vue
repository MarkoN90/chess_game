<template>
    <div>
        <div class="board">
            <slot> </slot>
        </div>
     </div>


</template>

<script>
     import Rulebook from "../Rulebook";

        export default {
            data() {
                return {
                    message: 'test'
                }
            },
            methods: {
             kingSafety(activatedPiece) {

             let fieldsOfBoard = this.$children;
             let allPieces = [];

             fieldsOfBoard.forEach(f => {
                 if(f.$children.length > 0) {
                      if(f.$children[0].color !== this.$root.side && f.$children[0].type === 'queen') {
                     allPieces.push(f.$children[0])
                     }
                 }
             });

             let idsOfAllowedFields = [];

             allPieces.forEach( piece  => {

                 let rb = new Rulebook(piece, piece.$el.parentElement.id, activatedPiece);
                 let allowedFields = rb.allowedFields();
                 idsOfAllowedFields = idsOfAllowedFields.concat(allowedFields);
              });

             return [...new Set(idsOfAllowedFields)];
             }

            },
            created() {
                Event.$on('pieceActivated', (piece, startingFieldId) => {
                    let RuleBook = new Rulebook(piece, startingFieldId);

                    // find the king

                    let kingsId = this.$root.side.charAt(0) + 'k';
                    let king = document.getElementById(kingsId);
                    let kingsField = king.parentElement.id;

                    let fieldsForbidenForKing = this.kingSafety(piece);
                     this.$children.forEach((field) => {
                        if (fieldsForbidenForKing.includes(field.$attrs.id)) { field.allowed = true; }
                    })

                    this.$children.forEach((field) => {
                        if (fieldsForbidenForKing.includes(parseInt(kingsField))) { field.allowed = true; }
                    })

                    let allowedFields = RuleBook.allowedFields();

                    if(fieldsForbidenForKing.includes(parseInt(kingsField))) {

                      fieldsForbidenForKing = [];
                      return;
                    }

                    this.$children.forEach((field) => {
                        if (allowedFields.includes(parseInt(field.$attrs.id))) { field.allowed = true; }
                    })

                    this.$children.forEach((field) => {
                        if (fieldsForbidenForKing.includes(parseInt(field.$attrs.id))) { field.allowed = true; }
                    })


                    if (piece.type === 'king') {
                    let kingAllowedFields =  allowedFields.filter(x => !fieldsForbidenForKing.includes(x));

                    this.$children.forEach((field) => {
                        if (kingAllowedFields.includes(parseInt(field.$attrs.id))) { field.allowed = true; }
                      });
                    return;
                    }

                  if(fieldsForbidenForKing.includes(parseInt(kingsField))) {
                  return;
                  } else {
                  console.log(fieldsForbidenForKing, kingsField);
                  console.log('nope doesnt work');
                  }

                    this.$children.forEach((field) => {
                        if (allowedFields.includes(parseInt(field.$attrs.id))) { field.allowed = true; }
                    })
                });


                // turn sides when game starts
                Event.$on('turnSides', (side) => {
                    this.$el.classList.add('upside');
                    Event.$emit('turnPeaces');
                });

                Event.$on('pieceDrop', (field) => {
                    this.$children.forEach((field) => {
                        field.allowed = false;
                    });
                });

               },

             mounted()
                 {
                  console.log('board mounted');
                 }
        }


</script>

 