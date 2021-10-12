<template>
    <div class="login__form d-flex flex-column justify-center">
        <LoginLogo/>
        <LoginHeader/>    
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                color="purple-light"
                label="Enter your e-mail address"
                v-model="email"
                :rules="emailRules"
                required
                outlined
            ></v-text-field>

            <v-text-field
                v-if="loginForm"
                color="purple-light"
                label="Enter your password"
                v-model="password"
                :type="visibility ? 'password' : 'text'"
                :rules="passwordRules"
                required
                outlined
                v-on:keyup.enter="login">
                <v-icon slot="append" 
                        @click="visibility = !visibility"
                        color="purple-light"
                        v-text="visibility ? 'mdi-eye' : 'mdi-eye-off'">
                </v-icon>
            </v-text-field>

             <v-text-field
                v-if="isPremium"
                color="purple-light"
                label="Minecraft account"
                placeholder="Write the name of your minecraft account"
                v-model="password"
                :rules="inputRequired"
                required
                outlined>
            </v-text-field>

             <v-checkbox label="Premium minecraft account" 
                        dense
                        hide-details 
                        hint-text
                        color="purple-light"
                        v-model="isPremium">
            </v-checkbox>

            <v-checkbox label="Keep me logged in" 
                        dense
                        hide-details 
                        hint-text
                        color="purple-light"
                        v-model="rememberMe">
            </v-checkbox>
           
            <v-btn color="purple-light" 
                    class="login__button white--text" 
                    @click="login" 
                    block
                    light
                    :disabled="!valid">
                {{ titleButton }}
            </v-btn>
             <div class="d-flex justify-end mt-4">
                <v-btn text :to="redirectLink">
                    {{ redirectButton }}
                </v-btn>
            </div>
        </v-form>
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
        isPremium: false,
        valid: false,
        visibility: true,
        password: '',
        minecraftUsername: "",
        passwordRules: [
            (v) => !!v || 'Password is required',
        ],
        inputRequired: [
            (v) => !!v || 'This field is required',
        ],
        email: '',
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        rememberMe: false,
        titleButton: "Login",
        redirectButton: "Register",
        redirectLink: "/auth/register",
        loginForm: true,
    }),
    created () {
        if (this.$route.name === "auth-register") {
            this.titleButton = "Register"
            this.redirectButton = "Login"
            this.redirectLink = "/auth/login"
            this.loginForm = false
        }
    },
    methods: {
        login() {

            // TODO: Agregar alerta al usuario para indicar que algo salio mal
            if ( !this.$refs.form.validate() ) return;

            localStorage.setItem("x-token", "tjksdfg7147hczs8714u");
                
            this.$store.commit('auth/setAuth', true );
            this.$router.push({path: '/'});
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