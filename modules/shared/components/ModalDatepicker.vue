<template>
    <div>
        <v-dialog ref="dialog" v-model="show" persistent width="290px">
            <v-date-picker
                color="green-light" 
                range 
                :min="minDate"
                v-model="dates"
                scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="orange" @click="show = false">{{ $t('Cancel') }}</v-btn>
                <v-btn text color="success" @click="confirm">{{ $t('Confirm') }}</v-btn>
            </v-date-picker>
        </v-dialog>
    </div>
</template>


<script>
import { reverseDateRepresentation } from "@/modules/shared/helpers/dateHelper";

export default {
    props: {
        value: {
            type: Boolean,
            required: true
        },
        groupDates: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            minDate: new Date().toISOString().substr(0, 10),
            dates: []
        }
    },
    computed: {
        show: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        confirm() {
            if (this.dates.length !== 2){
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('DatesRequired'), top: true };
                return this.$store.commit('ui/snackbar', snackbar);
            }

            const sortedDates = this.dates
                .map(reverseDateRepresentation)
                .sort()
                .map(reverseDateRepresentation);

            this.$emit('onDatePickerConfirmed', sortedDates);
            this.show = false;
        }
    }, 
    created () {
        if (this.groupDates){
            this.dates = this.groupDates;
        }
    },
}
</script>