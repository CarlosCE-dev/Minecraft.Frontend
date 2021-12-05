<template>
    <div class="content ma-0 pa-0 pb-1">
        <v-bottom-navigation :value="value" background-color="green" horizontal dark class="elevation-0">
            <v-btn :to="{ name: 'admin-reward' }">
                <span>Rewards</span>
                <v-icon>mdi-gift</v-icon>
            </v-btn>

            <v-btn :to="{ name: 'admin-group' }">
                <span>Events</span>
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
            title: "Admin",
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