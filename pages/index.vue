<template>
     <div>

         <Commands/>
         <DailyRewards/>
        
    </div>
</template>

<script>
import Commands from '@/modules/dashboard/components/commands.vue'
import DailyRewards from '@/modules/dashboard/components/daily_rewards.vue'

export default {
    head() {
        return {
            title: "Home",
        }
    },
    components: {
        Commands,
        DailyRewards
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.title)
    },
}
</script>

<style lang="scss" scoped>
.index__botones button {
  margin:10px;
}
</style>
