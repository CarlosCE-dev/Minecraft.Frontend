<template>
    <v-card class="ml-4">
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">PEJECOINS</div>
                <v-list-item-title class="text-h5 mb-1">{{ user.money }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('AmountAvailable') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
                <img src="~/assets/images/coin.png" alt="pejecoin" />
            </v-list-item-avatar>
        </v-list-item>
        <hr>
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