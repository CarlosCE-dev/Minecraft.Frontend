<template>
    <v-row no-gutters class="mt-4">
        <v-col v-for="item in items" :key="item.id" cols="4">
             <RewardCard :reward="item" />
        </v-col>
        <v-skeleton-loader v-if="moreDataToAvailable" v-intersect="loadNextPage" type="list-item@5" />
    </v-row>
</template>

<script>
import RewardCard from '@/modules/reward/components/RewardCard'

export default {
    components: {
        RewardCard,
    },
    data() {
        return {
            pageSize: 25,
            pageLoaded: 0,
            items: [],
            totalCount: 0,
        }
    },
    computed: {
        moreDataToAvailable () {
            return Math.ceil(this.totalCount / this.pageSize) > this.pageLoaded
        }
    },
    methods: {
        async loadNextPage (entries) {
            if (entries[0].isIntersecting && this.moreDataToAvailable) {
                const nextPage = this.pageLoaded + 1;
                const { data } = await this.loadRewards(nextPage);
                this.items = [...this.items, ...data];
                this.pageLoaded = nextPage;
            }
        },
        async loadRewards(page){
            try {
                const { status, pages } = await this.$axios.$post(`${process.env.baseUrl}/reward/pages`, { page });
                if ( status ) {
                    return { data: pages.data, meta: pages.meta }
                } else {
                    //TODO: Add snackbar
                }
            } catch (error) {
                //TODO: Add snackbar
            }
        }
    },
    async mounted () {
        const { data, meta } = await this.loadRewards(1);
        this.pageLoaded = 1;
        this.totalCount = meta.total;
        this.items = data;
    },
}
</script>

<style>

</style>