<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ $t('HistoryMoney') }}</span>
            </v-card-title>
            <v-card-text v-if="items.length === 0">
                <v-alert dense type="info">
                    {{ $t('NoInfoToShow') }}
                </v-alert>
            </v-card-text>
            <v-card-text v-else>
                <div v-for="item in items" :key="item.id" class="black--text">
                    <ByGift :item="item" v-if="item.gain_type === moneyGainTypes.byGift"/>
                    <ByReward :item="item" v-if="item.gain_type === moneyGainTypes.byReward"/>
                    <ByRoulette :item="item" v-if="item.gain_type === moneyGainTypes.byRoulette"/>
                    <hr class="opacity">
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="close">
                    {{ $t('Close') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// Models
import { MoneyGainTypes } from '@/models/enums/GainTypes';

// Components
import ByReward from "@/modules/shared/components/UserMoney/ModalMoneyHistory/ByReward";
import ByGift from "@/modules/shared/components/UserMoney/ModalMoneyHistory/ByGift";
import ByRoulette from "@/modules/shared/components/UserMoney/ModalMoneyHistory/ByRoulette";

export default {
    components: {
        ByReward,
        ByGift,
        ByRoulette
    },
    data() {
        return {
            dialog: true,
            items: [],
            moneyGainTypes: MoneyGainTypes
        }
    },
    created () {
        this.dialog = true;
        this.getHistory();
    },
    methods: {
        close(){
            this.$emit('close');
        },
        async getHistory(){
            this.$store.commit('ui/loader', true);
            try {

                await new Promise(resolve => setTimeout(resolve, 600));
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/money/history`);
                this.items = data;
               
                this.$store.commit('ui/loader', false);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingHistory'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            }
            
        }
    },
};
</script>

<style scoped lang="scss">
.opacity {
    opacity: 0.4;
}
</style>