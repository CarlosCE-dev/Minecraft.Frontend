<template>
    <v-card v-if="rouletteHistory.length > 0" class="animate__animated animate__fadeIn animate__fast">
        <v-card-title>
            <h5>{{ $t("History") }}</h5>
        </v-card-title>
        <v-card-text>
            <v-simple-table dense height="300px">
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
                        <tr v-for="{ reward, created_at, id } in rouletteHistory" :key="id">
                            <td>
                                <v-avatar size="20" v-if="reward.image">
                                    <img :src="reward.image" :alt="reward.title">
                                </v-avatar>
                                <v-avatar size="20" :color="rarityColor" v-else></v-avatar>
                            </td>
                            <td class="d-flex align-center">
                                {{ reward.title }} 
                                {{ amountItem(reward.amount) }} 
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
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

import { format } from "date-fns";
import { es } from 'date-fns/locale'

export default {
    computed: {
        ...mapState('roulette', [
          'rouletteHistory'  
        ])
    },
    methods: {
        getDateWhenCreated(date){
            return format(new Date(date), "dd/MM/yyyy HH:mmaaa", { locale: es });
        },
        amountItem(amount){
            return amount > 1 ? `(x${amount})` : "";
        },
        rarityName(rarity){
            return getNameOfRarity(rarity);
        },
        rarityColor(rarity) {
            return `${getNameOfRarity(rarity).toLowerCase()}`
        },
    },
    async created () {
        const payload = { groupId: this.$route.params.id }

        try {

            await new Promise(resolve => setTimeout(resolve, 500));
            const { status, data, message } = await this.$axios.$post(`${process.env.baseUrl}/roulette/history`, payload);
            if (!status){
                const snackbar = { color: 'orange', timeout: 3000, state: true , text: message, top: true };
                this.$store.commit('ui/snackbar', snackbar);
                this.$router.push('/roulette');	
                return null;
            }
            this.$store.commit('roulette/setRouletteHistory', data);
        } catch (error) {
            const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenLoadingRouletteHistory'), top: true };
            this.$store.commit('ui/snackbar', snackbar);
            return null;
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