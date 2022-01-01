<template>
    <v-row justify="center">
        <v-dialog v-model="open" persistent max-width="500">
            <v-card>
                <v-card-title class="text-h5">
                    {{ title }}
                </v-card-title>
                <v-card-text>
                    {{ message }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="cancel">
                        {{ $t('Cancel') }}
                    </v-btn>
                    <v-btn color="green darken-1" text @click="confirm">
                        {{ $t('Confirm') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            open: false,
            title: '',
            message: '',
            resolver: () => null,
        }
    },
    mounted() {
        this.$nuxt.$on('dialog', this.dialog);
    },
    
    methods: {
        confirm() {
            this.resolver(new Promise((resolve) => resolve(true)));
            this.close();
        },
        cancel() {
            this.resolver(new Promise((resolve) => resolve(false)));
            this.close();
        },
        close() {
            this.open = false;
        },
        dialog({ title, message, open, resolver }) {
            this.title = title
            this.message = message;
            this.open = open;
            this.resolver = resolver;
        }
    }
};
</script>