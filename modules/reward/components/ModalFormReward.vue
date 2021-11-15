<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-form ref="form" v-model="valid" lazy-validation> 
            <v-card>
                <v-card-title>
                    <span class="text-h5">Crear nuevo premio</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    color="green-light"
                                    label="Nombre clave del premio"
                                    v-model="reward.name"
                                    :rules="inputRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    color="green-light"
                                    label="Titulo del premio"
                                    v-model="reward.title"
                                    :rules="inputRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    type="number"
                                    color="green-light"
                                    label="Cantidad a entregar"
                                    v-model="reward.amount"
                                    :rules="numberRequired"
                                    required
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    :items="rarityTypes"
                                    item-text="name"
                                    item-value="value"
                                    color="green-light"
                                    label="Rareza"
                                    v-model="reward.rarity"
                                    required
                                    outlined
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    :items="commandTypes"
                                    item-text="name"
                                    item-value="value"
                                    color="green-light"
                                    label="Tipo de comando"
                                    v-model="reward.commandType"
                                    required
                                    outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                        <div class="d-flex justify-end align-center">
                            Subir imagen
                            <input type="file" v-show="false" accept="image/png, image/jpeg" ref="imageSelector" @change="onSelectedImage">
                            <v-btn class="ml-2" fab color="primary" depressed small @click="onSelectImage">
                                <v-icon>mdi-upload</v-icon>
                            </v-btn>
                            <v-btn v-if="localImage" class="ml-2" fab color="red" depressed small @click="clearImage" dark>
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
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" text @click="sendData">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

import Reward from '@/models/Reward';
import { RarityTypes } from '@/models/enums/RarityTypes';
import { CommandTypes } from '@/models/enums/CommandTypes';

export default {
    data() {
        return {
            reward: new Reward(),
            dialog: false,
            valid: true,
            inputRequired: [
                v => !!v || 'Este campo es requerido',
                v => v && v.trim().length > 0 || 'Este campo no puede tener solo espacios en blanco',
            ],
            numberRequired: [
                v => !!v || 'Este campo es requerido',
                v => v && !Number.isInteger(v) || 'Este campo solo acepta numeros',
                v => (v && (v > 0 && v < 1000)) || 'La cantidad debe estar entre 1 y 1000',
            ],
            rarityTypes: [],
            commandTypes: [],
            file: null,
            localImage: null
        }
    },
    created () {
        if (this.rewardToEdit){
            this.reward = new Reward(this.rewardToEdit);
        }
        this.dialog = true;
        this.createRarityArray();
    },
    computed: {
        ...mapState('reward', [
            "rewardToEdit"
        ])
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
            formData.append('rarity', this.reward.rarity);
            formData.append('amount', this.reward.amount);
            formData.append('commandType', this.reward.commandType);

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