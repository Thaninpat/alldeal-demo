<template>
  <v-container>
    <v-card class="mx-auto" max-width="425" elevation="0">
      <v-row>
        <v-col class="text-center" cols="12">
          <v-avatar size="150">
            <v-img src="img/icons/android-chrome-512x512.png" />
          </v-avatar>
        </v-col>
        <v-col>
          <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
            <form @submit.prevent="submit">
              <v-card-text>
                <VTextFieldWithValidation
                  rules="required|min:4"
                  v-model="login.username"
                  label="Username"
                  placeholder="Input username"
                  :iconsInput="'mdi-account-outline'"
                />

                <VTextFieldWithValidation
                  rules="required|min:6"
                  v-model="login.password"
                  label="Password"
                  placeholder="Input password"
                  :typeInput="'password'"
                  :iconsInput="'mdi-form-textbox-password'"
                />

                <!-- Do this one yourself! -->
                <div class="text-right">
                  <v-btn to="forgot-password" text small plain>
                    FORGOT PASSWORD
                  </v-btn>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  block
                  rounded
                  color="primary"
                  type="submit"
                  :disabled="invalid || !validated"
                >
                  login
                  <v-icon right dark> mdi-login </v-icon>
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
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '../components/InputLogin/VTextFieldWithValidation.vue'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data: () => ({
    login: {
      username: '',
      password: '',
    },
    returnUrl: '',
    role: [],
    Error: {
      errUser: false,
      errPass: false,
      errMessage: '',
    },
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },

  methods: {
    async submit() {
      try {
        let response = await this.$http.post('/auth/login', this.login)
        let token = response.data.data.token
        localStorage.setItem('user', token)
        let decoded = VueJwtDecode.decode(token)
        if (
          decoded.data.roles[0] == 'ROLE_ADMIN' ||
          decoded.data.roles[0] == 'ROLE_ACCOUNT' ||
          decoded.data.roles[0] == 'ROLE_SALE'
        ) {
          this.$router.push('/')
        }
        if (decoded.data.roles[0] == 'ROLE_AGENT') {
          this.$router.push('/order-summary')
        }
      } catch (error) {
        if (error.response.data.err === 'username') {
          this.Error.errUser = true
          this.Error.errMessage = error.response.data.message
          console.log(this.Error.errMessage)
        }
        if (error.response.data.err === 'password') {
          this.Error.errPass = true
          this.Error.errMessage = error.response.data.message
        }
        console.log(error.response.data.message)
      }
    },
  },

  async created() {
    try {
      if (localStorage.getItem('user')) {
        return this.$router.push('/')
      }
    } catch (error) {
      console.log(error.message)
    }
  },
}
</script>
