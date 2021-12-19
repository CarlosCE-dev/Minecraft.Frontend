<template>
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
</template>
