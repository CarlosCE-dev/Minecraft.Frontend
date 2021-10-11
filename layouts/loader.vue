<template>
  <v-app id="inspire">
    <v-main class="main">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <nuxt/>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "loader"
}
</script>
<style lang="scss" scoped>
.main{
  background: $light-grey;
}
</style>