<template>
    <div class="font-weight-bold">
        <span class="green-primary--text">{{ title }}</span>
        <p class="caption pt-1">Maincrakt</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                require: true
            },
        },
    }
</script>

<style lang="scss" scoped>
div {
    padding-top: 45px;
    padding-bottom: 20px;
}
</style>