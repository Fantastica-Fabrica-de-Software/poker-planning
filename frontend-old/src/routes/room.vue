<template>
    <div id="room">
        <c-modal :is-open="isOpen" :on-close="closeModal" :closeOnEsc="true" :returnFocusOnClose="true"
            :closeOnOverlayClick="true">
            <c-modal-content ref="content">
                <c-modal-header>Welcome to {{ $route.params.room }}</c-modal-header>
                <c-modal-body>
                    <c-form-control>
                        <c-form-label>Enter your name</c-form-label>
                        <c-input @change="changeName" placeholder="Enter your name" />
                    </c-form-control>
                </c-modal-body>
                <c-modal-footer>
                    <c-button @click="closeModal">Join</c-button>
                </c-modal-footer>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
        <header class="row spread">
            <c-text fontSize="3xl" fontWeight="bold">
                {{ $route.params.room }}
            </c-text>
            <c-box w="300px" d="flex" justify-content="right">
                <c-button @click="openModal" marginX="3">Your Name</c-button>
                <room-settings></room-settings>
            </c-box>
        </header>
        <c-grid template-columns="repeat(2, 1fr)" gap="2">
            <c-grid-item col-span="5" class="table">
                <div class="row">
                    <TableCard v-for="member in membersOnTable" v-bind:key="member.id" v-bind:member="member">
                    </TableCard>
                </div>
            </c-grid-item>
            <c-grid-item col-start="6" col-end="6" marginY="5">
                <ul class="rightFloat">
                    <li v-if="watchers.length > 0">
                        <c-text>
                            <i class="fa fa-eye"></i>{{ ' ' }}{{ watchers.length }}
                            Watching
                        </c-text>
                    </li>
                    <li v-for="member in $store.getters.members.filter(mem => mem.name != '')" :key="member.id">
                        <c-text :class="member.id !== me.id || 'b'">
                            <i class="fa fa-user"></i>
                            <span v-if="member.name">{{ ' ' }}{{ member.name }}</span>
                            <span v-else> Anonymous</span>
                        </c-text>
                    </li>
                </ul>
            </c-grid-item>
        </c-grid>
        <Hand v-if="onTable" />
    </div>
</template>

<script lang='ts'>
import config from '../config'
import Hand from '../components/Hand.vue'
import RoomSettings from '@/components/RoomSettings.vue'
import TableCard from '../components/TableCard.vue'
import { TargetEvent } from '../types'
import {
    CText, CInput, CBox, CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CButton,
    CFormControl,
    CFormLabel,
    CGridItem,
    CGrid
} from "@chakra-ui/vue"
import Vue from 'vue'

export default Vue.extend({
    name: 'room',
    components: {
        Hand,
        TableCard,
        CInput,
        CText,
        RoomSettings,
        CBox,
        CModal,
        CModalOverlay,
        CModalContent,
        CModalHeader,
        CModalFooter,
        CModalBody,
        CButton,
        CFormControl,
        CFormLabel,
        CGridItem,
        CGrid
    },
    data() {
        return {
            isOpen: true,
        }
    },
    created() {
        console.log(config.API_URL)
        const { room } = this.$route.params
        this.$socket.emit('join', room)
    },
    computed: {
        socket() {
            return this.$socket
        },
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
        watchers() {
            return this.$store.getters.members
                .filter(mem => mem.name == '')

        },
        membersOnTable() {
            return this.$store.getters.members
                .filter(mem => mem.card != null)
        },
        onTable() {
            if (this.me == null) {
                return false
            }
            return this.me.name != ''
        }
    },
    methods: {
        changeName(event: TargetEvent) {
            const name = event.target.value
            this.$socket.emit('changeName', name)
        },
        openModal() {
            return this.isOpen = true
        },
        closeModal() {
            if (this.name !== '') {
                return this.isOpen = false
            }
        }
    }
})
</script>

<style scoped>
li {
    list-style-type: none;
    padding-bottom: 2px;
}

.rightFloat {
    padding-left: 0;
    text-align: left;
    width: 180px;
}

.spread {
    margin-left: 5vw;
    justify-content: space-between !important;
}

#room {
    height: 100%;
    width: 100vw;
    padding: 0;
    display: grid;
    grid-template-rows: 64px auto 240px;
}

.table {
    display: grid;
    grid-template-columns: auto 150px;
    text-align: center;
    height: auto;
    width: 80vw;
    margin: 30px auto;
    border-radius: 150px;
    background: radial-gradient(circle, rgba(65,134,65,1) 0%, rgba(74,173,74,1) 35%, rgba(65,134,65,1) 100%);
    border: 15px solid rgb(142,75,75);
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.3);
}
.table>.row {
    margin: auto;
    width: 100%;
}

.row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
}
</style>