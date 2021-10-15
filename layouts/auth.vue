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
    background: linear-gradient(90deg, #f2fdf2 65%, #b8ebcd 35%);
    overflow:hidden;
}
</style>