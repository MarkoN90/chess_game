<template>
    <div class="user container p-2" @mouseenter="showChalengeBtn = true" @mouseleave="showChalengeBtn = false">
        <div class="columns">
          <div class="column has-text-left">{{ name }}</div>
          <div class="column has-text-right"> <button class="button is-primary is-small" v-show="showChalengeBtn" @click="issueChallenge()">Izazovi</button></div>
        </div>
    </div>
  
</template>


<script>
export default {

    props: ['name', 'id'],

    data() {
        return {
            showChalengeBtn: false
        }
    },
    methods: {
        issueChallenge() {
            Event.$emit('ChallengeIssued', this.id, this.name);
        }
    }
}
</script>


