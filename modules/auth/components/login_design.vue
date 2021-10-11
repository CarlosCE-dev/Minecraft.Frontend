<template>
    <div class="login__design d-flex flex-row justify-end">
        <!-- <img src="~/assets/images/city-01.jpg"  class="login__image" alt=""> -->
        <!-- <div class="login__squares_pattern login__squares_pattern--middle"></div>
        <div class="login__squares_pattern login__squares_pattern--top"></div> -->
        <div class="d-flex align-end justify-center pb-4">
            <p class="login__text white--text caption">
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
    background-color: $primary;
    width: 65%;
}

.login__squares_pattern {
    display: block;
    z-index: 1;
    position: absolute;
    background-image: repeating-linear-gradient(to bottom, transparent, transparent 5px, $primary 5px, $primary 10px),
        repeating-linear-gradient(to right, lighten($primary, 5%), lighten($primary, 5%) 5px,  $primary 5px,  $primary 10px);
}

.login__squares_pattern--middle {
    right: 60%;
    top: 45%;
    width: 120px;
    height: 120px;
}

.login__squares_pattern--top {
    right: 20%;
    top: 2%;
    width: 170px;
    height: 170px;
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