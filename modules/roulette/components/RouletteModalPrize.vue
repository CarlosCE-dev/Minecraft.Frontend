<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="300">
            <v-card>
                <v-card-title class="text-h5">
                    Has ganado:
                </v-card-title>
                <v-card-text class="black--text">
                    <h4>
                       {{ reward.title }} 
                        <v-badge v-if="reward.amount > 1" 
                            class="ml-1"
                            :color="`${rarityColor} lighten-1`" 
                            :content="`x${reward.amount}`">
                        </v-badge>
                    </h4>
                    <v-img :src="reward.image" 
                        :lazy-src="reward.image"
                        width="300">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange darken-1" text @click="closeModal">
                        {{ $t('Close') }}
                    </v-btn>
                </v-card-actions>
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
            required: true
        },
    },
    computed: {
        rarityColor() {
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
    },
    data() {
        return {
            dialog: false
        }
    },
    created () {
        this.dialog = true;
    },
    methods: {
        async closeModal() {
            this.$emit('close');
        }
    },
};
</script>