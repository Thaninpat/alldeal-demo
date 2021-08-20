<template>
  <base-layout pageTitle="Invoice Statement Tax">
    <div>
      <p v-if="torchNotSupported" class="error">
        Torch not supported for active camera
      </p>

      <qrcode-stream :torch="torchActive" @init="onInit">
        <v-btn
          dark
          @click="torchActive = !torchActive"
          :disabled="torchNotSupported"
          v-text="torchActive ? 'On' : 'Off'"
        ></v-btn>
      </qrcode-stream>
    </div>
  </base-layout>
</template>

<script>
export default {
  data() {
    return {
      torchActive: false,
      torchNotSupported: false,
      error: '',
    }
  },

  methods: {
    // onDecode(decodedString) {
    //   // ...
    // },

    async onInit(promise) {
      try {
        const { capabilities } = await promise
        console.log(capabilities)
        this.torchNotSupported = !capabilities.torch
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
        this.errors = true
      } finally {
        // hide loading indicator
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
