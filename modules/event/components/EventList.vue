<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <h2>Eventos disponibles</h2>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="12">
             <EventCard :event="item" @randomReward="getRandomReward"/>
        </v-col>
        <RewardModal :reward="rewardModal" v-if="rewardModalState" @close="rewardModalState = false"/>
    </v-row>
</template>

<script>
import EventCard from '@/modules/event/components/EventCard'
import RewardModal from '@/modules/reward/components/RewardModal'

export default {
    components: {
        EventCard,
        RewardModal,
    },
    data() {
        return {
            items: [],
            rewardModalState: false,
            rewardModal: null
        }
    },
    methods: {
        async loadEvents(){
            try {
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/group/getEvents`);
                this.items = data.map(d => {
                    return {
                        ...d.event,
                        not_available: d.notAvailable
                    }
                });
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingEvents'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        async getRandomReward(event){
            this.$store.commit("ui/loader", true);

            try {
                const payload = { 
                    groupId: event.id, 
                };
                await new Promise((resolve) => setTimeout(resolve, 300));
                const { status, message, data } = await this.$axios.$post(`${process.env.baseUrl}/reward/getRandomReward`, payload);

                const snackbar = { color: "success", timeout: 3000, state: true, text: message, top: true };
                if (status) {
                    this.$store.commit("group/disableClaim");
                } else {
                    snackbar.color = "orange";
                    this.$store.commit("ui/snackbar", snackbar);
                }

                this.$store.commit("ui/loader", false);

                if (status){
                    this.rewardModal = data;
                    this.rewardModalState = true;

                    this.items = this.items.map((i) => {
                        if (i.id === event.id){
                            i.not_available = true;
                        }
                        return i;
                    })
                }
            } catch (error) {
                const snackbar = { color: "red", timeout: 3000, state: true, text: this.$t("ErrorWhenDeleteEvent"), top: true };
                this.$store.commit("ui/loader", false);
                this.$store.commit("ui/snackbar", snackbar);
            } 
        }
    },
    created () {
        this.loadEvents();
    },
}
</script>