<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-form ref="form" v-model="valid" lazy-validation> 
            <v-card>
                <v-card-title class="d-flex">
                    <span class="text-h5">{{ $t(title) }}</span>
                    <div class="ml-auto selector">
                        <v-select :items="commandTypes"
                            item-text="name"
                            item-value="value"
                            color="green-light"
                            :label="$t('CommandType')"
                            v-model="reward.commandType"
                            required
                            outlined
                            dense
                            hide-details
                            :disabled="rewardToEdit"
                        ></v-select>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    :disabled="isEffectCommand"
                                    color="green-light"
                                    :label="$t('RewardTitle')"
                                    v-model="reward.title"
                                    :rules="inputRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <StatusEffectInputs :showInputs="isEffectCommand" :effect="effectObject" @onEffect="applyEffect"/>
                            <v-col cols="6" :class="isEffectCommand ? 'd-none' : ''">
                                <v-text-field
                                    color="green-light"
                                    :label="$t('RewardName')"
                                    v-model="reward.name"
                                    :rules="inputRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :disabled="isEffectCommand"
                                    color="green-light"
                                    :label="$t('RewardDescription')"
                                    v-model="reward.description"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    :disabled="isEffectCommand"
                                    type="number"
                                    color="green-light"
                                    :label="$t('RewardAmount')"
                                    v-model="reward.amount"
                                    :rules="numberRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="5" class="d-flex">
                                <v-select
                                    :items="rarityTypes"
                                    item-text="name"
                                    item-value="value"
                                    color="green-light"
                                    :label="$t('Rare')"
                                    v-model="reward.rarity"
                                    required
                                    outlined
                                ></v-select>
                                <v-avatar size="20" :color="rarityColor" class="ml-1 mt-4"></v-avatar>
                            </v-col>
                            <v-col cols="12" v-if="isCustomCommand">
                                <v-text-field
                                    type="text"
                                    color="green-light"
                                    :label="$t('CustomCommand')"
                                    v-model="reward.customCommand"
                                    :rules="inputRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="d-flex justify-end align-center">
                            {{ $t('UploadImage') }}
                            <input type="file" v-show="false" accept="image/png, image/jpeg" ref="imageSelector" @change="onSelectedImage">
                            <v-btn class="ml-2" 
                                fab 
                                color="primary" 
                                depressed 
                                small 
                                @click="onSelectImage" 
                                :disabled="isEffectCommand">
                                <v-icon>mdi-upload</v-icon>
                            </v-btn>
                            <v-btn v-if="localImage" 
                                class="ml-2" 
                                fab 
                                color="red" 
                                depressed 
                                small 
                                @click="clearImage" 
                                dark 
                                :disabled="isEffectCommand">
                                <v-icon>mdi-broom</v-icon>
                            </v-btn>
                            <div class="ml-2">
                                <img v-if="reward.img && !localImage"
                                    :src="reward.img" 
                                    alt="picture-picture" 
                                    width="100"
                                    height="100"
                                    class="img-thumbnail rounded-circle animate__animated animate__fadeIn">

                                <img v-if="localImage"
                                    :src="localImage" 
                                    alt="picture-picture" 
                                    width="100"
                                    height="100"
                                    class="img-thumbnail rounded-circle animate__animated animate__fadeIn">
                            </div>
                        </div>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange darken-1" text @click="close">
                        {{ $t('Cancel') }}
                    </v-btn>
                    <v-btn color="green darken-1" text @click="sendData">
                        {{ $t('SaveChanges') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { formatDuration } from "date-fns";

// Enums
import { RarityTypes } from '@/models/enums/RarityTypes';
import { CommandTypes } from '@/models/enums/CommandTypes';

// Models
import Reward from '@/models/Reward';

// Helpers
import { inputRequired, numberRequired } from '@/validators/rulesValidator';
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

// Components
import StatusEffectInputs from '@/modules/reward/components/StatusEffectInputs'

export default {
    components: {
        StatusEffectInputs,
    },
    props: {
        title: {
            type: String,
            default: "CreateNewReward" 
        },
    },
    data() {
        return {
            reward: new Reward(),
            dialog: false,
            valid: true,
            inputRequired: inputRequired(),
            numberRequired: numberRequired(),
            rarityTypes: [],
            commandTypes: [],
            file: null,
            localImage: null,
            commandTypesObject: CommandTypes,
            effectObject: null
        }
    },
    created () {
        if (this.rewardToEdit){
            this.reward = new Reward(this.rewardToEdit);
            if (this.isEffectCommand){
                const [ _, duration, level ] = this.reward.name.split(" ");
                const [ effectType, timeUnit ] = this.reward.customCommand.split(",");
                this.effectObject = { 
                    type: parseInt(effectType), 
                    duration: parseInt(duration), 
                    level: parseInt(level),
                    timeUnit: parseInt(timeUnit)
                };
            }
        }
        this.createRarityArray();
        this.dialog = true;
    },
    computed: {
        ...mapState('reward', [
            "rewardToEdit"
        ]),
        rarityColor() {
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
        isEffectCommand(){
            return this.reward.commandType === this.commandTypesObject.effect
        },
        isCustomCommand(){
            return this.reward.commandType === this.commandTypesObject.custom
        }
    },
    watch: {
        isEffectCommand(value) {
            if (!value) {
                const id = this.reward.id;
                this.reward = new Reward();
                this.reward.id = id;
                this.$refs.form.resetValidation()
            }
        }
    },
    methods: {
        close(){
            this.$store.commit('reward/toEdit', null);
            this.$emit('close');
        },
        createRarityArray(){
            const rarityTypes = [];
            for (let [key, value] of Object.entries(RarityTypes)) {
                rarityTypes.push({ name: `${key.charAt(0).toUpperCase()}${key.slice(1)}`, value })
            }
            this.rarityTypes = rarityTypes;
            const commandTypes = [];
            for (let [key, value] of Object.entries(CommandTypes)) {
                commandTypes.push({ name: `${key.charAt(0).toUpperCase()}${key.slice(1)}`, value })
            }
            this.commandTypes = commandTypes;
        },
        clearImage(){
            this.localImage = null;
        },
        applyEffect(effect){
            this.reward.description = effect.description;
            this.reward.amount = 1;
            this.reward.title = `${effect.name} Lvl ${effect.level} (${formatDuration({[effect.timeUnit]:effect.duration})})`;
            this.reward.customCommand = `${effect.effectType},${effect.timeUnitType}`;
            this.reward.name = `${effect.name.toLowerCase().trim().replaceAll(" ", "_")} ${effect.timeInSeconds} ${effect.level} 1`;
        },
        onSelectedImage(event){
            const [image] = event.target.files;
            if (!image) {
                return this.file = null;
            }
           
            const fr = new FileReader();
            fr.onload = (event) => {
                const imageTester = new Image();
                imageTester.src = event.target.result;

                imageTester.onload = (event) => {
                    const [element] = event.path;
                    const { height, width } = element;

                    if (height > 800 || width > 800 ) {
                        const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ImageToBig'), top: true };
                        return this.$store.commit('ui/snackbar', snackbar);
                    }

                    this.file = image;
                    this.localImage = fr.result;
                }
            }
            fr.readAsDataURL(image);
        },
        onSelectImage(){
            this.$refs.imageSelector.click();
        },
        async sendData(){

            if (!this.$refs.form.validate()) return;
            this.$store.commit('ui/loader', true);
            

            const formData = new FormData();
            formData.append('id', this.reward.id);
            formData.append('image', this.file);
            formData.append('name', this.reward.name);
            formData.append('title', this.reward.title);
            formData.append('description', this.reward.description);
            formData.append('rarity', this.reward.rarity);
            formData.append('amount', this.reward.amount);
            formData.append('commandType', this.reward.commandType);
            formData.append('customCommand', this.reward.customCommand);

            const route = (this.rewardToEdit) ? 'update' : 'create';

            try {
                const { status, data, message } = await this.$axios.$post(`${process.env.baseUrl}/reward/${route}`, formData);

                if (!status) {
                    const snackbar = { color: 'red', timeout: 3000, state: true , text: message, top: true };
                    this.$store.commit('ui/loader', false);
                    return this.$store.commit('ui/snackbar', snackbar);
                }

                this.dialog = false;
                await new Promise(resolve => setTimeout(resolve, 700));

                const snackbar = { color: 'green', timeout: 3000, state: true , text: message, top: true };
                this.$store.commit('ui/snackbar', snackbar);

                if (this.rewardToEdit) {
                    this.$store.commit('reward/update', data);
                } else {
                    this.$store.commit('reward/new', data);
                }

                this.$store.commit('ui/loader', false);
                this.$store.commit('reward/toEdit', null);
                this.$emit('close');

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenUploadingImage'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            }

            this.$store.commit('ui/loader', false);
        }
    },
};
</script>

<style lang="scss" scoped>
.selector {
    width: 200px;
}
</style>