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
            @change="onDecode"
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
                  <v-btn icon dark @click="closeCamera">
                    <v-icon v-text="'mdi-close'"></v-icon>
                  </v-btn>
                </div>
                <div class="loading-indicator" v-if="loading">
                  Loading...
                </div>
              </qrcode-stream>

              <div class="camera_fram2 d-flex justify-center pt-5">
                <qrcode-capture @detect="onDetect" />
              </div>
            </div>
          </v-dialog>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <!-- Main -->
      <div class="pt-5">
        <v-snackbar
          v-model="snackbar"
          text
          outlined
          color="error"
          :timeout="2000"
        >
          <div class="text-center">
            Not found
          </div>
        </v-snackbar>

        <v-snackbar
          v-model="errors"
          text
          outlined
          color="error"
          :timeout="2000"
        >
          <div class="text-center">
            {{ error }}
          </div>
        </v-snackbar>
      </div>

      <coupon-detail-list
        v-if="dataMatched === true"
        @isUsed="isUsed"
        :values="values"
      />
    </v-container>
  </base-layout>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import CouponDetailList from '../components/CouponDetailList.vue'
export default {
  components: { CouponDetailList },
  data() {
    return {
      result: null,
      error: '',
      lists: null,
      values: null,
      dataMatched: true,
      isShowCamera: false,
      loading: false,
      used: true,
      avaliable: true,
      snackbar: false,
      errors: false,
    }
  },
  mounted() {},
  methods: {
    closeCamera() {
      this.isShowCamera = !this.isShowCamera
    },
    onDecode(result) {
      this.result = result
      this.FilterData(this.result)
      this.isShowCamera = false
    },
    async onDetect(promise) {
      try {
        const {
          // source, // 'file', 'url' or 'stream'
          // imageData, // raw image data of image/frame
          content, // decoded String or null
          // location, // QR code coordinates or null
        } = await promise

        if (content === null) {
          this.error = 'ERROR: decoded nothing.'
          this.errors = true
          console.log(this.error)
          // decoded nothing
        } else {
          this.result = content
          this.FilterData(this.result)
          this.isShowCamera = false
        }
      } catch (error) {
        this.Error(error)
        // ...
      }
    },
    MatchRedemtion(result) {
      const value = this.lists.filter((i) =>
        i.redemtionCode.toLowerCase().match(result.toLowerCase())
      )
      const valueLength = value.length
      console.log('value', value)
      console.log('length', valueLength)

      if (valueLength > 0) {
        this.snackbar = false
        this.dataMatched = true
        console.log(this.dataMatched)
        return value
      } else {
        this.snackbar = true
        this.dataMatched = false
        console.log(this.dataMatched)
      }
    },
    async onInit(promise) {
      try {
        this.loading = true
        try {
          await promise
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    async FilterData(result) {
      try {
        if (result) {
          console.log({ result })
          if (this.lists) {
            console.log('Lists old', this.lists)
            this.values = this.MatchRedemtion(result)

            console.log('values old', this.values)
          } else {
            const { data } = await axios.get('/data/couponDetail.json/')
            this.lists = data
            console.log('Lists new', this.lists)
            this.values = this.MatchRedemtion(result)
            console.log('values new', this.values)
          }
        } else {
          // setTimeout(() => {
          //   this.snackbar = true
          // }, 500)
          this.snackbar = true
          this.dataMatched = false
          console.log('No data!')
        }
      } catch (error) {
        this.Error(error)
      }
    },
    async isUsed(redemCode, markUsed) {
      this.avaliable = !this.avaliable
      console.log(redemCode)
      console.log(markUsed)
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
          console.log('update:', this.lists)
          alert('The redemption code has been successfully canceled.')
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
          console.log('update:', this.lists)
          alert('The redemption code has been used successfully.')
          this.result = ''
          this.dataMatched = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    Error(error) {
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
  background: rgb(0, 0, 0, 0.5);
}
.camera_fram2 {
  height: 30vh;
  background: rgba(255, 255, 255);
}
.loading-indicator {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: #f1f1f1;
}
</style>
