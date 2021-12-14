<template>
    <v-card class="mx-2 my-2" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1 d-flex">
                    {{ event.title }}  
                    <v-chip small 
                        dark
                        :color="getStatusColor"
                        class="ml-2 align-self-top">
                        {{ getStatusName }}
                    </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ event.description }}
                    <div class="my-1">
                        <v-icon left small>mdi-calendar</v-icon>
                        {{ eventDate }}
                    </div>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <EventStatusButtons :status="this.event.status"/>
            <v-btn outlined text :color="getChangeStatusColor" v-if="crudActions" @click="confirmChangeStatus">
                {{ getChangeStatusName }}
            </v-btn>
            <v-btn outlined text color="indigo" v-if="showManagerButton" :to="{ name: 'admin-group-id', params: { id: event.id } }">
                Manager
            </v-btn>
            <v-btn outlined text color="orange" v-if="crudActions" @click="edit">
                Edit
            </v-btn>
            <v-btn text small outlined color="red" v-if="crudActions" fab depressed @click="confirmRemove">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn outlined text color="indigo" v-if="!crudActions" @click="claimReward">
                Get random reward
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { format } from "date-fns";

// Components
import EventStatusButtons from '@/modules/event/components/EventStatusButtons'

export default {
    components: {
        EventStatusButtons,
    },
    props: {
        event: {
            type: Object,
            required: true,
        },
        crudActions: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        eventDate() {
            return !this.event.end_date || !this.event.start_date
                ? this.$t("DatesNotDefined")
                : `${format(new Date(this.event.start_date), "MMMM d yyyy")} - ${format(
                    new Date(this.event.end_date), "MMMM d yyyy")}`;
        },
        getStatusName(){
            return this.event.is_active ? this.$t("Active") : this.$t("NoActive");
        },
        getStatusColor(){
            return this.event.is_active ? "green lighten-1" : "red lighten-1";
        },
        getChangeStatusColor(){
            return this.event.is_active ? "red lighten-1" : "green lighten-1";
        },
        getChangeStatusName(){
            return this.event.is_active ? this.$t("DeactivateEvent") : this.$t("ActiveEvent");
        },
        showManagerButton(){
            return this.crudActions && this.event.status === EventStatusTypes.created;
        }
    },
    methods: {
        edit() {
            this.$emit("edit", this.event);
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
                const payload = { groupId: this.event.id };
                await new Promise((resolve) => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/group/delete`, payload);

                const snackbar = { color: "success", timeout: 3000, state: true, text: message, top: true };
                if (status) {
                    this.$store.commit("group/remove", this.event.id);
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
        confirmChangeStatus() {
            this.$dialog.open({
                title: this.$t('Alert'),
                message: this.$t('ConfirmStatusChange'),
                resolver: (async (result) => {
                    if (await result) {
                        this.changeStatus();
                    }
                }),
            });
        },
        async changeStatus(){
            this.$store.commit("ui/loader", true);

            try {
                const payload = { 
                    groupId: this.event.id, 
                    isActive: this.event.is_active === 0 ? 1 : 0
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
        claimReward(){
            this.$emit("randomReward", this.event);
        }
    },
};
</script>