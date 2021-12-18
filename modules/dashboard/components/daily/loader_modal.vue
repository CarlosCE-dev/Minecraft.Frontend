<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <img src="~/assets/images/creeper_loop.gif" alt="prize" class="prize" width="290">
            <div class="d-flex align-center justify-center">
                <span class="animate__animated animate__headShake animate__slow animate__infinite">Generando premio...</span>
            </div>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    created () {
        this.dialog = true
        this.onModalShow()
    },
    methods: {
        async onModalShow() {
            await new Promise(resolve => setTimeout(resolve, 4000));
            this.$emit('close');
        }
    },
  }
</script>