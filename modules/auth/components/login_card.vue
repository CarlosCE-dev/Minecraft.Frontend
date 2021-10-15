<template>
    <div class="login_card--border">
        <v-card class="login_card d-flex" elevation="0" height="100%">
            <LoginForm/>
            <LoginDesign/>
        </v-card>
    </div>
</template>

<script>
import LoginForm from '@/modules/auth/components/login_form.vue'
import LoginDesign from '@/modules/auth/components/login_design.vue'

export default {
    components: {
        LoginForm,
        LoginDesign
    },
}
</script>

<style lang="scss" scoped>
.login_card {
    overflow: hidden;
    position: relative;
    border-radius: 20px;
}
.login_card--border {
    border-radius: 30px;
    background-color: $secondary;
    padding: 12px;
    height: 80%;
    width: 85%;
}

@media screen and (max-width: $large-size) {
    .login_card--border {
        height: 90%;
        width: 90%;
    }
}

@media screen and (max-width: $small-size) {
    .login_card--border {
        height: 100%;
        width: 100%;
        padding: 6px;
    }
}
</style>