<template>
  <div>
    <v-alert border="right" colored-border type="error" elevation="2" v-if="error">
      {{ error }}
    </v-alert>
    <v-dialog v-model="success" persistent max-width="500">
        <v-card>
            <v-card-text class="pa-4 black--text">
                {{ successMessage }}
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" :to="{ name: 'event' }" text @click="dialog = false">
                {{ $t('GoEventPage') }}
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            error: null,
            success: false,
            successMessage: "",
        };
    },
    head() {
        return {
            title: "Discord",
        };
    },
    computed: {
        ...mapState('auth', [
            "user"
        ])
    },
    methods: {
        async getDiscordData(code) {
            this.$store.commit('ui/loader', true);
            try {

                const { status, message } = await this.$axios.$post(
                    `${process.env.baseUrl}/auth/discordAuth`,
                    { code }
                );
                const snackbar = {
                    color: "success",
                    timeout: 3000,
                    state: true,
                    text: message,
                    top: true,
                };

                this.$store.commit('ui/loader', false);
                if (!status) {
                    snackbar.color = "orange";
                    this.$store.commit('ui/snackbar', snackbar);
                    return;
                }
                this.$store.commit("auth/setDiscordUser", true);
                this.successMessage = this.$t("DiscordAccountAdded");
                this.success = true;

            } catch (error) {
                const snackbar = {
                    color: "green",
                    timeout: 3000,
                    state: true,
                    text: this.$t("ErrorWhenObtainingEvents"),
                    top: true,
                };
                this.$store.commit("ui/snackbar", snackbar);
            }
        },
    },
    mounted() {
        const { code, error } = this.$route.query;
        if (!error && !code) {
            this.$router.push({ name: "index" });
            return;
        }

        if (error) {
            this.error = this.$t("DiscordAccessDenied");
            return;
        }

        if (code) {
            if (this.user.discord_id) {
                this.successMessage = this.$t("DiscordAccountWasAdded");
                this.success = true;                
            } else {
                this.getDiscordData(code);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>