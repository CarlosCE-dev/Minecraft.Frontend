<template>
    <div>
        <EventStatus />
        <RewardList :itemSelectionActive="true"/>
    </div>
</template>

<script>
// Components
import EventStatus from '@/modules/event/components/EventStatus'
import RewardList from '@/modules/reward/components/RewardList';

export default {
    components: {
        EventStatus,
        RewardList
    },
    data() {
        return {
            modalRewardSelector: false
        }
    },
    methods: {
        addReward() {
            this.modalRewardSelector = true;
        }
    },
    async mounted () {
        this.$store.commit('reward/itemSelected', []);
        try {
            const { data } = await this.$axios.$post(`${process.env.baseUrl}/group/rewardIds`, { groupId: this.$route.params.id });
            this.$store.commit('reward/itemSelected', data);
        } catch (error) {
            const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenLoadingRewardsSelected'), top: true };
            this.$store.commit('ui/snackbar', snackbar);
        };
    },
}
</script>
