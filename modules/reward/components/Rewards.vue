<template>
 <v-slide-group v-model="model" class="pa-4" show-arrows>
            <v-slide-item v-for="n in 15" :key="n">
                <RewardCard/>
            </v-slide-item>
        </v-slide-group>
</template>

<script>
import RewardCard from '@/modules/reward/components/RewardCard'

export default {
    components: {
        RewardCard,
    },
    data() {
        return {
            model: null
        }
    },
}
</script>

<style>

</style>