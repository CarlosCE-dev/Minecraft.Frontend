<template>
    <div>
        <UserRewardList/>
    </div>
</template>

<script>
import UserRewardList from '@/modules/reward/components/UserRewardList'
import ModalFormReward from '@/modules/reward/components/ModalFormReward'

export default {
    components: {
        UserRewardList,
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