<script>
export default {
    middleware: 'redirect',
    head() {
        return {
            title: this.$t("Shop"),
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title)
    },
}
</script>
