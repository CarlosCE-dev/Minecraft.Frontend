<script>
export default {
    middleware: 'redirect',
    head() {
        return {
            title: "Home",
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title)
    },
}
</script>
