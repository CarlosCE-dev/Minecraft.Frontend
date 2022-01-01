<template>
    <v-card class="ml-4">
            <v-card-title>
                Pejecoins disponibles: {{ user.money }}
            </v-card-title>
            <v-card-text>
                
            </v-card-text>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('auth', [
            'user'
        ])
    },
    
}
</script>

<style lang="scss" scoped>

</style>