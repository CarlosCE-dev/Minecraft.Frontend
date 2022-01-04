<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                        <h2>{{ $t('RewardsObtain') }}</h2>
                        {{ $t("RewardAvailableInfo") }}
                    </div>
                    <v-btn color="primary" small class="ml-auto" @click="modalHistoryReward = true">{{$t('History')}}</v-btn>
                </div>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="(item, i) in items" :key="i" cols="4">
             <RewardCard :reward="item" :isClaimRewardView="true" @claim="confirmClaim" @gift="showGiftModal"/>
        </v-col>

        <!-- Modals -->
        <ModalHistoryReward v-if="modalHistoryReward" @close="modalHistoryReward = false" />
        <ModalSelectUser v-if="modalSelectUser" 
            :id="userRewardId" 
            @close="modalSelectUser = false"
            @gift="confirmGift" />
    </v-row>
</template>

<script>

// Helpers
import { getAmountByGift } from '@/modules/shared/helpers/rarityTypeHelper';

// Components
import RewardCard from '@/modules/reward/components/RewardCard'
import ModalHistoryReward from "@/modules/reward/components/ModalHistoryReward";
import ModalSelectUser from "@/modules/reward/components/ModalSelectUser";

export default {
    components: {
        RewardCard,
        ModalHistoryReward,
        ModalSelectUser
    },
    data() {
        return {
            modalHistoryReward: false,
            modalSelectUser: false,
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
        showGiftModal(userRewardId){
            this.userRewardId = userRewardId;
            this.modalSelectUser = true;
        },
        confirmGift(giftUser){
            const reward = this.items.find(i => i.userRewardId === this.userRewardId);
            const amount = getAmountByGift(reward.rarity);
            this.modalSelectUser = false;
            this.$dialog.open({
                title: this.$t('Info'),
                message: `Quieres regalar ${reward.title} al usuario ${giftUser.minecraft_username}? Costo por enviar el regalo: ${amount}`,
                resolver: (async (result) => {
                    if (await result) {
                        this.claimPrize(this.userRewardId, giftUser.id);
                    }
                }),
            });
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
        async claimPrize(id, giftUser = null) {
            this.$store.commit('ui/loader', true);

            try {
                const payload = { userRewardId: id };
                if (giftUser){
                    payload.userGiftId = giftUser;
                }
                await new Promise(resolve => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/reward/claim`, payload);

                const snackbar = { color: 'success', timeout: 3000, state: true , text: message, top: true };
                if (status){
                    this.items = this.items.filter(i => i.userRewardId !== id);
                } else {
                    snackbar.color = 'orange';
                }

                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenUserRewards'), top: true };
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