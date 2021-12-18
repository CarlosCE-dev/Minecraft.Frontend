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
        <EventStatusButtons 
            :event="this.event" 
            @onButtonClick="onEventButtonClick"
        />
    </v-card>
</template>

<script>
import { format } from "date-fns";

// Components
import EventStatusButtons from '@/modules/event/components/EventStatusButtons'
import { getColorForEventStatusType, getNameForEventStatusType } from "@/modules/shared/helpers/eventStatusTypeHelper";


export default {
    components: {
        EventStatusButtons,
    },
    props: {
        event: {
            type: Object,
            required: true,
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
            return getNameForEventStatusType(this.event.status);
        },
        getStatusColor(){
            return getColorForEventStatusType(this.event.status);
        },
        getChangeStatusColor(){
            return this.event.is_active ? "red lighten-1" : "green lighten-1";
        },
        getChangeStatusName(){
            return this.event.is_active ? this.$t("DeactivateEvent") : this.$t("ActiveEvent");
        },
    },
    methods: {
        edit() {
            this.$emit("edit", this.event);
        },
        onEventButtonClick(event){
            switch (event) {
                case "edit":
                    this.edit();
                    break;
                case "claim":
                    this.claimReward();
                    break;
                case "details":
                    this.showDetails();
                    break;
                default:
                    break;
            }
        },
        claimReward(){
            this.$emit("randomReward", this.event);
        },
        showDetails(){
            this.$emit("details", this.event.id);
        }
    },
};
</script>