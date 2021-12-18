<template>
    <v-navigation-drawer color="brown-primary" dark left app expand-on-hover :fixed="fix" floating persistent v-model="drawer" permanent>
            
        <v-list-item dense class="navigation__profile animate__animated animate__fadeInLeft animate__faster" v-if="user">
            <v-list-item-avatar>
                <v-img
                    height="40"
                    width="40"
                    :src="minecraftAvatar">
                </v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ user.minecraft_username }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav dense>
            <v-list-item class="animate__animated animate__fadeInLeft animate__faster" :to="item.route" v-for="(item, index) in items" :key="index">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item>
        </v-list>

        <template v-slot:append>
           <v-list nav dense>
                <v-list-item link class="animate__animated animate__fadeInLeft animate__faster" @click="logOut">
                    <v-list-item-icon>
                        <v-icon>mdi-login-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Log out</v-list-item-title>
                </v-list-item>
            </v-list>
        </template>
      
    </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    props: ['value','fixed'],
    watch: {
        fixed: function( fixed ) {
            this.fix = fixed;
        }
    },
    data: () => ({
        fix: false,
        items: [
            { name: 'Events',  route: "/event", icon: 'mdi-font-awesome', admin: false }, 
            { name: 'Rewards',  route: "/reward", icon: 'mdi-gift', admin: false }, 
            { name: 'Store',  route: "/shop", icon: 'mdi-cart', admin: false }, 
            { name: 'Admin',  route: "/admin/reward", icon: 'mdi-shield-key', admin: true }, 
        ],
    }),
    computed: {
        drawer: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value)
            }
        },
        ...mapState('auth', [
            "user"
        ]),
        ...mapGetters('auth', [
            "isAdminOrModerator"
        ]),
        minecraftAvatar(){
            return this.user.minecraft_id ? `https://crafatar.com/avatars/${this.user.minecraft_id}` : `https://i.imgur.com/cAFcdws.png`
        },
    },
    methods: {
        logOut() {
            localStorage.clear();
            this.$axios.setToken(false);
            this.$store.commit('auth/logOut');
            this.$router.push({ path: "auth-login" });
        }
    }, 
    created () {
        if (!this.isAdminOrModerator){
            this.items = this.items.filter(i => !i.admin );
        }
    },
}
</script>

<style lang="scss" scoped>
h1{ 
    color: $deep;
}

.navigation__profile{
    padding-left: 8px !important;
    padding-right: 8px !important;
}
</style>