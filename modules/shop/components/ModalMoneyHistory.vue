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
                <v-simple-table dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left"></th>
                            <th class="text-left">
                                {{ $t('DateObtain') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.text }}</td>
                            <td>{{ item.date }}</td>
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
        async getHistory(){
            this.$store.commit('ui/loader', true);
            try {

                await new Promise(resolve => setTimeout(resolve, 600));
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/money/history`);
                

                this.items = data.map((d) => {
                    return {
                        text: `Obtuviste ${d.amount} Pejecoins por haber reclamado un premio`,
                        date: format(new Date(d.created_at), "yyyy MMMM d HH:mmaaa", { locale: es }),
                        id: d.id,
                    }
                });
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