<template>
    <div class="d-flex align-center">
        <v-icon color="green" left small>
            mdi-plus
        </v-icon>
        <i18n path="MoneyHistoryReward" tag="span">
            <template v-slot:amount>
                <strong>{{ item.amount }}</strong>
            </template>
            <template v-slot:title>
                <strong>{{ item.reward.title }}</strong>
            </template>
        </i18n>
        <span class="ml-auto">
            {{ dateFormat }}
        </span>
    </div>
</template>

<script>
// Lib
import { format } from "date-fns";
import { es } from 'date-fns/locale'

export default {
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    computed: {
        dateFormat() {
            return format(new Date(this.item.created_at), "yyyy MMMM d HH:mmaaa", { locale: es });
        }
    },
}
</script>