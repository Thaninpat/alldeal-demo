<template>
  <base-layout>
    <div id="scanner">
      <div class="hello">
        <StreamBarcodeReader
          @decode="(a) => onDecode(a)"
          @loaded="() => onLoaded()"
        ></StreamBarcodeReader>

        Input Value: {{ text || 'Nothing' }}
      </div>
      <div>
        <ImageBarcodeReader
          @decode="onDecode"
          @error="onError"
        ></ImageBarcodeReader>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { StreamBarcodeReader, ImageBarcodeReader } from 'vue-barcode-reader'

export default {
  name: 'HelloWorld',
  components: {
    StreamBarcodeReader,
    ImageBarcodeReader,
  },
  data() {
    return {
      text: '',
      id: null,
    }
  },
  props: {
    msg: String,
  },
  methods: {
    onDecode2(result) {
      console.log(result)
    },
    onDecode(a) {
      console.log(a)
      this.text = a
      if (this.id) clearTimeout(this.id)
      this.id = setTimeout(() => {
        if (this.text === a) {
          this.text = ''
        }
      }, 5000)
    },
    onLoaded() {
      console.log('load')
    },
    onError(error) {
      console.log(error)
    },
  },
}
</script>
<style scoped>
#scanner {
  text-align: center;
}
</style>
