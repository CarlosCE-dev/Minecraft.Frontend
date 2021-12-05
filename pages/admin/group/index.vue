<template>
    <div>
        <div class="ma-2 text-right">
            <v-btn color="primary" depressed @click="newEvent">Crear nuevo evento</v-btn>
        </div>
        <EventListLoader />

        <!-- Modals -->
        <ModalFormEvent v-if="modalFormEvent" @close="modalFormEvent = false"/>
    </div>
</template>

<script>
import EventListLoader from '@/modules/event/components/EventListLoader'
import ModalFormEvent from '@/modules/event/components/ModalFormEvent'

export default {
    components: {
        EventListLoader,
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