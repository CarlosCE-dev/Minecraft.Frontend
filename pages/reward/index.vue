<template>
    <div>
        <UserRewardList/>
    </div>
</template>

<script>
import UserRewardList from '@/modules/reward/components/UserRewardList'

export default {
    components: {
        UserRewardList,
    },
    head() {
        return {
            title: this.$t("Rewards")
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title)
    },
}
</script>