<template>
  <div class="d-flex flex-column">
    <v-card max-width="400" outlined class="mb-2">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">PEJECOINS</div>
          <v-list-item-title class="text-h5 mb-1">{{
            amount
          }}</v-list-item-title>
          <v-list-item-subtitle>Cantidad disponible</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="80">
          <img src="~/assets/images/coin.png" alt="pejecoin" />
        </v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="modalMoneyHistory = true">historial</v-btn>
      </v-card-actions>
    </v-card>

    <v-card color="blue-light" class="mb-2" max-width="400" outlined>
      <v-card-title>
        <span class="text-h6">¿Qué es el Pejecoin y como funciona?</span>
      </v-card-title>
      <v-card-text>
        {{ $t("PejeCoinDescription") }}
      </v-card-text>
    </v-card>

    <v-card color="#26c6da" dark max-width="400">
      <v-card-title>
        <v-icon large left> mdi-twitter </v-icon>
        <span class="text-h6">Twitter</span>
      </v-card-title>

      <v-card-text class="font-weight-light white--text">
        {{ $t("BitcoinQuote") }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt="peña nieto"
              src="https://pbs.twimg.com/profile_images/991180595710513152/V5O-Z320_400x400.jpg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Peña Nieto</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-icon class="mr-1"> mdi-heart </v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1"> mdi-share-variant </v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <ModalMoneyHistory v-if="modalMoneyHistory" @close="modalMoneyHistory = false" />
  </div>
</template>

<script>
import ModalMoneyHistory from "@/modules/shop/components/ModalMoneyHistory";

export default {
  components: {
    ModalMoneyHistory,
  },
  head() {
    return {
      title: "Tienda",
    };
  },
  data() {
    return {
      amount: 0,
      modalMoneyHistory: false,
    };
  },
  async mounted() {
    this.$store.commit("window/setPageTitle", this.$metaInfo.title);
    this.amount = await this.getMoney();
  },
  methods: {
    async getMoney() {
      try {
        const { data } = await this.$axios.$post(
          `${process.env.baseUrl}/money/get`
        );
        return data;
      } catch (error) {
        const snackbar = {
          color: "green",
          timeout: 3000,
          state: true,
          text: this.$t("ErrorWhenObtainingMoney"),
          top: true,
        };
        this.$store.commit("ui/snackbar", snackbar);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>