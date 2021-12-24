<template>
    <div>
        <v-snackbar v-model="show" 
            :timeout="snackbar.timeout" 
            :color="snackbar.color" 
            :top="snackbar.top" outlined>
                <v-icon>mdi-</v-icon>
                <span class="black--text">{{ snackbar.text }}</span>
                <v-btn color="black" text @click="show = false">
                    {{ $t('Close') }}
                </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                required: true
            },
            snackbar: {
                type: Object,
                required: true
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
    }
</script>
