<template>
    <div>
        <v-menu left bottom>

            <template v-slot:activator="{ on, attrs }">
                <v-btn color="purple-light" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list shaped>
                <v-subheader color="primary">Menu</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        
        </v-menu>
    </div>
</template>

<script>

export default {
    props: ['value'],
    data: () => ({
        items: [
            { text: 'Perfil', icon: 'mdi-account' },
            { text: 'Ajustes', icon: 'mdi-cog' },
            { text: 'Acerca de', icon: 'mdi-information-outline' },
        ],
    }),
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    },
}
</script>