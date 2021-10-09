<template>
  <div>
    <v-app-bar absolute color="white" elevate-on-scroll>
      <v-btn icon to="/login">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Forget password</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-card class="mx-auto mt-6" max-width="425" elevation="0">
        <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
          <form @submit.prevent="submit">
            <v-card-text>
              <VTextFieldWithValidation
                rules="required|email"
                v-model="email"
                label="Email"
                placeholder="Input email"
                :iconsInput="'mdi-email-outline'"
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
  </div>
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
