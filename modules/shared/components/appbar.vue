<template>
    <div>
        <v-app-bar color="transparent" flat light fixed app>
           
            <v-toolbar-title class="title">{{$store.state.window.pageTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <AppbarMenu/>  

        </v-app-bar>
    </div>
</template>

<script>
import AppbarMenu from '@/modules/shared/components/appbar_menu.vue'

export default {
    data: () => ({
        icon: false,
    }),
    components: {
        AppbarMenu
    },
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