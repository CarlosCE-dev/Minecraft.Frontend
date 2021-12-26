<template>
  <div class="d-flex align-center justify-center flex-column">
      <h1 class="text-h1" v-if="error.statusCode">
        {{ error.statusCode }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <v-btn to="/event" text>
        <v-icon left color="primary">mdi-home</v-icon>
        {{ $t('BackHome') }}
      </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  mounted () {
      this.$store.commit('window/setPageTitle', this.$metaInfo.title)
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
