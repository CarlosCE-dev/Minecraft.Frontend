<template>
    <v-card class="ml-2">
        <v-card-title>Ranking</v-card-title>
        <v-card-text>
            <template>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="small-th"></th>
                                <th class="text-left"></th>
                                <th class="text-left">
                                    Nombre
                                </th>
                                <th class="text-center">
                                    Pejecoins
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in users" :key="item.id">
                                <td class="small-th">{{ index + 1 }}</td>
                                <td>
                                    <v-img height="40" width="40" :src="minecraftAvatar(item.minecraft_id)"></v-img>
                                </td>
                                <td>{{ item.minecraft_username }}</td>
                                <td class="text-center">{{ item.money }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        users: {
            type: Array,
            required: true
        },
    },
    methods: {
        minecraftAvatar(id){
            return id ? `https://crafatar.com/avatars/${id}` : `https://i.imgur.com/cAFcdws.png`
        }
    },
}
</script>

<style lang="scss">
.small-th {
    width:5px;
}
</style>