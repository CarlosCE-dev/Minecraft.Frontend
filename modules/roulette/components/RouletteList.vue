<template>
    <v-row no-gutters class="mt-4">
        <v-col cols="12">
            <div class="mb-2 mx-2">
                <div class="d-flex flex-column">
                    <h2>Ruletas disponibles</h2>
                    Juega suerte tirando en las diversas ruletas disponibles
                </div>
                <v-divider></v-divider>
            </div>
        </v-col>
        <v-col v-for="(item, i) in items" :key="i" cols="4">
            <RouletteCard :item="item"/>
        </v-col>
    </v-row>
</template>

<script>
import RouletteCard from '@/modules/roulette/components/RouletteCard/index'

export default {
    components: {
        RouletteCard,
    },
    data() {    
        return {
            items: []
        }
    },
    methods: {
        async loadRoulletes(){
            try {
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/roulette/get`);
                return data;
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: "", top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
    },
    async mounted () {
       this.items = await this.loadRoulletes();
    },
}
</script>