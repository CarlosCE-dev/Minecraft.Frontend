<template>
    <div>
        <div class="ma-2 text-right">
            <v-btn color="primary" depressed @click="newEvent">Crear nuevo evento</v-btn>
        </div>
        <EventList/>

        <!-- Modals -->
        <ModalFormEvent v-if="modalFormEvent" @close="modalFormEvent = false"/>
    </div>
</template>

<script>
import EventList from '@/modules/event/components/EventList'
import ModalFormEvent from '@/modules/event/components/ModalFormEvent'

export default {
    components: {
        EventList,
        ModalFormEvent
    },
    data() {
        return {
            modalFormEvent: false,
        }
    },
    methods: {
        newEvent() {
            this.modalFormEvent = true;
        },
    },
}
</script>