<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ $t('HistoryRewardsClaim') }}</span>
            </v-card-title>
            <v-card-text v-if="items.length === 0">
                <v-alert dense type="info">
                    {{ $t('NoInfoToShow') }}
                </v-alert>
            </v-card-text>
            <v-card-text v-else>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left small-column"></th>
                                <th class="text-left">
                                    {{ $t('Name') }}
                                </th>
                                <th class="text-center large-column">
                                    {{ $t('DateObtain') }}
                                </th>
                                <th class="text-center medium-column">
                                    {{ $t('Rare') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="{ reward, created_at, id, giftUser } in items" :key="id">
                                <td>
                                    <v-avatar size="20" v-if="reward.image">
                                        <img :src="reward.image" :alt="reward.title">
                                    </v-avatar>
                                    <v-avatar size="20" :color="rarityColor" v-else></v-avatar>
                                </td>
                                <td class="d-flex align-center">
                                    {{ reward.title }} 
                                    {{ amountItem(reward.amount)}} 
                                    <v-tooltip top v-if="reward.description">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon class="ml-1 mr-auto" color="blue" dark v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                                        </template>
                                        <span>{{reward.description}}</span>
                                    </v-tooltip>
                                    <v-chip v-if="giftUser" small class="ml-auto">
                                        <v-avatar left>
                                            <v-img :src="minecraftAvatar(giftUser.minecraft_id)"></v-img>
                                        </v-avatar>
                                        {{ $t('GiftTo') }} {{ giftUser.minecraft_username }}
                                    </v-chip>
                                </td>
                                <td class="text-center">{{ getDateWhenCreated(created_at) }}</td>
                                <td class="text-center">
                                    <v-chip :color="rarityColor(reward.rarity)" dark small>
                                        {{ rarityName(reward.rarity) }}
                                    </v-chip>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
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
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

import { format } from "date-fns";
import { es } from 'date-fns/locale'

export default {
    data() {
        return {
            dialog: true,
            items: []
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
        rarityName(rarity){
            return getNameOfRarity(rarity);
        },
        rarityColor(rarity) {
            return `${getNameOfRarity(rarity).toLowerCase()}`
        },
        getDateWhenCreated(date){
            return format(new Date(date), "dd/MM/yyyy HH:mmaaa", { locale: es });
        },
        amountItem(amount){
            return amount > 1 ? `(x${amount})` : "";
        },
        minecraftAvatar(id){
            return id ? `https://crafatar.com/avatars/${id}` : `https://i.imgur.com/cAFcdws.png`
        },
        async getHistory(){
            this.$store.commit('ui/loader', true);
            try {

                await new Promise(resolve => setTimeout(resolve, 600));
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/reward/history`);
                this.items = data;
                this.$store.commit('ui/loader', false);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingRewardHistory'), top: true };
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
.large-column {
    width: 200px;
}
</style>