<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ $t("EventRewards") }}</span>
            </v-card-title>
            <v-card-text v-if="rewards.length === 0">
                <v-alert dense type="info">
                    {{ $t("NoInfoToShow") }}
                </v-alert>
            </v-card-text>
            <v-card-text v-else>
                <div class="d-flex justify-end mb-2">
                    <h4>{{ $t("TotalRewardsLeft") }} {{ rewardsLeft }}</h4>
                </div>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left small-column"></th>
                                <th class="text-left">
                                    {{ $t("Name") }}
                                </th>
                                <th class="text-center medium-column">
                                    {{ $t("Rare") }}
                                </th>
                                <th class="text-center small-column">
                                    {{ $t("RewardsLeft") }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in rewards" :key="item.reward.id">
                                <td>
                                    <v-avatar size="20" v-if="item.reward.image">
                                        <img :src="item.reward.image" alt="item.reward.title">
                                    </v-avatar>
                                    <v-avatar size="20" :color="rarityColor" v-else></v-avatar>
                                </td>
                                <td class="d-flex align-center">
                                    {{ item.reward.title }} {{ amountItem(item.reward.amount)}}
                                    <v-tooltip top v-if="item.reward.description">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon class="ml-auto" color="blue" dark v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                                        </template>
                                        <span>{{item.reward.description}}</span>
                                    </v-tooltip>
                                </td>
                                <td class="text-center">
                                    <v-chip :color="rarityColor(item.reward.rarity)" dark small>
                                        {{ rarityName(item.reward.rarity) }}
                                    </v-chip>
                                </td>
                                <td class="text-center">{{ item.stockLeft }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="close">
                    {{ $t("Close") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';


export default {
    data() {
        return {
            dialog: true,
            rewards: [],
            rewardsLeft: 0
        }
    },
    created () {
        this.dialog = true
        this.getEventData();
    },
    computed: {
        ...mapState('reward', [
            "detailEventId"
        ]),
    },
    methods: {
        close(){
            this.$emit('close');
        },
        rarityName(rarity){
            return getNameOfRarity(rarity);
        },
        rarityColor(rarity) {
            return `${getNameOfRarity(rarity).toLowerCase()}`
        },
        amountItem(amount){
            return amount > 1 ? `(x${amount})` : "";
        },
        async getEventData(){
            this.$store.commit('ui/loader', true);
            try {

                await new Promise(resolve => setTimeout(resolve, 600));
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/group/details`, { groupId: this.detailEventId });
                this.rewards = data.rewards;
                this.rewardsLeft = data.rewardsLeft;
                this.$store.commit('ui/loader', false);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t("ErrorWhenEventDetails"), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            }
            
        }
    },
};
</script>

<style lang="scss">
.small-column {
    width: 20px;
}
.medium-column {
    width: 50px;
}
</style>