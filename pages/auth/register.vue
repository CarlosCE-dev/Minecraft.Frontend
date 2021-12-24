<template>
  <div class="d-flex flex-row login__flex align-center justify-center">
    <LoginCard/>
  </div>
</template>

<script>
import LoginCard from '@/modules/auth/components/login_card.vue'

export default {
    components: {
        LoginCard,
    },
    layout: 'auth',
    head() {
        return {
            title: this.$t("Register")
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.title)
    },
    layout: 'auth',
}
</script>

<style lang="scss" scoped>
   .login__flex {
     width: 100%;
     height: 100%;
   }
</style>