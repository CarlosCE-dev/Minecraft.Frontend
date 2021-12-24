<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <h2>{{ $t('RewardsAvailable') }}</h2>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="item in items" :key="item.id" cols="3">
             <RewardCard :reward="item" :crudActions="isAdmin" :selectorActive="itemSelectionActive" @edit="editReward"/>
        </v-col>
        <v-skeleton-loader v-if="moreDataToAvailable" v-intersect="loadNextPage" type="list-item@5" />

        <!-- Modals -->
        <ModalFormReward title="EditReward" v-if="modalFormReward" @close="modalFormReward = false"/>
    </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import RewardCard from '@/modules/reward/components/RewardCard'
import ModalFormReward from '@/modules/reward/components/ModalFormReward'

export default {
    props: {
        itemSelectionActive: {
            type: Boolean,
            default: false 
        },
    },
    components: {
        RewardCard,
        ModalFormReward
    },
    data() {
        return {
            modalFormReward: false,
        }
    },
    computed: {
        moreDataToAvailable () {
            return Math.ceil(this.totalCount / this.pageSize) > this.pageLoaded
        },
        ...mapGetters('auth', [
            "isAdmin"
        ]),
        ...mapState('reward', [
            "items",
            "pageSize",
            "totalCount",
            "pageLoaded"
        ])
    },
    methods: {
        async loadNextPage (entries) {
            if (entries[0].isIntersecting && this.moreDataToAvailable) {
                const nextPage = this.pageLoaded + 1;
                const { data } = await this.loadRewards(nextPage);
                this.$store.commit('reward/addData', { data, nextPage });
            }
        },
        async loadRewards(page){
            try {
                const { pages } = await this.$axios.$post(`${process.env.baseUrl}/reward/pages`, { page });
                return { data: pages.data, meta: pages.meta }
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingRewards'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        editReward(reward){
            this.$store.commit('reward/toEdit', reward);
            this.modalFormReward = true;
        }
    },
    async mounted () {
        if (this.items && this.items.length === this.totalCount) return;
        const { data, meta } = await this.loadRewards(1);
        this.$store.commit('reward/init', { data, meta });
    },
}
</script>

<style>

</style>