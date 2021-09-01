<template>
  <v-container>
    <!-- Input data and camera scanner -->
    <v-row>
      <v-col cols="10">
        <v-text-field
          label="Coupon"
          placeholder="Input Coupon number"
          v-model="result"
          @keydown.enter="onDecode(result)"
          clearable
          outlined
        >
        </v-text-field>
      </v-col>
      <v-col class="d-flex justify-start align-start pt-5" cols="2">
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
          <div class="backdrop_scanner">
            <div v-if="loading">Loading...</div>
            <div>
              <v-btn class="btn_close" icon>
                <v-icon
                  @click="closeCamera"
                  v-text="loading ? '' : 'mdi-close'"
                ></v-icon>
              </v-btn>
              <div class="scanner">
                <StreamBarcodeReader
                  @decode="onDecode"
                  @loaded="onLoaded"
                ></StreamBarcodeReader>
              </div>
              <div v-if="!loading" class="text-right ma-5">
                <v-btn icon x-large>
                  <label for="btn_scanner">
                    <v-icon size="35" v-text="'$Image'" />
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
              <!-- <div v-if="!loading">Input Value: {{ result || 'Nothing' }}</div> -->
            </div>
          </div>
        </v-dialog>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- Error Notification -->
    <div class="pt-5">
      <v-snackbar v-model="isData" text outlined color="error" :timeout="2000">
        <div class="text-center">
          Not found
        </div>
      </v-snackbar>

      <v-snackbar v-model="errors" text outlined color="error" :timeout="2000">
        <div class="text-center">
          {{ error }}
        </div>
      </v-snackbar>
    </div>
    <!-- Main detail -->
    <coupon-detail-list
      v-if="dataMatched === true"
      @isUsed="isUsed"
      :values="values"
    />
    <!-- dialog -->
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { StreamBarcodeReader, ImageBarcodeReader } from 'vue-barcode-reader'

import CouponDetailList from './CouponDetailList.vue'
export default {
  components: { CouponDetailList, StreamBarcodeReader, ImageBarcodeReader },
  data() {
    return {
      result: '',
      error: '',
      lists: null,
      values: null,
      dataMatched: true,
      isShowCamera: false,
      id: null,
      loading: true,
      used: true,
      avaliable: true,
      isData: false,
      errors: false,
    }
  },
  methods: {
    closeCamera() {
      this.isShowCamera = !this.isShowCamera
    },
    onDecode(res) {
      // console.log({ res })
      this.result = res
      this.filterData(this.result)
      this.isShowCamera = false
      if (this.id) clearTimeout(this.id)
      this.id = setTimeout(() => {
        if (this.result === res) {
          console.log(`id: ${this.id}`)
          this.result = ''
        }
      }, 5000)
    },
    onLoaded() {
      this.loading = false
    },
    onError(error) {
      this.errors = true
      this.error = error.message
      console.warn(error.message)
    },

    matchRedemtion(result) {
      const value = this.lists.filter((i) =>
        i.redemtionCode.toLowerCase().match(result.toLowerCase())
      )
      const valueLength = value.length
      if (valueLength > 0) {
        this.isData = false
        this.dataMatched = true
        return value
      } else {
        this.isData = true
        this.dataMatched = false
      }
    },
    async filterData(result) {
      try {
        if (result) {
          if (this.lists) {
            this.values = this.matchRedemtion(result)
          } else {
            const { data } = await axios.get('/data/couponDetail.json/')
            this.lists = data
            this.values = this.matchRedemtion(result)
          }
        } else {
          this.isData = true
          this.dataMatched = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async isUsed(redemCode, markUsed) {
      this.avaliable = !this.avaliable
      try {
        let updatedAt = moment(Date.now()).format('DD/M/YYYY hh:mm')
        // Used Coupon
        if (markUsed === true || markUsed === null) {
          let update = await this.lists.map((item) => {
            if (item.redemtionCode === redemCode) {
              return {
                ...item,
                usedDate: updatedAt,
                status: 'Avaliable',
                markUsed: false,
              }
            } else {
              return item
            }
          })
          this.lists = update
          // alert('The redemption code has been successfully canceled.')
          this.result = ''
          this.dataMatched = false
        }
        // Avaliable Coupon
        else {
          let update = await this.lists.map((item) => {
            if (item.redemtionCode === redemCode) {
              return {
                ...item,
                usedDate: updatedAt,
                status: 'Used',
                markUsed: true,
              }
            } else {
              return item
            }
          })
          this.lists = update
          // alert('The redemption code has been used successfully.')
          this.result = ''
          this.dataMatched = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    // Error(error) {
    //   if (error.name === 'NotAllowedError') {
    //     this.error = 'ERROR: you need to grant camera access permission'
    //   } else if (error.name === 'NotFoundError') {
    //     this.error = 'ERROR: no camera on this device'
    //   } else if (error.name === 'NotSupportedError') {
    //     this.error = 'ERROR: secure context required (HTTPS, localhost)'
    //   } else if (error.name === 'NotReadableError') {
    //     this.error = 'ERROR: is the camera already in use?'
    //   } else if (error.name === 'OverconstrainedError') {
    //     this.error = 'ERROR: installed cameras are not suitable'
    //   } else if (error.name === 'StreamApiNotSupportedError') {
    //     this.error = 'ERROR: Stream API is not supported in this browser'
    //   } else if (error.name === 'InsecureContextError') {
    //     this.error =
    //       'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    //   } else {
    //     this.error = `ERROR: Camera error (${error.name})`
    //   }
    //   this.errors = true
    // },
  },
}
</script>

<style lang="scss" scoped>
.backdrop_scanner {
  z-index: -1;
  background: #fff;
  height: 100vh;
}
.scanner {
  text-align: center;
}
.btn_choose_file {
  display: none;
  visibility: none;
}
/* .btn_close {
  z-index: 99;
} */
</style>
