<template>
    <div class="d-flex index__botones">
        <v-btn color="green-light" 
               class="mx-1" 
               dark 
               v-for="btn in buttons" 
               @click="generateCommand(btn)"
               :key="btn.title">
            {{ btn.title }}
        </v-btn>
    </div>
</template>

<script>
import buttons from '@/modules/dashboard/helpers/generateButtons'

export default {
    data() {
        return {
            buttons
        }
    },
    methods: {
        generateCommand(btn) {
            console.log(btn.title)
        }
    },
}
</script>

<style>

</style>