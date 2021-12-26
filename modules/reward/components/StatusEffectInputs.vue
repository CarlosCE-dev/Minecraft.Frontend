<template>
    <v-col cols="12" :class="showInputs ? 'd-flex' : 'd-none'">
        <v-select :items="effectTypes"
            v-model="effectType"
            item-text="name"
            item-value="value"
            class="mr-2"
            color="green-light"
            :label="$t('EffectType')"
            required
            outlined
            hide-details
        ></v-select>
        <v-text-field
            type="number"
            color="green-light"
            class="mr-2 input__number"
            :label="$t('EffectLevel')"
            v-model="level"
            :rules="numberRequired"
            required
            outlined
        ></v-text-field>
        <v-text-field
            type="number"
            class="mr-2 input__number"
            color="green-light"
            :label="$t('Duration')"
            v-model="duration"
            :rules="numberRequired"
            required
            outlined
        ></v-text-field>
        <v-select :items="timeUnits"
            v-model="timeUnit"
            item-text="name"
            item-value="value"
            class="mr-2"
            color="green-light"
            :label="$t('UnitTime')"
            required
            outlined
            hide-details
        ></v-select>
    </v-col>
</template>

<script>
import { EffectTypes } from '@/models/enums/EffectTypes';
import { TimeUnits } from '@/models/enums/TimeUnits';
import { getDescriptionForEffect } from '@/modules/shared/helpers/effectTypeHelper';
import { getTimeInSeconds } from '@/modules/shared/helpers/timeHelper';

import { numberRequired } from '@/validators/rulesValidator';

export default {
    props: {
        showInputs: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            timeUnits: [],
            timeUnit: 1,
            effectTypes: [],
            effectType: 1,
            level: 1,
            duration: 10,
            numberRequired: numberRequired(),
        }
    },
    created () {
        this.createArray();
    },
    computed: {
        changeData() {
            const { effectType, level, duration, showInputs, timeUnit } = this
            return {
                effectType,
                level: parseInt(level),
                duration: parseInt(duration),
                showInputs,
                timeUnit
            }
        }
    },
    watch: {
        changeData(value) {
            if (!value.showInputs) return;
            value.duration = isFinite(value.duration) ? value.duration : 1;
            value.level = isFinite(value.duration) ? value.level : 1;
            value.name = this.effectTypes.find(e => e.value === value.effectType).name;
            value.timeUnit = this.timeUnits.find(e => e.value === value.timeUnit).name.toLowerCase();
            value.description = getDescriptionForEffect(value.effectType);
            value.timeInSeconds = getTimeInSeconds(value.timeUnit, value.duration);
            this.$emit("onEffect", value);
        }
    },
    methods: {
        createArray(){
            const effectTypes = [];
            for (let [key, value] of Object.entries(EffectTypes)) {
                effectTypes.push({ 
                    name: `${key.charAt(0).toUpperCase()}${key.slice(1)}`.replaceAll("_", " "), 
                    value 
                });
            }
            this.effectTypes = effectTypes;

            const timeUnits = [];
            for (let [key, value] of Object.entries(TimeUnits)) {
                timeUnits.push({ 
                    name: `${key.charAt(0).toUpperCase()}${key.slice(1)}`, 
                    value 
                });
            }
            this.timeUnits = timeUnits;
        },
        
    },
}
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>