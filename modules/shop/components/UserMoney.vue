<template>
    <v-card max-width="400" outlined class="mb-2">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">PEJECOINS</div>
          <v-list-item-title class="text-h5 mb-1">{{amount}}</v-list-item-title>
          <v-list-item-subtitle>Cantidad disponible</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <img src="~/assets/images/coin.png" alt="pejecoin" />
        </v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="onHistoryClick">historial</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        amount: {
            type: Number,
            default: 0
        },
    },
    methods: {
        onHistoryClick() {
            this.$emit("history");
        }
    },
}
</script>