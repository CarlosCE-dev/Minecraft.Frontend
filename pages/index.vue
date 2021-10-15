<template>
     <div>

         <commands/>
        
    </div>
</template>

<script>
import Commands from '@/modules/dashboard/components/commands.vue'

export default {
    head() {
        return {
            title: "Home",
        }
    },
    components: {
        Commands,
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
