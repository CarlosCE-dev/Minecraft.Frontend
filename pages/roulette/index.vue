<template>
    <div>
        <RouletteList />
    </div>
</template>

<script>
import RouletteList from '@/modules/roulette/components/RouletteList'

export default {
    components: {
        RouletteList,
    },
    head() {
        return {
            title: this.$t("Roulette")
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title);
    },
}
</script>
