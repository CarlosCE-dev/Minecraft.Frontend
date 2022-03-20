<template>
  <v-alert color="#5865F2" dark icon="mdi-discord" border="left" prominent>
        <div class="d-flex">
            <span class="align-self-center">
                {{ $t("DiscordAccountInfo") }}
            </span>
            <v-btn :href="discordLink" color="white" outlined class="ml-auto align-self-end">
               {{ $t("AddAccount") }}
            </v-btn>
        </div>
  </v-alert>
</template>

<script>
export default {
    data() {
        return {
            discordLink: "https://discord.com/api/oauth2/authorize?client_id=931401486049607682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify"
        }
    },
};
</script>