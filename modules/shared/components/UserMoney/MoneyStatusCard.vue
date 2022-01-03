<template>
  <v-card max-width="400" outlined class="mb-2">
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" 
        outlined 
        @click="modalMoneyHistory = true">
        {{ $t('History') }}
      </v-btn>
    </v-card-actions>
    <ModalMoneyHistory v-if="modalMoneyHistory" @close="modalMoneyHistory = false" />
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import ModalMoneyHistory from "@/modules/shared/components/UserMoney/ModalMoneyHistory/Index";

export default {
    components: {
        ModalMoneyHistory,
    },
    computed: {
        ...mapState('auth', [
            'user'
        ])
    },
    data() {
        return {
            modalMoneyHistory: false,
        }
    },
}
</script>