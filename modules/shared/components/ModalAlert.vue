<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
                <v-card-title class="text-h5" v-if="alert.message">
                    {{ alert.title }}
                </v-card-title>
                <v-card-text v-if="alert.message">
                    {{ alert.message }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="closeModal">
                        {{ $t('Confirm') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: {
        alert: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            dialog: false
        }
    },
    created () {
        this.dialog = true;
    },
    methods: {
        async closeModal() {
            this.$emit('close');
        }
    },
};
</script>