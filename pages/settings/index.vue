<template>
    <div>
        <ChangePassword />
    </div>
</template>

<script>
import ChangePassword from '@/modules/settings/components/ChangePassword'

export default {
    components: {
        ChangePassword,
    },
    head() {
        return {
            title: this.$t("Settings"),
        }
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title)
    },
}
</script>