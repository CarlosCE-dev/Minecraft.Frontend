<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <h2>Eventos</h2>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="12">
            <EventCard :event="item" :crudActions="isAdmin" @edit="editGroup"/>
        </v-col>
        <v-skeleton-loader v-if="moreDataToAvailable" v-intersect="loadNextPage" type="list-item@5" />

        <!-- Modals -->
        <ModalFormEvent :title="modalFormTitle" v-if="modalFormEvent" @close="modalFormEvent = false"/>
    </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// Components
import EventCard from '@/modules/event/components/EventCard'
import ModalFormEvent from '@/modules/event/components/ModalFormEvent'

export default {
    components: {
        EventCard,
        ModalFormEvent
    },
    data() {
        return {
            modalFormEvent: false,
            modalFormTitle: "Editar evento"
        }
    },
    computed: {
        moreDataToAvailable () {
            return Math.ceil(this.totalCount / this.pageSize) > this.pageLoaded
        },
        ...mapState('group', [
            "items",
            "pageSize",
            "totalCount",
            "pageLoaded"
        ]),
        ...mapGetters('auth', [
            "isAdmin"
        ]),
    },
    methods: {
        async loadNextPage (entries) {
            if (entries[0].isIntersecting && this.moreDataToAvailable) {
                const nextPage = this.pageLoaded + 1;
                const { data } = await this.loadEvents(nextPage);
                this.$store.commit('group/addData', { data, nextPage });
            }
        },
        async loadEvents(page){
            try {
                const { pages } = await this.$axios.$post(`${process.env.baseUrl}/group/pages`, { page });
                return { data: pages.data, meta: pages.meta }
            } catch (error) {
                const snackbar = { color: 'green', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingEvents'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        editGroup(group){
            this.$store.commit('group/toEdit', group);
            this.modalFormEvent = true;
        }
    },
    async mounted () {
        if (this.items && this.items.length === this.totalCount) return;
        const { data, meta } = await this.loadEvents(1);
        this.$store.commit('group/init', { data, meta });
    },
}
</script>

<style>

</style>