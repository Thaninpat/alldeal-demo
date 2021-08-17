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
            </div>
            <div class="d-flex justify-center pt-5">
              <qrcode-capture @decode="onDecode" />
            </div>
          </v-dialog>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <!-- Main -->
      <!-- <div v-if="dataMatched === false" class="text-center pt-5">
        <v-snackbar v-model="dataMatched" :timeout="1500">
          Not found
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="dataMatched = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div> -->
      <div v-if="dataMatched === false" class="text-center pt-5">
        Not found !
      </div>

      <coupon-detail-list
        v-else-if="dataMatched === true"
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
      result: '',
      error: '',
      lists: null,
      values: null,
      dataMatched: true,
      isShowCamera: false,
      loading: false,
      used: true,
      avaliable: true,
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
    MatchRedemtion(result) {
      const value = this.lists.filter((i) =>
        i.redemtionCode.toLowerCase().match(result.toLowerCase())
      )
      const valueLength = value.length
      console.log('value', value)
      console.log('length', valueLength)

      if (valueLength > 0) {
        this.dataMatched = true
        console.log(this.dataMatched)
        return value
      } else {
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
  background: rgba(0, 0, 0, 0.5);
}
.loading-indicator {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: #f1f1f1;
}
.col.col-6 {
  padding: 1px 0;
  font-size: 12px;
  font-weight: bold;
}
</style>
