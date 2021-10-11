<template>
  <v-app>
    <v-main class="login__background pa-0 ma-0">
        <v-container fluid fill-height>
          <nuxt />
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'auth',
  middleware: 'anonymous',
}
</script>

<style lang="scss" scoped>
.login__background {
    background: linear-gradient(90deg, #EAE8F3 65%, #F4F5F7 35%);
    overflow:hidden;
}
</style>