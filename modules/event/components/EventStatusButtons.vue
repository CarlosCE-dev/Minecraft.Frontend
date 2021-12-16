<template>
    <v-card-actions>
        <v-btn outlined text color="indigo" v-if="showCrudButtons" :to="{ name: 'admin-group-id', params: { id } }">
            Manager
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn outlined text color="orange" v-if="showCrudButtons" @click="edit">
            Edit
        </v-btn>
        <v-btn outlined text color="indigo" @click="details">Details</v-btn>
        <v-btn outlined text color="green" v-if="showStartButton" @click="confirmChangeStatus(eventStatusTypes.started)">Start</v-btn>
        <v-btn outlined text color="blue-grey" v-if="showPauseButton" @click="confirmChangeStatus(eventStatusTypes.paused)">Pause</v-btn>
        <v-btn outlined text color="blue" v-if="showRestartButton" @click="confirmChangeStatus(eventStatusTypes.started)">Restart</v-btn>
        <v-btn outlined text color="amber" v-if="showCancelButton" @click="confirmChangeStatus(eventStatusTypes.canceled)">Cancel</v-btn>
        <v-btn text small outlined color="red" v-if="showCrudButtons" fab depressed @click="confirmRemove">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn outlined text color="indigo" v-if="showClaimRewardButton" @click="claim">
            Get random reward
        </v-btn>
    </v-card-actions>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

// Models
import { EventStatusTypes } from "@/models/enums/EventStatusTypes"

export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            eventStatusTypes: EventStatusTypes
        }
    },
    computed: {
        ...mapGetters('auth', [
            "isAdmin",
            "isAdminOrModerator"
        ]),
        ...mapState('reward', [
            "isClaimPage",
        ]),
        showStartButton() {
            return this.status === this.eventStatusTypes.created && this.isAdmin && !this.isClaimPage
        },
        showCrudButtons() {
            return this.status === this.eventStatusTypes.created && this.isAdminOrModerator && !this.isClaimPage
        },
        showPauseButton() {
            return this.status === this.eventStatusTypes.started && this.isAdmin && !this.isClaimPage
        },
        showRestartButton() {
            return this.status === this.eventStatusTypes.paused && this.isAdmin && !this.isClaimPage
        },
        showCancelButton() {
            return this.status === this.eventStatusTypes.started && this.isAdmin && !this.isClaimPage
        },
        showClaimRewardButton(){
            return this.isClaimPage
        }
    },
    methods: {
        edit() {
            this.$emit('onButtonClick', 'edit');
        },
        confirmRemove() {
            this.$dialog.open({
                title: this.$t("Alert"),
                message: this.$t("ConfirmEventDelete"), 
                resolver: async (result) => {
                    if (await result) {
                        this.remove();
                    }
                },
            });
        },
        async remove() {
            this.$store.commit("ui/loader", true);

            try {
                const payload = { groupId: this.id };
                await new Promise((resolve) => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/group/delete`, payload);

                const snackbar = { color: "success", timeout: 3000, state: true, text: message, top: true };
                if (status) {
                    this.$store.commit("group/remove", this.id);
                } else {
                    snackbar.color = "orange";
                }

                this.$store.commit("ui/loader", false);
                this.$store.commit("ui/snackbar", snackbar);
            } catch (error) {
                const snackbar = { color: "red", timeout: 3000, state: true, text: this.$t("ErrorWhenDeleteEvent"), top: true };
                this.$store.commit("ui/loader", false);
                this.$store.commit("ui/snackbar", snackbar);
            }
        },
        confirmChangeStatus(status) {
            this.$dialog.open({
                title: this.$t('Alert'),
                message: this.$t('ConfirmStatusChange'),
                resolver: (async (result) => {
                    if (await result) {
                        this.changeStatus(status);
                    }
                }),
            });
        },
        async changeStatus(eventStatus){
            this.$store.commit("ui/loader", true);

            try {
                const payload = { 
                    groupId: this.id, 
                    status: eventStatus
                };
                await new Promise((resolve) => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/group/changeStatus`, payload);

                const snackbar = { color: "success", timeout: 3000, state: true, text: message, top: true };
                if (status) {
                    this.$store.commit("group/changeStatus", payload);
                } else {
                    snackbar.color = "yellow";
                }

                this.$store.commit("ui/loader", false);
                this.$store.commit("ui/snackbar", snackbar);
            } catch (error) {
                const snackbar = { color: "red", timeout: 3000, state: true, text: this.$t("ErrorWhenDeleteEvent"), top: true };
                this.$store.commit("ui/loader", false);
                this.$store.commit("ui/snackbar", snackbar);
            }
        },
        claim(){
            this.$emit('onButtonClick', 'claim');
        },
        details(){
            this.$emit('onButtonClick', 'details');
        }
    },
}
</script>

