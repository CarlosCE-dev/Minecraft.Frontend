<template>
    <div class="d-flex flex-column align-center justify-center animate__animated animate__zoomIn aminate__faster">
        <span class="my-4 text-h5">{{ reward.title }} {{ rewardAmount }}</span>
        <div class="d-flex justify-center flex-row">
            <v-card :color="`${rarityColor}`" 
                elevation="0" 
                v-if="reward.image" 
                width="350" 
                height="350" 
                class="d-flex align-center justify-center flex-column">
                <v-img :src="reward.image" 
                    :lazy-src="reward.image"
                    width="300">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <span class="my-2 text-h6 white--text">{{ rarityName }}</span>
            </v-card>
        </div>
        <span class="my-2 caption d-flex align-center card__description" v-if="reward.description && reward.description !== ''">
            <v-icon left color="info">mdi-alert-circle-outline</v-icon>
            {{ reward.description }}
        </span>
        <div class="d-flex h-4 ">
            {{ $t('MoneyGainByReward', { money: reward.money }) }}
        </div>
    </div>
</template>

<script>
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

export default {
    props: {
        reward: {
            type: Object,
            required: true
        },
    },
    computed: {
        rarityColor() {
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
        rarityName(){
            return getNameOfRarity(this.reward.rarity);
        },
        rewardAmount(){
            return this.reward.amount > 1 ? `x${this.reward.amount}` : ""
        }
    },
}
</script>

<style lang="scss" scoped>
.card__description {
   width:80%;
}
</style>