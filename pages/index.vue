<template>
     <div>

        <h3> Botones con roles </h3>
        
        <div class="d-flex index__botones">
            <v-btn color="purple-light" :disabled="!role.canAdd">
                Can Add
            </v-btn>

            <v-btn color="purple-light" :disabled="!role.canDelete">
                Can Delete
            </v-btn>

            <v-btn color="purple-light" :disabled="!role.canEdit">
                Can Edit
            </v-btn>

            <v-btn color="purple-light" :disabled="!role.canView">
                Can View
            </v-btn>
        </div>

        <h3> Paginas </h3>

        <div class="d-flex">
        
            <v-btn class="ma-2" @click="logOut">
                Log off
            </v-btn>

        </div>
        
    </div>
</template>

<script>

export default {
    head() {
        return {
            title: "Home",
        }
    },
    computed: {
        role() {
            return this.$store.state.auth.role
        }
    },
    methods: {
        logOut() {
            localStorage.clear();
            this.$store.commit('auth/setAuth', false );
            this.$router.push({ path: "/auth/login" });
        }
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
