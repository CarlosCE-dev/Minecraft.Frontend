<template>
    <div>
        <v-app-bar flat light fixed app>
            <v-toolbar-title class="title">{{$store.state.window.pageTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({
        icon: false,
    }),
    methods: {
        action() {
            this.$emit('action')
        }
    },
    created(){
        this.icon = this.$store.state.window.mobil
    }
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 1.8rem !important;
    font-weight: 800;
    color: $primary;
}
</style>