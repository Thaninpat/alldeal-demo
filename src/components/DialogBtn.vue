<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="status === 'Avaliable'"
          v-text="status === 'Avaliable' ? 'use' : 'cancel'"
          :color="status === 'Avaliable' ? 'success' : 'error'"
          class="px-7"
          dark
          x-small
          rounded
          v-bind="attrs"
          v-on="on"
        />
        <v-btn
          v-else-if="status === 'Used'"
          v-text="status === 'Used' ? 'cancel' : 'use'"
          :color="status === 'Used' ? 'error' : 'success'"
          class="px-7"
          dark
          x-small
          rounded
          v-bind="attrs"
          v-on="on"
        />
        <v-btn
          v-else-if="status === 'Refund'"
          class="px-7"
          x-small
          rounded
          disabled
          v-text="'Refund'"
        />
      </template>
      <v-card>
        <v-card-title class="text-text-h6">
          Are you sure to proceed?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            No
          </v-btn>
          <v-btn color="green darken-1" text @click="isUsed">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['status', 'color'],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    isUsed() {
      this.dialog = false
      this.$emit('isUsed')
    },
  },
}
</script>

<style></style>
