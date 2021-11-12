<template>
    <div class="d-flex index__botones">
        <v-btn
        color="green-light"
        class="mx-1"
        dark
        v-for="btn in buttons"
        @click="generateCommand(btn)"
        :key="btn.title"
        >
        {{ btn.title }}
        </v-btn>

        <v-btn color="primary" class="mx-1" dark @click="testLoader">
            Test Loader
        </v-btn>

        <v-btn color="primary" @click="openDialog">Open Dialog</v-btn>

        <v-overlay :value="loader">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import { mapState } from "vuex";
import buttons from "@/modules/dashboard/helpers/generateButtons";

export default {
  data() {
    return {
      buttons,
      loader: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    async generateCommand(btn) {
      const alert = { state: true, title: btn.title, message: btn.command };
      this.$store.commit("ui/alert", alert);
    },
    async testLoader(){
        this.$store.commit("ui/loader", true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        this.$store.commit("ui/loader", false);
    },
    openDialog() {
        this.$dialog.open({
            title: "Alerta!",
            message: 'Are you sure you want to do this?',
            resolver: (async (result) => {
                if (await result) {
                    console.log("Great!")
                } else {
                    console.log("False");
                }
            }),
        });
    }
  },
};
</script>

<style>
</style>