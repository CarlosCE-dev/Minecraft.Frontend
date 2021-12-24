<template>
    <v-card class="">
        <div class="d-flex green-light pa-2">
            <v-icon medium color="white">mdi-lock-reset</v-icon>
            <strong class="ml-1 font-weight-black white--text subtitle1">{{ $t('ChangePassword') }}</strong>
        </div>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field :append-icon="showActual ? 'mdi-eye' : 'mdi-eye-off'"
                    class="mb-1"
                    outlined
                    color="green-light"
                    v-model="actualPassword" 
                    :placeholder="$t('EnterCurrentPassword')" 
                    :rules="passwordRules"
                    :label="$t('CurrentPassword')" 
                    required
                    :type="showActual ? 'text' : 'password'"
                    @click:append="showActual = !showActual"
                    autocomplete="false"
                ></v-text-field>
                <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    outlined
                    class="mb-1"
                    color="green-light"
                    v-model="password" 
                    :label="$t('NewPassword')" 
                    :placeholder="$t('EnterNewPassword')" 
                    :rules="passwordRules" 
                    required
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    autocomplete="false"
                ></v-text-field>
                <v-text-field v-model="password_confirm"
                    class="mb-1"
                    outlined
                    color="green-light"
                    :label="$t('ConfirmPassword')" 
                    :placeholder="$t('ConfirmNewPassword')" 
                    :rules="checkPassword()" 
                    required
                    type="password"
                    autocomplete="false"
                ></v-text-field>
                <div class="text-right">
                    <v-btn :disabled="!valid" color="success" @click="validate">
                        {{ $t('UpdatePassword') }}
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
        
    </v-card>
</template>

<script>
export default {
   data() {
        return {
            showActual: false,
            show: false,
            valid: true,
            actualPassword: "",
            password: '',
            password_confirm: '',
            passwordRules: [
                v => !!v || 'La contraseña es requerida',
                v => (v && v.length >= 8) || 'Please enter at least 8 characters',
            ],
        }
   }, 
   methods: {
       validate () {
            if (this.$refs.form.validate()){
                this.changePassword();
            }
        },
        async changePassword(){
            this.$store.commit('ui/loader', true);

            try {
                const payload = { currentPassword: this.actualPassword, newPassword: this.password }
                await new Promise(resolve => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/auth/changePassword`, payload);

                const snackbar = { color: 'success', timeout: 3000, state: true , text: message, top: true };
                if (!status){
                    snackbar.color = 'yellow';
                }

                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenPasswordUpdate'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            };
        },
        checkPassword() {
            return [ this.password === this.password_confirm || this.$('PasswordCheck') ];
        },
   },
}
</script>

<style lang="scss" scoped>

</style>