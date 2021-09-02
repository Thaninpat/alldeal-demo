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
        <v-card-title class="justify-center">
          <strong>Confirm</strong>
        </v-card-title>
        <v-card-text class="text-center text--primary">
          Are you sure?
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-space-around">
          <v-btn class="px-9" color="primary" text @click="onDialog">
            cancel
          </v-btn>
          <v-btn class="px-9" color="primary" text @click="isUsed">
            confirm
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
    onDialog() {
      this.dialog = false
    },
    isUsed() {
      this.dialog = false
      this.$emit('isUsed')
    },
  },
}
</script>

<style></style>
