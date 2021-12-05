<template>
  <v-card class="mx-2 my-2" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">{{ event.title }} </v-list-item-title>
        <v-list-item-subtitle>
            {{ event.description }}
            <div class="my-1">
                <v-icon left small>mdi-calendar</v-icon>
                {{ eventDate }}
            </div>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined text color="orange" v-if="crudActions" :to="{ name: 'admin-group-id', params: { id: event.id }}"> Manager </v-btn>
        <v-btn outlined text color="orange" v-if="crudActions" @click="edit"> Edit </v-btn>
        <v-btn outlined text> More info </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { format } from 'date-fns'

export default {
    props: {
        event: {
          type: Object,
          required: true
        },
        crudActions: {
          type: Boolean,
          default: false
        }
    },
    computed: {
        eventDate() {
          return !this.event.end_date || !this.event.start_date 
            ? this.$t('DatesNotDefined') 
            : `${format(new Date(this.event.start_date), 'MMMM d yyyy')} - ${format(new Date(this.event.end_date), 'MMMM d yyyy')}`
        }
    },
    methods: {
      edit() {
        this.$emit('edit', this.event);
      }
    },
}
</script>