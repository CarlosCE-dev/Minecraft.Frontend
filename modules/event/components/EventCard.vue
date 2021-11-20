<template>
  <v-card class="mx-2 my-2" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">{{ event.title }} </v-list-item-title>
        <v-list-item-subtitle>
            {{ event.description }}
            <div class="my-1">
                {{ eventDate }}
            </div>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
        <v-spacer></v-spacer>
      <v-btn outlined text> More info </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            required: true
        },
    },
    computed: {
        eventDate() {
            return (!this.event.end_date || this.event.start_date) ? this.$t('DatesNotDefined') : `${this.event.start_date} - ${this.event.end_date}`
        }
    },
}
</script>