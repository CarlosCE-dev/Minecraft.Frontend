<template>
  <div class="d-flex">
    <div class="d-flex flex-column">
      <UserMoney />
      <AboutMoney />
      <QuoteMoney />
    </div>
    <div class="d-flex flex-column" v-if="items.length > 0">
      <MoneyRanking :users="items"/>
    </div>
  </div>
</template>

<script>
import UserMoney from "@/modules/shared/components/UserMoney/MoneyStatusCard";
import AboutMoney from "@/modules/shop/components/AboutMoney";
import QuoteMoney from "@/modules/shop/components/QuoteMoney";
import MoneyRanking from "@/modules/shop/components/MoneyRanking";

export default {
  components: {
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
      items: []
    };
  },
  async mounted() {
    this.$store.commit("window/setPageTitle", this.$metaInfo.title);
    this.items = await this.getMoney();
  },
  methods: {
    async getMoney() {
      try {
        const { data } = await this.$axios.$post(
          `${process.env.baseUrl}/money/get`
        );
        return data;
      } catch (error) {
        const snackbar = { color: "green", timeout: 3000, state: true, text: this.$t("ErrorWhenObtainingMoney"), top: true };
        this.$store.commit("ui/snackbar", snackbar);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>