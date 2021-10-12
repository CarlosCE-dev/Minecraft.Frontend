<template>
     <div>

        <div class="d-flex index__botones">
            <v-btn color="purple-light" dark>
                Generar diamante
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
