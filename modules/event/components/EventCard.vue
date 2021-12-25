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
            <v-list-item-icon>
                {{ timeRemaining }}
            </v-list-item-icon>
        </v-list-item>
        <EventStatusButtons 
            :event="this.event" 
            @onButtonClick="onEventButtonClick"
        />
    </v-card>
</template>

<script>
import { format, formatDistance, startOfToday, differenceInDays } from "date-fns";
import { es } from 'date-fns/locale'

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
                : `Fin de evento: ${this.capitalizeFirstLetter(format(new Date(this.event.end_date), "MMMM d", { locale: es }))}`;
        },
        getStatusName(){
            if (this.event.event_finish) {
                return this.$t(getNameForEventStatusType(4));
            }
            return this.$t(getNameForEventStatusType(this.event.status));
        },
        getStatusColor(){
            if (this.event.event_finish) {
                return getColorForEventStatusType(4);
            }
            return getColorForEventStatusType(this.event.status);
        },
        getChangeStatusColor(){
            return this.event.is_active ? "red lighten-1" : "green lighten-1";
        },
        getChangeStatusName(){
            return this.event.is_active ? this.$t("DeactivateEvent") : this.$t("ActiveEvent");
        },
        timeRemaining(){
            const endDate = new Date(this.event.end_date);
            return this.exceedsDays(endDate)
                ? `${this.$t("TimeLeft")} ${formatDistance(endDate, new Date(), { locale: es, includeSeconds: false })}`
                : this.$t("EventOver");
        }
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
        },
        exceedsDays(date) {
            return differenceInDays(date, startOfToday()) >= 0;
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
    },
};
</script>