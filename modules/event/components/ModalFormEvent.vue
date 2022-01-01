<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-form ref="form" v-model="valid" lazy-validation> 
            <v-card>
                 <v-card-title class="d-flex">
                    <span class="text-h5">{{ $t(title) }}</span>
                    <div class="ml-auto selector">
                        <v-select
                            dense
                            :disabled="disableType"
                            :items="eventTypes"
                            item-text="name"
                            item-value="value"
                            color="green-light"
                            :label="$t('EventType')"
                            v-model="group.type"
                            required
                            outlined
                            hide-details
                        ></v-select>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    color="green-light"
                                    :label="$t('EventTitle')"
                                    v-model="group.title"
                                    :rules="inputRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    color="green-light"
                                    outlined
                                    required
                                    :rules="inputRequired"
                                    name="input-7-4"
                                    :label="$t('EventDescription')"
                                    v-model="group.description"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    color="green-light"
                                    :label="$t('EventStartDate')"
                                    v-model="group.startDate"
                                    prepend-icon="mdi-calendar"
                                    @click="modalDatepicker = true"
                                    readonly
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    color="green-light"
                                    :label="$t('EventEndDate')"
                                    v-model="group.endDate"
                                    prepend-icon="mdi-calendar"
                                    @click="modalDatepicker = true"
                                    readonly
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-if="group.type === eventTypesObject.roulette"
                                    type="number"
                                    color="green-light"
                                    :label="$t('Price')"
                                    v-model="group.price"
                                    :rules="numberRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <ModalDatepicker v-model="modalDatepicker" :groupDates="groupDates" @onDatePickerConfirmed="updateDates" />
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange darken-1" text @click="close">
                        {{ $t('Cancel') }}
                    </v-btn>
                    <v-btn color="green darken-1" text @click="sendData">
                        {{ $t('SaveChanges') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

// Models
import Group from '@/models/Group';

// Enums
import { EventTypes } from '@/models/enums/EventTypes';

// Helpers
import { inputRequired, numberRequired } from '@/validators/rulesValidator';

// Components
import ModalDatepicker from '@/modules/shared/components/ModalDatepicker.vue';

export default {
    components: {
        ModalDatepicker,
    },
    props: {
        title: {
            type: String,
            default: "NewEvent"
        },
    },
    data() {
        return {
            group: new Group(),
            dialog: false,
            valid: true,
            inputRequired: inputRequired(),
            numberRequired: numberRequired(),
            modalDatepicker: false,
            eventTypes: [],
            disableType: false,
            eventTypesObject: EventTypes,
        }
    },
    created () {
        if (this.groupToEdit){
            this.group = new Group(this.groupToEdit);
            this.disableType = true;
        }
        this.createArray();
        this.dialog = true;
    },
    computed: {
        ...mapState('group', [
            "groupToEdit"
        ]),
        groupDates(){
            return [this.group.startDate, this.group.endDate]
        }
    },
    methods: {
        createArray(){
            const eventTypes = [];
            for (let [key, value] of Object.entries(EventTypes)) {
                eventTypes.push({ name: `${key.charAt(0).toUpperCase()}${key.slice(1)}`, value })
            }
            this.eventTypes = eventTypes;
        },
        updateDates(dates){
            const [startDate, endDate] = dates;
            this.group.startDate = startDate;
            this.group.endDate = endDate;
        },
        close(){
            this.$store.commit('group/toEdit', null);
            this.$emit('close');
        },
        async sendData(){

            if (!this.$refs.form.validate()) return;
            this.$store.commit('ui/loader', true);

            const route = (this.groupToEdit) ? 'update' : 'create';

            try {
                const { status, data, message } = await this.$axios.$post(`${process.env.baseUrl}/group/${route}`, this.group);

                if (!status) {
                    const snackbar = { color: 'red', timeout: 3000, state: true , text: message, top: true };
                    this.$store.commit('ui/loader', false);
                    return this.$store.commit('ui/snackbar', snackbar);
                }

                this.dialog = false;
                await new Promise(resolve => setTimeout(resolve, 700));

                const snackbar = { color: 'green', timeout: 3000, state: true , text: message, top: true };
                this.$store.commit('ui/snackbar', snackbar);

                if (this.groupToEdit) {
                    this.$store.commit('group/update', data);
                } else {
                    this.$store.commit('group/new', data);
                }

                this.$store.commit('ui/loader', false);
                this.$store.commit('group/toEdit', null);
                this.$emit('close');

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorCreateGroup'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            }

            this.$store.commit('ui/loader', false);
        }
    },
};
</script>

<style lang="scss" scoped>
.selector {
    width: 200px;
}
</style>