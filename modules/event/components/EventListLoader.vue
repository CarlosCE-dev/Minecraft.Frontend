<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <h2>Eventos</h2>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="3">
             <EventList :event="item"/>
        </v-col>
        <v-skeleton-loader v-if="moreDataToAvailable" v-intersect="loadNextPage" type="list-item@5" />

        <!-- Modals -->
        <ModalFormEvent v-if="modalFormEvent" @close="modalFormEvent = false"/>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'

// Components
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
    computed: {
        moreDataToAvailable () {
            return Math.ceil(this.totalCount / this.pageSize) > this.pageLoaded
        },
        ...mapState('event', [
            "items",
            "pageSize",
            "totalCount",
            "pageLoaded"
        ])
    },
    methods: {
        async loadNextPage (entries) {
            if (entries[0].isIntersecting && this.moreDataToAvailable) {
                const nextPage = this.pageLoaded + 1;
                const { data } = await this.loadEvents(nextPage);
                this.$store.commit('event/addData', { data, nextPage });
            }
        },
        async loadEvents(page){
            try {
                const { pages } = await this.$axios.$post(`${process.env.baseUrl}/event/pages`, { page });
                return { data: pages.data, meta: pages.meta }
            } catch (error) {
                const snackbar = { color: 'green', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingEvents'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        editReward(reward){
            this.$store.commit('event/toEdit', reward);
            this.modalFormReward = true;
        }
    },
    async mounted () {
        const { data, meta } = await this.loadEvents(1);
        this.$store.commit('event/init', { data, meta });
    },
}
</script>

<style>

</style>