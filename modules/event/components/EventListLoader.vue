<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <h2>{{ $t("Events") }}</h2>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="12">
            <EventCard class="animate__animated animate__fadeIn animate__fast" 
                :event="item" 
                :crudActions="isAdmin" 
                @edit="editGroup" 
                @details="showDetailsModal"/>
        </v-col>
        <v-skeleton-loader v-if="moreDataToAvailable" v-intersect="loadNextPage" type="list-item@5" />

        <!-- Modals -->
        <ModalFormEvent title="EditEvent" v-if="modalFormEvent" @close="modalFormEvent = false"/>
        <ModalEventDetails v-if="modalEventDetail" @close="modalEventDetail = false"/>
    </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// Components
import EventCard from '@/modules/event/components/EventCard'
import ModalFormEvent from '@/modules/event/components/ModalFormEvent'
import ModalEventDetails from '@/modules/event/components/ModalEventDetails'

export default {
    components: {
        EventCard,
        ModalFormEvent,
        ModalEventDetails
    },
    data() {
        return {
            modalFormEvent: false,
            modalEventDetail: false
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
            "pageLoaded",
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
        },
        showDetailsModal(id){
            this.$store.commit('reward/setDetailEvent', id);
            this.modalEventDetail = true;
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