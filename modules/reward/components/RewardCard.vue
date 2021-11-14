<template>
    <v-card outlined class="mx-2 mb-2" :color="rarityColor" dark>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                    <v-badge :color="`${rarityColor} lighten-1`" :content="reward.amount">
                        {{ reward.name }}
                    </v-badge>
                </div>
                <v-list-item-title class="text-h5 mb-1">
                    {{ reward.title }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ rarityName }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar rounded size="80" :color="`${rarityColor} lighten-1`" v-if="reward.image">
                <v-img :src="reward.image" 
                    :lazy-src="reward.image"
                    max-width="50"
                    max-height="50">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-list-item-avatar>
        </v-list-item>
        <v-card-actions v-if="crudActions">
        </v-card-actions>
    </v-card>
</template>

<script>
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

export default {
    props: {
        reward: {
            type: Object,
            required: true
        },
        crudActions: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        rarityColor() {
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
        rarityName(){
            return getNameOfRarity(this.reward.rarity);
        }
    },
}
</script>

<style>

</style>