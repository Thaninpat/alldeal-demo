<template>
  <v-container>
    <v-card class="mx-auto" max-width="425" elevation="0">
      <v-card-title>
        Forget password
      </v-card-title>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
        <form @submit.prevent="submit">
          <v-card-text>
            <VTextFieldWithValidation
              rules="required|email"
              v-model="email"
              label="email"
              :iconsInput="'mdi-at'"
              hint="email@example.com"
              persistent-hint
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              rounded
              color="primary"
              type="submit"
              :disabled="invalid || !validated"
            >
              submit
              <v-icon right dark>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-actions>
        </form>
      </ValidationObserver>
    </v-card>
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '../components/InputLogin/VTextFieldWithValidation.vue'
export default {
  components: { ValidationObserver, VTextFieldWithValidation },
  data: () => ({ email: '' }),
  methods: {
    async submit() {
      console.log('Submitting!')
      console.log(`Email : ${this.email}`)
      this.clear()
    },
    async clear() {
      this.email = ''
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
    },
  },
}
</script>

<style></style>
