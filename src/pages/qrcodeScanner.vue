<template>
  <base-layout>
    <div class="scanner">
      <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
      ></StreamBarcodeReader>

      Input Value: {{ text || 'Nothing' }}
      <div class="text-right mr-6 my-10">
        <v-btn icon x-large>
          <label for="btn_scanner">
            <v-icon size="35">mdi-image</v-icon>
          </label>
        </v-btn>
        <ImageBarcodeReader
          class="btn_choose_file"
          id="btn_scanner"
          @decode="onDecode"
          @error="onError"
          :capture="false"
        />
      </div>
    </div>
  </base-layout>
</template>

<script>
import { StreamBarcodeReader, ImageBarcodeReader } from 'vue-barcode-reader'

export default {
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
    onDecode(result) {
      console.log(result)
      this.text = result
      if (this.id) clearTimeout(this.id)
      this.id = setTimeout(() => {
        if (this.text === result) {
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
<style>
.scanner {
  text-align: center;
}
.btn_choose_file {
  display: none;
  visibility: none;
}
</style>
