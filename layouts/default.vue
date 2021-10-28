<template>
  <v-app class="content">

    <Sidebar class="sidebar" v-model="drawer" :fixed="fixed"/>

    <Appbar class="appbar" @action="drawerController"/>
     
    <v-main class="mx-md-4 mx-2 pb-4 content">
        <nuxt/>
    </v-main>

  </v-app>
</template>

<script>
import Appbar from '@/modules/shared/components/appbar.vue'
import Sidebar from '@/modules/shared/components/sidebar.vue'

// Helpers
import { orientationType } from '@/modules/shared/helpers/orientation';

export default {
    middleware: 'authenticated',
    components: {
        Appbar,
        Sidebar
    },
    data: () => ({
        mobil: false,
        drawer: true,
        fixed: true,
        modal_snackbar: { color: 'orange', timeout: 3000, state: false , text: 'Porfavor de rellenar todos los campos requeridos', top: true }
    }),
    beforeMount () {
        this.mobil = orientationType();
        this.$store.commit('window/isMobil', this.mobil); 

        if (this.mobil) {
            this.drawer = false;
        }
    },
    methods: {
        drawerController() {
            this.drawer = !this.drawer;
        }
    },
}

</script>

<style lang="scss" scoped>
.content{
    background: whitesmoke
}
</style>