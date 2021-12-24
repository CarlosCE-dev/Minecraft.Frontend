<template>
    <div>
        <v-dialog v-model="show" persistent width="300">
            <v-card color="primary" dark>
                <v-card-text class="pt-2">
                    {{ $t('LoadingBlocks') }}
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                required: true
            },
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

<style scoped>

</style>