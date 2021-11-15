<template>
    <div>
        <div class="ma-2 text-right">
            <v-btn color="primary" depressed @click="newReward">Crear nuevo premio</v-btn>
        </div>
        <RewardList/>

        <!-- Modals -->
        <ModalFormReward v-if="modalFormReward" @close="modalFormReward = false"/>
    </div>
</template>

<script>
import RewardList from '@/modules/reward/components/RewardList'
import ModalFormReward from '@/modules/reward/components/ModalFormReward'

export default {
    components: {
        RewardList,
        ModalFormReward
    },
    data() {
        return {
            modalFormReward: false,
        }
    },
    methods: {
        newReward() {
            this.modalFormReward = true;
        },
    },
}
</script>

<style>

</style>