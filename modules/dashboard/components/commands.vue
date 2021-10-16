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

        <v-overlay :value="loader">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import buttons from '@/modules/dashboard/helpers/generateButtons'

export default {
    data() {
        return {
            buttons,
            loader: false
        }
    },
    computed: {
        ...mapState('auth', [
            "user"
        ]),
    },
    methods: {
        async generateCommand(btn) {
            this.loader = true

            let command;
            if (btn.needUser){
                command = btn.command.replace('{0}', this.user.minecraft_username)
            } else {
                command = btn.command
            }

            const payload = { command }
            const token = localStorage.getItem("x-token");

            try {
                await this.$axios.$post(`${process.env.baseUrl}/home/minecraft`, payload, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                this.loader = false
            } catch (error) {
                this.loader = false
            }
        }
    },
}
</script>

<style>

</style>