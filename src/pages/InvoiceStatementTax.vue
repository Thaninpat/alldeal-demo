<template>
  <base-layout pageTitle="Invoice Statement Tax">
    <div>
      <p v-if="torchNotSupported" class="error">
        Torch not supported for active camera
      </p>

      <qrcode-stream
        @decode="onDecode"
        :track="paintOutline"
        :torch="torchActive"
        @init="onInit"
      >
        <v-btn
          dark
          @click="torchActive = !torchActive"
          :disabled="torchNotSupported"
          v-text="torchActive ? 'On' : 'Off'"
        ></v-btn>
      </qrcode-stream>
      <qrcode-capture @detect="onDetect" />
      <p>Result: {{ result }}</p>
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
      result: '',
    }
  },

  methods: {
    onDecode(decodedString) {
      this.result = decodedString
      // alert(this.result)
    },
    async onDetect(promise) {
      try {
        const {
          imageData, // raw image data of image/frame
          content, // decoded String or null
          location, // QR code coordinates or null
        } = await promise
        console.log({ imageData })
        console.log({ content })
        console.log({ location })

        if (content === null) {
          this.result = 'Decode nothing'
          alert('Decode nothing')
          // decoded nothing
        } else {
          if (imageData) this.result = imageData
          else if (content) this.result = content
          else this.result = location
        }
      } catch (error) {
        console.error(error)
      }
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

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
