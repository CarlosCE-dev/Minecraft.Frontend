<template>
    <div class="d-flex align-center">
        <v-icon color="red" left small>
            mdi-minus
        </v-icon>
        <i18n path="MoneyHistoryGift" tag="span">
            <template v-slot:amount>
                <strong>{{ item.amount }}</strong>
            </template>
            <template v-slot:user>
                <strong>{{ item.user.minecraft_username }}</strong>
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