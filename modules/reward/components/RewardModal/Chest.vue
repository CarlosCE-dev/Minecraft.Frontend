<template>
    <div class="chest-container">
        <img src="~/assets/images/chest-moving.gif"
            class="chest--moving animate__animated animate__fadeIn aminate__faster" 
            alt="chest-moving"
            v-if="chestMoving"
            @click="claim"
            width="350">
        <img src="~/assets/images/chest-open-1.gif" 
            alt="chest-open"
            width="350"
            @load="chestOpening"
            v-else>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chestMoving: true,
        }
    },
    methods: {
        claim() {
           this.chestMoving = false; 
        },
        chestOpening(){
            setTimeout(() => {
                this.chestAnimated = false;
                this.$emit('get');
            }, 1200)
        }
    },
}
</script>

<style lang="scss" scoped>
.chest--moving:hover {
    cursor:pointer;
    filter: drop-shadow(0 0 0.75rem rgb(255, 217, 0));
    transition: filter 300ms ease;
}
</style>