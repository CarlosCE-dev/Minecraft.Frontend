<template>
    <div>
        <v-snackbar v-model="show" :timeout="snackbar.timeout" :color="snackbar.color" :top="snackbar.top" dark>
            <span class="white--text">{{ snackbar.text }}</span>
            <v-btn color="white" text @click="show = false">
                Close
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
