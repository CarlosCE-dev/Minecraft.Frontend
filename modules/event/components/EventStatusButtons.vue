<template>
    <span>
        <v-btn color="purple" v-if="showManagerButton">Manager</v-btn>
        <v-btn color="green" v-if="showStartButton">Start</v-btn>
        <v-btn color="orange" v-if="showPauseButton">Pause</v-btn>
        <v-btn color="orange" v-if="showCancelButton">Cancel</v-btn>
        <v-btn text small outlined color="red" v-if="showDeleteButton" fab depressed>
                <v-icon>mdi-delete</v-icon>
        </v-btn>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';

// Models
import { EventStatusTypes } from "@/models/enums/EventStatusTypes"

export default {
    props: {
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
    created () {
        console.log(this.eventStatusTypes);
    },
    computed: {
        ...mapGetters('auth', [
            "isAdmin",
            "isAdminOrModerator"
        ]),
        showManagerButton() {
            return this.status === this.eventStatusTypes.created 
        },
        showStartButton() {
            return this.status === this.eventStatusTypes.created && this.isAdmin
        },
        showDeleteButton() {
            return this.status === this.eventStatusTypes.created
        },
        showPauseButton() {
            return this.status === this.eventStatusTypes.started && this.isAdmin
        },
        showCancelButton() {
            return this.status === this.eventStatusTypes.created && this.isAdmin
        }
    },
}
</script>

