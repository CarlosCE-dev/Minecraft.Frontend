<template>
    <v-navigation-drawer color="purple-light" dark left app expand-on-hover :fixed="fix" floating persistent v-model="drawer">
            
        <v-list-item dense class="navigation__profile animate__animated animate__fadeInLeft animate__faster">
            <v-list-item-avatar>
                <v-img
                    height="40"
                    width="40"
                    src="https://crafatar.com/avatars/7338f82a17934955947d4b57e9401da0">
                </v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Sandra Adams</v-list-item-title>
                <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
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
export default {
    props: ['value','fixed'],
    data: () => ({
        
    }),
    watch: {
        fixed: function( fixed ) {
            this.fix = fixed;
        }
    },
    data: () => ({
        fix: false,
        items: [
            { name: 'Dashboard', route: "/", icon: 'mdi-home' },
            { name: 'Admin',  route: "/admin", icon: 'mdi-shield-key' }, 
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
        }
    },
    methods: {
        logOut() {
            localStorage.clear();
            this.$store.commit('auth/setAuth', false );
            this.$router.push({ path: "/auth/login" });
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