<template>
    <v-card outlined class="mx-2 my-2 animate__animated animate__fadeIn animate__fast" :color="rarityColor" dark>
        <v-list-item three-line>
            <div class="d-flex flex-column w-100">
                <div class="text-h6">
                    {{ reward.title }}
                    <v-badge v-if="reward.amount > 1" 
                        class="ml-1"
                        :color="`${rarityColor} lighten-1`" 
                        :content="`x${reward.amount}`">
                    </v-badge>
                </div>
                <span class="caption">{{ rarityName }}</span>
            </div>
            <v-list-item-avatar rounded size="80" :color="`${rarityColor} lighten-1`" v-if="reward.image">
                <v-img :src="reward.image" 
                    :lazy-src="reward.image"
                    max-width="50"
                    max-height="50">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-list-item-avatar>
        </v-list-item>
        <v-card-actions v-if="crudActions">
            <v-tooltip top v-if="reward.description">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="white" dark v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span>{{reward.description}}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-checkbox v-model="checkbox" v-if="selectorActive" :value="reward.id" hide-details></v-checkbox>
            <template v-else>
                <v-spacer></v-spacer>
                <v-btn dark color="transparent" fab small depressed @click="edit">
                    <v-icon color="white">mdi-pencil</v-icon>
                </v-btn>
                <v-btn dark small color="transparent" fab depressed @click="confirmRemove">
                    <v-icon color="white">mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-card-actions>
        <v-card-actions v-if="isClaimRewardView">
            <v-tooltip top v-if="reward.description">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="white" dark v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span>{{reward.description}}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn dark color="white" outlined depressed @click="onGiftClick">
                {{ $t('Gift') }}
            </v-btn>
            <v-btn dark color="white" outlined depressed @click="onClaimClick">
                {{ $t('Claim') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { getNameOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';
import { mapState } from 'vuex';

export default {
    props: {
        reward: {
            type: Object,
            required: true
        },
        crudActions: {
            type: Boolean,
            default: false
        },
        selectorActive: {
            type: Boolean,
            default: false
        },
        isClaimRewardView: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        rarityColor() {
            return `${getNameOfRarity(this.reward.rarity).toLowerCase()}`
        },
        rarityName(){
            return getNameOfRarity(this.reward.rarity);
        },
        ...mapState('reward', [
            "itemsSelected",
        ]),
        checkbox: {
            get () {
                return this.itemsSelected
            },
            set (value) {
                this.$store.commit('reward/itemSelected', value);
            }
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.reward);
        },
        confirmRemove() {
            this.$dialog.open({
                title: this.$t('Alert'),
                message: this.$t('ConfirmRewardDelete'),
                resolver: (async (result) => {
                    if (await result) {
                        this.remove();
                    }
                }),
            });
        },
        async remove() {
            this.$store.commit('ui/loader', true);

            try {
                const payload = { rewardId: this.reward.id }
                await new Promise(resolve => setTimeout(resolve, 300));
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/reward/delete`, payload);

                const snackbar = { color: 'success', timeout: 3000, state: true , text: message, top: true };
                if (status){
                    this.$store.commit('reward/remove', this.reward.id);
                } else {
                    snackbar.color = 'yellow';
                }

                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenDeleteReward'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            };
        },
        onClaimClick(){
            this.$emit('claim', this.reward.userRewardId);
        },
        onGiftClick(){
            this.$emit('gift', this.reward.userRewardId);
        }
    },
}
</script>

<style scoped lang="scss">
.w-100 {
    width: 100%;
}
</style>