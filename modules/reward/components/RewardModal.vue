<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
        <v-card :color="`${rarityColor} lighten-1`" dark class="d-flex flex-column align-center">
            <span class="my-4 text-h5">{{ reward.title }} x{{ reward.amount }}</span>
            <div class="d-flex justify-center flex-row">
                <v-card :color="`${rarityColor} lighten-2`" elevation="0" v-if="reward.image" width="300">
                    <v-img :src="reward.image" 
                        :lazy-src="reward.image"
                        max-width="300"
                        max-height="300">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-card>
            </div>
            <span class="my-2 text-h6">{{ rarityName }}</span>
            <div class="d-flex align-self-end ma-1">
                <v-btn fab color="transparent" elevation="0" @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

export default {
    props: {
        reward: {
            type: Object,
            required: true,
        },
    },
    computed: {
        rarityColor() {
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
        rarityName(){
            return getNameOfRarity(this.reward.rarity);
        },
    },
    created() {
        this.dialog = true;
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>