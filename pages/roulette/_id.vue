<template>
    <div class="d-flex flex-wrap">
        <FortuneWheel />
        <RouletteStatus />
    </div>
</template>

<script>
import FortuneWheel from '@/modules/roulette/components/FortuneWheel/Index'
import RouletteStatus from '@/modules/roulette/components/RouletteStatus'

export default {
    components: {
        FortuneWheel,
        RouletteStatus
    },
}
</script>