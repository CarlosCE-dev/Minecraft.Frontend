<template>
    <div class="d-flex flex-wrap">
        <FortuneWheel />
        <div class="d-flex flex-column ml-2">
            <UserMoney />
            <RouletteHistory />
        </div>
    </div>
</template>

<script>
import FortuneWheel from '@/modules/roulette/components/FortuneWheel/Index'
import RouletteHistory from '@/modules/roulette/components/RouletteHistory'
import UserMoney from "@/modules/shared/components/UserMoney/MoneyStatusCard";

export default {
    components: {
        FortuneWheel,
        UserMoney,
        RouletteHistory
    },
}
</script>