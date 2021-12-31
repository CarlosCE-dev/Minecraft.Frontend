<template>
    <v-card class="container-card" height="200" outlined>
        <Design :rewards="item.rewards" />
        <v-card-title class="card__title black--text">{{ item.title }}</v-card-title>
        <v-btn outlined class="card__button" :to="`roulette/${item.id}`">
            Spin the wheel
            <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
import Design from '@/modules/roulette/components/RouletteCard/Design'

export default {
    components: {
        Design,
    },
    props: {
        item: {
            type: Object,
            required: true
        },
    },
}
</script>

<style lang="scss">
.container-card {
    overflow:hidden;
}
.card__title {
    position:relative;
    z-index: 3;
}
.card__button {
    position:absolute;
    right: 10px;
    top: 10px;
    z-index: 3;
}
</style>