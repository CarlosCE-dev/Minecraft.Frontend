<template>
    <div class="login__design d-flex flex-row justify-end">
        <img src="~/assets/images/mc_bg01.png"  class="login__image" alt="">
        <div class="d-flex align-end justify-center pb-4">
            <p class="login__text white--text caption d-none">
                Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley 
                of type and scrambled it to make a type specimen book. 
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

.login__text {
    text-align: center;
    width: 80%;
    position: relative;
    z-index: 2;
}

.login__image {
    object-fit: cover;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
}

.login__design {
    position: relative;
    overflow: hidden;
    border-radius: 0px !important;
    background-color: $primary-light;
    width: 65%;
}

@media screen and (max-width: $large-size) {
    .login__design {
        width: 50%;
    }
}
@media screen and (max-width: $medium-size) {
    .login__design {
        width: 10%;
    }
    .login__text {
        display: none;
    }
}
@media screen and (max-width: $small-size) {
    .login__design {
        display: none !important;
    }
}
</style>