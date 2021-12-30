<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ $t('UsersOnline') }}</span>
            </v-card-title>
            <v-card-text v-if="items.length === 0">
                <v-alert dense type="info">
                    {{ $t('NoUsersOnline') }}
                </v-alert>
            </v-card-text>
            <v-card-text v-else>
                <span class="black--text">{{ $t('UsersOnlineHelp') }}</span>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left small-column"></th>
                                <th class="text-left">
                                    {{ $t('Name') }}
                                </th>
                                <th class="text-center small-column"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>
                                    <v-img height="40" width="40" :src="minecraftAvatar(item.minecraft_id)"></v-img>
                                </td>
                                <td>
                                    <v-badge dot color="green">
                                        {{ item.minecraft_username }}
                                    </v-badge>
                                </td>
                                <td>
                                    <div class="d-flex flex-column align-start justify-center">
                                        <v-checkbox v-model="selected" 
                                            dense
                                            :value="item.id"
                                            hide-details>
                                        </v-checkbox>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="close">
                    {{ $t('Close') }}
                </v-btn>
                <v-btn color="green darken-1" text @click="sendGift" :disabled="!this.selected">
                    {{ $t('Accept') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            default: null 
        },
    },
    data() {
        return {
            dialog: true,
            items: [],
            selected: null
        }
    },
    created () {
        this.dialog = true;
        this.getUsers();
    },
    methods: {
        sendGift(){
            const user = this.items.find(i => i.id === this.selected);
            this.$emit('gift', user);
        },
        close(){
            this.$emit('close');
        },
        async getUsers(){
            this.$store.commit('ui/loader', true);
            try {

                await new Promise(resolve => setTimeout(resolve, 600));
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/user/get`);
                this.items = data;
                this.$store.commit('ui/loader', false);

            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingUsersOnline'), top: true };
                this.$store.commit('ui/loader', false);
                this.$store.commit('ui/snackbar', snackbar);
            }
        },
        minecraftAvatar(id){
            return id ? `https://crafatar.com/avatars/${id}` : `https://i.imgur.com/cAFcdws.png`
        }
    },
};
</script>

<style lang="scss">

</style>