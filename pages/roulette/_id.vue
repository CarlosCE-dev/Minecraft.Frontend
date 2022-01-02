<template>
    <div class="d-flex flex-wrap">
        <FortuneWheel />
        <UserMoney />
    </div>
</template>

<script>
import FortuneWheel from '@/modules/roulette/components/FortuneWheel/Index'
import UserMoney from "@/modules/shared/components/UserMoney/MoneyStatusCard";

export default {
    components: {
        FortuneWheel,
        UserMoney
    },
}
</script>