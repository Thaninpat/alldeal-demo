<template>
  <div>
    <v-app-bar absolute color="white" elevate-on-scroll>
      <v-toolbar-title>Reset password</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-card class="mx-auto mt-8" max-width="425" elevation="0">
        <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
          <form @submit.prevent="submit">
            <v-card-text>
              <VTextFieldWithValidation
                rules="required|min:6"
                v-model="reset.password"
                label="Password"
                placeholder="Input Password"
                :typeInput="'password'"
              />
              <VTextFieldWithValidation
                rules="required|min:6"
                v-model="reset.confirmPassword"
                label="Confirm Password"
                placeholder="Input Confirm Password"
                :typeInput="'password'"
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
                v-text="Error.errMessage === '' ? '' : Error.errMessage"
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
        <dialog-alert
          v-if="Error.errToken"
          @isError="isError"
          :errors="Error.errToken"
          :title="Error.errMessageTitle"
          :text="Error.errMessage"
        />
        <dialog-alert
          v-if="Error.errMatched"
          @isError="isError"
          :errors="Error.errMatched"
          :title="Error.errMessageTitle"
          :text="Error.errMessage"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from './InputLogin/VTextFieldWithValidation.vue'
import DialogAlert from './DialogAlert.vue'
// import VueJwtDecode from 'vue-jwt-decode'

export default {
  components: { ValidationObserver, VTextFieldWithValidation, DialogAlert },
  data: () => ({
    reset: { password: '', confirmPassword: '' },
    Error: {
      errToken: false,
      errMatched: false,
      errMessage: '',
      errMessageTitle: '',
    },
    Success: {
      status: false,
      title: '',
      text: '',
    },
    token: '',
    loading: false,
  }),
  mounted() {
    let url_string = window.location.href
    let url = new URL(url_string)
    let token = url.searchParams.get('token')
    this.token = token
  },
  methods: {
    async submit() {
      try {
        this.loading = true
        if (this.reset.password !== this.reset.confirmPassword) {
          this.Error.errMatched = true
          this.Error.errMessageTitle = 'Do not match'
          this.Error.errMessage = 'Passwords do not match please try again'
          this.clear()
        } else {
          let response = await this.$http.post('/reset-password', this.reset, {
            headers: {
              Authorization: this.token,
            },
          })
          this.Success.status = true
          this.Success.title = 'Successful'
          this.Success.text = response.data.message
          this.clear()
        }
      } catch (error) {
        this.Error.errToken = true
        this.Error.errMessageTitle = 'Token expired'
        this.Error.errMessage =
          error.response.data.message + ', Please try again.'
        this.clear()
      }
    },
    clear() {
      this.reset.password = ''
      this.reset.confirmPassword = ''
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
      this.loading = false
    },
    isError(value) {
      this.Error.errToken = value
      this.Error.errMatched = value
    },
    isSuccess(value) {
      this.Success.status = value
      this.$router.replace('/login')
    },
  },
}
</script>
