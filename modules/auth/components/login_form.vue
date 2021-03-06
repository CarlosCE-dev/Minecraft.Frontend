<template>
    <div class="login__form d-flex flex-column justify-center">
        <LoginLogo/>
        <LoginHeader :title="titleButton"/>    
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                color="green-light"
                :label='$t("EnterEmail")'
                v-model="email"
                :rules="emailRules"
                required
                outlined
            ></v-text-field>

            <v-text-field
                v-if="loginForm"
                color="green-light"
                :label='$t("EnterPassword")'
                v-model="password"
                :type="visibility ? 'password' : 'text'"
                :rules="inputRequired"
                required
                outlined
                v-on:keyup.enter="login">
                <v-icon slot="append" 
                        @click="visibility = !visibility"
                        color="green-light"
                        v-text="visibility ? 'mdi-eye' : 'mdi-eye-off'">
                </v-icon>
            </v-text-field>

             <v-text-field
                v-if="!loginForm"
                color="green-light"
                :label='$t("MinecraftAccount")'
                :placeholder='$t("MinecraftAccountPlaceholder")'
                v-model="minecraftUsername"
                :rules="inputRequired"
                required
                outlined>
            </v-text-field>

            <small v-if="!loginForm">
                <v-icon small color="orange">mdi-alert-circle</v-icon>
                {{ $t("MinecraftAccountHelper") }}
            </small>

            <v-checkbox v-if="loginForm"
                        :label='$t("KeepSession")'
                        dense
                        hide-details 
                        hint-text
                        color="green-light"
                        v-model="rememberMe">
            </v-checkbox>
           
            <v-btn color="green-light" 
                    class="login__button white--text" 
                    @click="loginForm ? onLoginForm() : onRegisterForm()" 
                    block
                    light
                    :disabled="!valid">
                {{ titleButton }}
            </v-btn>
             <div class="d-flex justify-end mt-4">
                <v-btn text :to="redirectLink" color="brown-primary">
                    {{ redirectButton }}
                </v-btn>
            </div>

        </v-form>

        <v-snackbar v-model="snackbar.state" dark :color="snackbar.color">
            {{ snackbar.message }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar.state = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>

        <v-dialog v-model="registerFormSuccess" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    {{ $t("Success") }}
                </v-card-title>
                <v-card-text>
                    {{ $t("SuccessLoginMessage") }}
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text to="/auth/login">
                    {{ $t("Confirm") }}
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-overlay :value="loader">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script>

// Components
import LoginLogo from '@/modules/auth/components/login_logo.vue'
import LoginHeader from '@/modules/auth/components/login_header.vue'

// Helpers
import { inputRequired, emailRequired } from '@/validators/rulesValidator';

export default {
    components: {
        LoginLogo,
        LoginHeader
    },
    data: () => ({
        valid: false,
        visibility: true,
        password: '',
        minecraftUsername: "",
        inputRequired: inputRequired(),
        email: '',
        emailRules: emailRequired(),
        rememberMe: true,
        titleButton: "Iniciar sesión",
        redirectButton: "Crear usuario",
        redirectLink: "/auth/register",
        loginForm: true,
        snackbar: {
            message: "",
            state: false,
            color: "primary"
        },
        registerFormSuccess: false,
        loader: false
    }),
    created () {
        if (this.$route.name === "auth-register") {
            this.titleButton = "Crear usuario"
            this.redirectButton = "Iniciar sesión"
            this.redirectLink = "/auth/login"
            this.loginForm = false
        }
    },
    methods: {
        async onRegisterForm() {
            this.registerFormSuccess = false
            if ( !this.$refs.form.validate() ) return;

            this.loader = true

            const payload = {
                email: this.email,
                minecraftUsername: this.minecraftUsername
            }

            try {
                const { status, statusCode, data } = await this.$axios.$post(`${process.env.baseUrl}/auth/register`, payload);
                this.loader = false;

                if (!status && statusCode === 202) {
                    if (data.isEmailAlreadyTaken){
                        this.snackbar = {
                            state: true,
                            message: "El correo proporcionado ya esta registrado",
                            color: 'red'
                        }
                        return;
                    }

                    if (data.isUsernameAlreadyTaken){
                        this.snackbar = {
                            state: true,
                            message: "La cuenta de minecraft proporcionada ya esta registrada",
                            color: 'red'
                        }
                        return;
                    }
                }

                if (!status) throw "Error";
                this.registerFormSuccess = true;

            } catch (error) {
                this.loader = false;
                this.snackbar = {
                    state: true,
                    message: "Ocurrio un error mientras se intento crear el usuario",
                    color: 'red',
                }
            }

            
        },
        async onLoginForm(){
            if ( !this.$refs.form.validate() ) return;

            this.loader = true

            const payload = {
                email: this.email,
                password: this.password
            }

            try {

                const { data } = await this.$axios.$post(`${process.env.baseUrl}/auth/login`, payload);
                this.loader = false
                
                if (this.rememberMe){
                    localStorage.setItem("x-token", data.auth.token);
                    this.$axios.setToken(`Bearer ${data.auth.token}`);
                }
                
                this.$store.commit('auth/setAuth', data.user);
                this.$router.replace({ name: 'index' });

            } catch (error) {
                this.loader = false
                this.snackbar = {
                    state: true,
                    message: "Se ha producido un problema al iniciar sesión. Comprueba el correo electrónico y la contraseña o crea una cuenta.",
                    color: 'red',
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.login__form {
    padding: 40px;
    width: 35%;
}
.login__button {
   margin-top: 40px;
}
@media screen and (max-width: $large-size) {
    .login__form {
        width: 50%;
    }
}
@media screen and (max-width: $medium-size) {
    .login__form {
        width: 90%;
    }
}
@media screen and (max-width: $small-size) {
    .login__form {
        padding: 20px;
        width: 100%;
    }
}
</style>