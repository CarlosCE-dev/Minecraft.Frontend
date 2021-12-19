<template>
  <div class="d-flex">
    <div class="d-flex flex-column">
      <UserMoney :amount="amount" @history="modalMoneyHistory = true" />
      <AboutMoney />
      <QuoteMoney />
    </div>
    <div class="d-flex flex-column" v-if="items.length > 0">
      <MoneyRanking :users="items"/>
    </div>
    <ModalMoneyHistory v-if="modalMoneyHistory" @close="modalMoneyHistory = false" />
  </div>
</template>

<script>
import ModalMoneyHistory from "@/modules/shop/components/ModalMoneyHistory";
import UserMoney from "@/modules/shop/components/UserMoney";
import AboutMoney from "@/modules/shop/components/AboutMoney";
import QuoteMoney from "@/modules/shop/components/QuoteMoney";
import MoneyRanking from "@/modules/shop/components/MoneyRanking";

export default {
  components: {
    ModalMoneyHistory,
    UserMoney,
    AboutMoney,
    QuoteMoney,
    MoneyRanking
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
      items: []
    };
  },
  async mounted() {
    this.$store.commit("window/setPageTitle", this.$metaInfo.title);
    const { users, money } = await this.getMoney();
    this.amount = money;
    this.items = users;
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