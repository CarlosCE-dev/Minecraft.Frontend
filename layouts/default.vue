<template>
  <v-app class="content">

    <Sidebar class="sidebar" v-model="drawer" :fixed="fixed"/>

    <Appbar class="appbar" @action="drawerController"/>
     
    <v-main class="mx-md-4 mx-2 pb-4 content">
        <nuxt/>
    </v-main>

    <ModalSnackbar v-if="modalSnackbar.state" v-model="modalSnackbar.state" :snackbar="modalSnackbar"/>
    <!-- <ModalConfirm v-model="modalConfirm.state" :snackbar="modalConfirm"/> -->
    <ModalLoader v-if="loader" v-model="loader"/>
    <ModalAlert v-if="modalAlert.state" :alert="modalAlert" @close="modalAlert.state = false"/>
    <ModalConfirm/>

  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import Appbar from '@/modules/shared/components/appbar.vue'
import Sidebar from '@/modules/shared/components/sidebar.vue'
import ModalLoader from '@/modules/shared/components/ModalLoader.vue'
import ModalSnackbar from '@/modules/shared/components/ModalSnackbar.vue'
import ModalAlert from '~/modules/shared/components/ModalAlert.vue'
import ModalConfirm from '~/modules/shared/components/ModalConfirm.vue'

// Helpers
import { orientationType } from '@/modules/shared/helpers/orientation';

export default {
    middleware: 'authenticated',
    components: {
        Appbar,
        Sidebar,
        ModalLoader,
        ModalSnackbar,
        ModalAlert,
        ModalConfirm
    },
    data() {
        return {
            mobil: false,
            drawer: true,
            fixed: true,
            modalSnackbar: { color: 'orange', timeout: 3000, state: false , text: 'Porfavor de rellenar todos los campos requeridos', top: true },
            modalAlert: { state: false, title: "", message: "" }
        }
    },
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
    computed: {
        ...mapGetters("ui", [
            "getLoader",
            "getSnackbar",
            "getAlert"
        ]),
        loader(){
            return this.getLoader
        }, 
        snackbar(){
            return this.getSnackbar
        },
        alert(){
            return this.getAlert
        }
    },
    watch: {
        snackbar( sb ){
            this.modalSnackbar = { color: sb.color, timeout: sb.timeout, state: sb.state, text: sb.text , top: sb.top };
        },
        alert( a ){
            this.modalAlert = { state: a.state, title: a.title, message: a.message };
        },
    },
}

</script>

<style lang="scss" scoped>
.content{
    background: whitesmoke
}
</style>