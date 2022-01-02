<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-sheet :color="`${rarityColor}`" rounder outlined>
            <v-card light class="d-flex flex-column align-center" elevation="0" outlined>
                <v-card-title v-if="!reward">
                    {{ $t('ClickChest') }}
                </v-card-title>
                <Card :reward="reward" v-if="reward" />
                <Chest @get="getRandomReward" v-if="!reward"/>
                <div class="d-flex align-self-end ma-1">
                    <v-btn fab color="transparent" elevation="0" @click="close">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                <v-fade-transition>
                    <v-overlay v-if="overlay" absolute color="transparent">
                        <v-progress-circular indeterminate 
                            color="primary" 
                            width="10"
                            size="100"></v-progress-circular>
                    </v-overlay>
                </v-fade-transition>
            </v-card>
        </v-sheet>
    </v-dialog>
  </v-row>
</template>

<script>
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

import Card from '@/modules/reward/components/RewardModal/Card'
import Chest from '@/modules/reward/components/RewardModal/Chest'

export default {
    props: {
        eventId: {
            type: Number,
            required: true
        },
    },
    components: {
        Card,
        Chest
    },
    data() {
        return {
            reward: null,
            overlay: false,
        }
    },
    computed: {
        rarityColor() {
            if (!this.reward) return "white";
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
    },
    created() {
        this.dialog = true;
    },
    methods: {
        close() {
            this.$emit("close");
        },
        async getRandomReward(){
            
            this.overlay = true;

            try {
                const payload = { 
                    groupId: this.eventId, 
                };
                const { status, message, data } = await this.$axios.$post(`${process.env.baseUrl}/reward/getRandomReward`, payload);

                const snackbar = { color: "success", timeout: 3000, state: true, text: message, top: true };
                if (!status) {
                    snackbar.color = "orange";
                    this.$store.commit("ui/snackbar", snackbar);
                }

                this.overlay = false;

                if (status){
                    this.reward = { ...data.reward, money: data.money };
                    this.$store.commit("auth/addMoney", data.money);
                    this.$emit('remove', this.eventId);
                }
            } catch (error) {
                const snackbar = { color: "red", timeout: 3000, state: true, text: this.$t("ErrorWhenGetReward"), top: true };
                this.$store.commit("ui/snackbar", snackbar);
                this.overlay = false;
            } 
        }
    },
};
</script>