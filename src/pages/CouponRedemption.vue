<template>
  <base-layout pageTitle="Coupon Redemption">
    <v-container>
      <v-row>
        <v-col cols="9">
          <v-text-field
            label="Coupon"
            placeholder="Input Coupon number"
            outlined
            v-model="result"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3" class="d-flex justify-start align-start pt-5">
          <v-dialog
            v-model="isShowCamera"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-html="'$QrcodeScan'"></v-icon>
              </v-btn>
            </template>
            <div class="camera_fram">
              <qrcode-stream
                v-if="isShowCamera"
                @decode="onDecode"
                @init="onInit"
              >
                <div class="pt-4 pl-3">
                  <v-btn icon dark @click="openCamera">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </qrcode-stream>
            </div>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </base-layout>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      error: '',
      isShowCamera: false,
    }
  },
  methods: {
    openCamera() {
      this.isShowCamera = !this.isShowCamera
    },
    onDecode(result) {
      this.result = result
      this.isShowCamera = false
    },

    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error =
            'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
          this.error = `ERROR: Camera error (${error.name})`
        }
      }
    },
  },
}
</script>

<style>
.error {
  font-weight: bold;
  color: red;
}
.camera_fram {
  height: 70vh;
  background: rgba(0, 0, 0, 0.5);
}
</style>
