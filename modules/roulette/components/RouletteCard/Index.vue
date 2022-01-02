<template>
    <v-card class="container-card" height="200" outlined>
        <Design :rewards="item.rewards" />
        <v-card-title class="card__title black--text">{{ item.title }}</v-card-title>
        <v-btn outlined class="card__button" :to="`roulette/${item.id}`">
            {{ $t('Play') }}
            <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
        <v-chip class="span__text" color="primary" small>
            {{ $t('Price') }}: {{ item.price }}
        </v-chip>
        <span class="span__time">
            {{ timeRemaining }}
        </span>
    </v-card>
</template>

<script>
import { formatDistance, startOfToday, differenceInDays } from "date-fns";
import { es } from 'date-fns/locale'

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
    computed: {
        timeRemaining(){
            const endDate = new Date(this.item.end_date);
            return this.exceedsDays(endDate)
                ? `${this.$t("TimeLeft")} ${formatDistance(endDate, new Date(), { locale: es, includeSeconds: false })}`
                : this.$t("EventOver");
        }
    },
    methods: {
        exceedsDays(date) {
            return differenceInDays(date, startOfToday()) >= 0;
        },
    },
}
</script>

<style lang="scss">
.container-card {
    overflow:hidden;
}
.span__time {
    position: absolute;
    bottom: 4px;
    left: 4px
}
.span__text {
    position:absolute;
    right: 20px;
    top: 60px;
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