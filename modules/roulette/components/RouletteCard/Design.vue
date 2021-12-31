<template>
    <div class="container-design">
        <img v-for="(r, index) in rewards" 
            :key="r.id" 
            :class="getRewardClass(index)"
            :src="r.image">
    </div>
</template>

<script>
export default {
    props: {
        rewards: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            rewardClass: {
                [0]: 'first',
                [1]: 'second',
                [2]: 'third',
                [3]: 'fourth',
                [4]: 'fifth',
            }
        }
    },
    methods: {
        getRewardClass(index) {
           return `reward reward--${this.rewardClass[index]}`
        }
    },
}
</script>

<style lang="scss" scoped>
.container-design {
    top: 0;
    left: 0;
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
}

.reward {
    border: 1px solid rgba(0, 0, 0, 0.116);
    border-radius: 50%;
    -webkit-filter: drop-shadow(1px 1px 1px #222);
    filter: drop-shadow(1px 1px 1px #222);
    position:absolute;
}

.reward--first {
    width: 100px;
    height: 100px;
    right: 60%;
    bottom: 20%;
}

.reward--second {
    width: 80px;
    height: 80px;
    right: 40%;
    bottom: 15%;
    transform: rotate(10deg);
}

.reward--third {
    width: 60px;
    height: 60px;
    right:22.5%;
    bottom: 10%;
    transform: rotate(8deg);
}

.reward--fourth {
    width: 40px;
    height: 40px;
    right:10%;
    bottom: 6%;
    transform: rotate(6deg);
}

.reward--fifth {
    width: 20px;
    height: 20px;
    right: 2.5%;
    bottom: 2%;
    transform: rotate(4deg);
}
</style>