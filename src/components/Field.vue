<template>
    <div class="field"  v-bind:style="{ backgroundColor: background}"
         :class="color" @dragover="report($event)" @drop.prevent="pieceDrop($event.target)">
            <slot> </slot>
            <div v-if="allowed" class="allowed"></div>
     </div>
</template>

<script>
    import Rulebook from '../Rulebook.js';
    export default {
        
        props: ['color'],

        data() {
            return {
                color: this.color,
                allowed: false
            }
        },

        computed: {
        background() {
            if(this.allowed) {
            let nodes = this.$el.childNodes;

            let imgNodes = [];

            for (let i = 0; i < nodes.length; i++) {
              if(nodes[i].tagName === 'IMG') {
                 imgNodes.push(nodes[i]);
               }
            }

            if(imgNodes.length > 0)
                {
                if(imgNodes[0].id.charAt(0) !== this.$root.side.charAt(0)) {
                return 'red';
                }
              }
           }
         }
        },


        methods: {

            pieceDrop(peace) {
                console.log('drop!');
                Event.$emit('pieceDrop', this);
            },

            report(event) {

            if(this.allowed) {
                event.preventDefault();
            }

            let id = this.$attrs.id;

             let RuleBook = new Rulebook(this.$root.actionPeace, event.target.id);

             let allowedFields = RuleBook.allowedFields();

             console.log(id, allowedFields);

             if(allowedFields.includes(parseInt(id))) {
             event.preventDefault()
             } else {

             }
            }
        }
    }

</script>
