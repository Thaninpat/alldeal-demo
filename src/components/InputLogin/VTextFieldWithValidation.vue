<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <v-text-field
      v-if="typeInput === 'password'"
      v-model="innerValue"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :error-messages="errors"
      :type="showPassword ? 'text' : 'password'"
      :prepend-inner-icon="iconsInput"
      v-bind="$attrs"
      v-on="$listeners"
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      v-else
      v-model="innerValue"
      :error-messages="errors"
      :prepend-inner-icon="iconsInput"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
  },
  props: {
    rules: {
      type: [Object, String],
      default: '',
    },
    value: {
      type: null,
    },
    typeInput: {
      type: String,
      default: 'text',
    },
    iconsInput: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    innerValue: '',
    showPassword: false,
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
}
</script>
