<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                        <h2>Premios obtenidos</h2>
                        {{ $t("RewardAvailableInfo") }}
                    </div>
                    <v-btn color="primary" small class="ml-auto" @click="modalHistoryReward = true">Historial</v-btn>
                </div>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="(item, i) in items" :key="i" cols="3">
             <RewardCard :reward="item" :isClaimRewardView="true" @claim="confirmClaim"/>
        </v-col>

        <!-- Modals -->
        <ModalFormReward :title="modalFormTitle" v-if="modalFormReward" @close="modalFormReward = false"/>
        <ModalHistoryReward v-if="modalHistoryReward" @close="modalHistoryReward = false" />
    </v-row>
</template>

<script>
import RewardCard from '@/modules/reward/components/RewardCard'
import ModalFormReward from '@/modules/reward/components/ModalFormReward'
import ModalHistoryReward from "@/modules/reward/components/ModalHistoryReward";

export default {
    components: {
        RewardCard,
        ModalFormReward,
        ModalHistoryReward
    },
    data() {
        return {
            modalHistoryReward: false,
            modalFormReward: false,
            modalFormTitle: "Editar premio",
            items: []
        }
    },
    methods: {
        async loadRewards(){
            try {
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/reward/userRewards`);
                return data;
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingRewards'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        confirmClaim(id){
            this.$dialog.open({
                title: this.$t('Info'),
                message: this.$t('ClaimRewardMessage'),
                resolver: (async (result) => {
                    if (await result) {
                        this.claimPrize(id);
                    }
                }),
            });
        },
        async claimPrize(id) {
            this.$store.commit('ui/loader', true);

            try {
                const payload = { userRewardId: id }
                await new Promise(resolve => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/reward/claim`, payload);

                const snackbar = { color: 'success', timeout: 3000, state: true , text: message, top: true };
                if (status){
                    this.items = this.items.filter(i => i.userRewardId !== id);
                } else {
                    snackbar.color = 'yellow';
                }

                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenDeleteReward'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            };
        },
    },
    async mounted () {
        const data = await this.loadRewards();
        this.items = data.map((r) => {
            r.reward.isClaim = r.is_claim;
            r.reward.userRewardId = r.id;
            return r.reward;
        });
    },
}
</script>

<style>

</style>