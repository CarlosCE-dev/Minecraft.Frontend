<template>
    <div>
        <EventList />
    </div>
</template>

<script>
import EventList from '@/modules/event/components/EventList'

export default {
    head() {
        return {
            title: "Events",
        }
    },
    components: {
        EventList,
    },
    mounted () {
        this.$store.commit('window/setPageTitle', this.$metaInfo.title);
        this.$store.commit('reward/setClaimPage', true);

    },
}
</script>
