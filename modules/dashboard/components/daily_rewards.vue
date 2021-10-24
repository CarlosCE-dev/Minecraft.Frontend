<template>
    <div class="d-flex my-4 ml-1">
         <v-avatar @click="claimReward" size="150" >
            <img src="~/assets/images/gift.png" alt="prize" class="prize">
        </v-avatar>

        <LoaderModal v-if="showLoaderModal" @close="showLoaderModal = false"/>
    </div>
</template>

<script>
import LoaderModal from '@/modules/dashboard/components/daily/loader_modal.vue'

export default {
    components: {
        LoaderModal,
    },
    data() {
        return {
            showLoaderModal: false
        }
    },
    methods: {
        claimReward() {
            console.log("Click")
            this.showLoaderModal = !this.showLoaderModal
        }
    },
}
</script>

<style lang="scss" scoped>
.prize {
    cursor: pointer
}
</style>
