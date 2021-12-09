<template>
  <v-row justify="center">
    <v-dialog v-model="errors" persistent max-width="300">
      <v-card>
        <v-card-title class="justify-center">
          <strong>{{ title }}</strong>
        </v-card-title>
        <v-card-text class="text-center text--primary">{{ text }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn color="primary" text block @click="isError(false)">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    errors: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },

  methods: {
    isError(value) {
      this.$emit('isError', value)
    },
  },
}
</script>

<style></style>
