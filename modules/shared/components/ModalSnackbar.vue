<template>
    <div>
        <v-snackbar v-model="show" 
            :timeout="snackbar.timeout" 
            :color="snackbar.color" 
            :top="snackbar.top"
            dark>
                <span class="white--text">{{ snackbar.text }}</span>
                <v-btn x-small fab text @click="show = false">
                    <v-icon color="white">mdi-close</v-icon>
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
