<template>
    <v-card outlined class="mx-2 my-2 " color="primary" dark>
        <div class="ma-2">
            {{ $t('TotalRewardsSelected') }} {{ itemsSelected.length }} <br>
            {{ $t('StockRewards')}} {{ getTotalStock }}
            <div class="text-right">
                <v-btn outlined color="white" @click="confirmChanges">{{ $t("SaveChanges") }}</v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState('reward', [
            "itemsSelected",
        ]),
        ...mapGetters('reward', [
            "getTotalStock"
        ])
    },
    methods: {
        confirmChanges() {
            this.$dialog.open({
                title: this.$t('Alert'),
                message: this.$t('ConfirmSave'),
                resolver: (async (result) => {
                    if (await result) {
                        this.saveChanges();
                    }
                }),
            });
        },
        async saveChanges(){
            this.$store.commit('ui/loader', true);

            try {
                const payload = {
                    rewardIds: [...this.itemsSelected],
                    groupId: this.$route.params.id
                }
                await new Promise(resolve => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/group/saveRewards`, payload);

                const snackbar = { color: 'success', timeout: 3000, state: true , text: message, top: true };
                if (!status){
                    snackbar.color = 'yellow';
                }
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenSavingRewardsOfEvent'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            };

        }
    },
}
</script>

