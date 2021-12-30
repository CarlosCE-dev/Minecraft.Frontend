<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <div>
                    <h2>{{ $t("EventsAvailable") }}</h2>
                    <span>{{ $t("EventAvailableInfo") }}</span>
                </div>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="12">
            <EventCard class="animate__animated animate__fadeIn animate__fast" :event="item" @randomReward="getRandomReward" @details="showDetailsModal"/>
        </v-col>

        <!-- Modals -->
        <ModalEventDetails v-if="modalEventDetail" @close="modalEventDetail = false"/>
        <RewardModal :eventId="rewardModalEventId" 
            v-if="rewardModalState" 
            @close="rewardModalState = false"
            @remove="removeEvent"
        />
    </v-row>
</template>

<script>
import EventCard from '@/modules/event/components/EventCard'
import RewardModal from '@/modules/reward/components/RewardModal'
import ModalEventDetails from '@/modules/event/components/ModalEventDetails'


export default {
    components: {
        EventCard,
        RewardModal,
        ModalEventDetails
    },
    data() {
        return {
            items: [],
            rewardModalState: false,
            rewardModalEventId: null,
            modalEventDetail: false
        }
    },
    methods: {
        async loadEvents(){
            try {
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/group/getEvents`);
                this.items = data.map(d => {
                    return {
                        ...d.event,
                        not_available: d.notAvailable,
                        event_finish: d.eventFinished
                    }
                });
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingEvents'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        async getRandomReward(event){
            this.rewardModalState = true;
            this.rewardModalEventId = event.id;
        },
        removeEvent(id){
            this.items = this.items.map((i) => {
                if (i.id === id){
                    i.not_available = true;
                }
                return i;
            });
        },
        showDetailsModal(id){
            this.$store.commit('reward/setDetailEvent', id);
            this.modalEventDetail = true;
        }
    },
    created () {
        this.loadEvents();
    },
}
</script>