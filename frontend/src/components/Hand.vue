<template>
    <div class="handContainer">
        <div class="handBts">
            <c-button @click="pickUp">Remove card</c-button>
            <c-button @click="flipAll">Show cards</c-button>
            <c-button @click="clearTable">New table</c-button>
        </div>
        <div class="hand">
            <Card v-for="(card, index) in $store.getters.deck" v-bind:key="index" v-bind:value="card"
                v-bind:active="index != me.card" @click.native="pickCard(index)"></Card>
        </div>
    </div>
</template>
<script>
import Card from './Card.vue';
import { CButton } from "@chakra-ui/vue"

export default {
    name: 'Hand',
    components: {
        Card,
        CButton
    },
    computed: {
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
    },
    methods: {
        pickCard(index) {
            this.$socket.emit('pickCard', index)
        },
        pickUp() {
            this.$socket.emit('pickCard', null)
        },
        flipCard() {
            this.$socket.emit('flipCard')
        },
        flipAll() {
            this.$socket.emit('flipAll')
        },
        clearTable() {
            this.$socket.emit('clearTable')
        },
    }
}
</script>
<style scoped>
.handContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.handBts {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    padding: 0px 30vw;
}

.hand {
    display: flex;
    justify-content: space-evenly;
    padding: 0px 20vw;
    transition-duration: 1s;
}

.card {
    transition-duration: 0.3s;
}

.card.active {
    background-color: #fa6800 !important;
}

.card:hover {
    transition-duration: 0.3s;
    transform: translate(0, -15px);
    cursor: pointer;
    background-color: #fa6800 !important;
}

.active {
    transform: translate(0, -15px);
}

.active::before {
    content: '';
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 10px;
    width: calc(100% - 6px);
    height: 10px;
}
</style>