<template>
    <div class="login__form d-flex flex-column justify-center">
        <LoginLogo/>
        <LoginHeader :title="titleButton"/>    
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                color="green-light"
                label="Ingresa tu correo"
                v-model="email"
                :rules="emailRules"
                required
                outlined
            ></v-text-field>

            <v-text-field
                v-if="loginForm"
                color="green-light"
                label="Enter your password"
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
                label="Cuenta de minecraft"
                placeholder="Nombre exacto de tu cuenta de minecraft"
                v-model="minecraftUsername"
                :rules="inputRequired"
                required
                outlined>
            </v-text-field>

            <small v-if="!loginForm">
                <v-icon small color="orange">mdi-alert-circle</v-icon>
                Para evitar errores asegurarte de escribir el nombre exacto de la cuenta de minecraft que utilizas
            </small>

            <v-checkbox v-if="loginForm"
                        label="Mantener sesión iniciada" 
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
                    Exito!
                </v-card-title>
                <v-card-text>
                    Se creo el usuario exitosamente, contacte el administrador para que te proporcione la clave de acceso del usuario registrado
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text to="/auth/login">
                    Ok
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
import LoginLogo from '@/modules/auth/components/login_logo.vue'
import LoginHeader from '@/modules/auth/components/login_header.vue'

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
        inputRequired: [
            (v) => !!v || 'Este campo es requerido',
        ],
        email: '',
        emailRules: [
            (v) => !!v || 'Este campo es requerido',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El correo no es valido'
        ],
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
                const data = await this.$axios.$post(`${process.env.baseUrl}/auth/register`, payload);

                this.loader = false

                if (data.status === 200){
                    this.registerFormSuccess = true
                } else {

                    if (data.isEmailAlreadyTaken){
                        this.snackbar = {
                            state: true,
                            message: "El correo proporcionado ya esta registrado",
                            color: 'red'
                        }
                        return
                    }

                    if (data.isUsernameAlreadyTaken){
                        this.snackbar = {
                            state: true,
                            message: "La cuenta de minecraft proporcionada ya esta registrada",
                            color: 'red'
                        }
                        return
                    }
                }


            } catch (error) {
                this.loader = false
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

                const { user, auth } = await this.$axios.$post(`${process.env.baseUrl}/auth/login`, payload);
                this.loader = false
                
                if (this.rememberMe){
                    localStorage.setItem("x-token", auth.token);
                }
                
                this.$store.commit('auth/setAuth', user);
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