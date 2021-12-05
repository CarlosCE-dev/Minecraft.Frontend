<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <h2>Eventos disponbiles</h2>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="12">
             <EventCard :event="item"/>
        </v-col>
    </v-row>
</template>

<script>
import EventCard from '@/modules/event/components/EventCard'

export default {
    components: {
        EventCard,
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        async loadEvents(){
            try {
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/group/getEvents`);
                this.items = data;
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingEvents'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
    },
    created () {
        this.loadEvents();
    },
}
</script>