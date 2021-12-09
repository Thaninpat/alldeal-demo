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
                v-model="reset.email"
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
                :loading="loading"
              >
                submit
                <v-icon right dark>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </v-card-actions>
            <div class=" text-center">
              <label
                class="red--text"
                v-text="Error.errMessage ? Error.errMessage : ''"
              ></label>
            </div>
          </form>
        </ValidationObserver>
      </v-card>
      <div class="pt-5">
        <dialog-alert
          v-if="Success.status"
          @isError="isSuccess"
          :errors="Success.status"
          :title="Success.title"
          :text="Success.text"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '../components/InputLogin/VTextFieldWithValidation.vue'
import DialogAlert from './DialogAlert.vue'

export default {
  components: { ValidationObserver, VTextFieldWithValidation, DialogAlert },
  data: () => ({
    reset: { email: '' },
    Success: {
      status: false,
      title: '',
      text: '',
    },
    Error: {
      errMessage: '',
    },
    loading: false,
  }),
  methods: {
    async submit() {
      try {
        this.loading = true
        let response = await this.$http.post('/forgot-password', this.reset)
        this.Success.status = true
        this.Success.title = 'Successful'
        this.Success.text = response.data.message
        this.clear()
      } catch (error) {
        this.Error.errMessage = error.response.data.message
        console.log(error.response.data.message)
        console.log(error.response.config.data)

        this.clear()
      }
    },
    clear() {
      this.reset.email = ''
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
      this.loading = false
    },
    isSuccess(value) {
      this.Success.status = value
      this.$router.replace('/login')
      this.clear()
    },
  },
}
</script>
