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
                  rules="required|min:3"
                  v-model="username"
                  label="username"
                  :iconsInput="'mdi-account-outline'"
                />

                <!-- <VTextFieldWithValidation
                  rules="required|email"
                  v-model="email"
                  label="E-mail"
                /> -->
                <VTextFieldWithValidation
                  rules="required|min:3"
                  v-model="password"
                  label="password"
                  :typeInput="'password'"
                  :iconsInput="'mdi-form-textbox-password'"
                />

                <!-- Do this one yourself! -->
                <div class="text-right">
                  <v-btn to="forgot-password" text small plain
                    >FORGOT PASSWORD</v-btn
                  >
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
                  <v-icon right dark>
                    mdi-login
                  </v-icon>
                </v-btn>
              </v-card-actions>
              <!-- <v-card-actions>
                <v-btn text color="error" @click="clear">Clear</v-btn>
                <v-btn text color="warning" @click="validate">Validate</v-btn>
              </v-card-actions> -->
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

export default {
  data: () => ({
    username: '',
    password: '',
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  methods: {
    async clear() {
      this.username = this.password = ''
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
    },
    async submit() {
      console.log('Submitting!')
      console.log(`Username : ${this.username}\nPassword: ${this.password}`)
      this.clear()
    },
  },
}
</script>
