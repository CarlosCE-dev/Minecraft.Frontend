<template>
    <div class="ma-0 pa-0 pb-1">
        <v-bottom-navigation :value="value" background-color="green-primary" dark class="elevation-0 rounded">
            <v-btn :to="{ name: 'admin-reward' }">
                <span>{{ $t("Rewards") }}</span>
                <v-icon>mdi-gift</v-icon>
            </v-btn>
            <v-btn :to="{ name: 'admin-group' }">
                <span>{{ $t("Events") }}</span>
                <v-icon>mdi-calendar-range</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <nuxt-child />
    </div>
</template>

<script>
export default {
    middleware: 'admin',
    head() {
        return {
            title: this.$t("Admin"),
        }
    },
    data() {
        return {
            value: 0
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title)
    },
}
</script>

<style scoped>
.content {
    width: 100%!important;
    background: white;
}
</style>