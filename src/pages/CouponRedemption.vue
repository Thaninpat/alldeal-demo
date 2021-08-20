<template>
  <base-layout pageTitle="Coupon Redemption">
    <v-container>
      <!-- Input data and camera scanner -->
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
            <div class="backdrop_top">
              <qrcode-stream
                v-if="isShowCamera"
                @decode="onDecode"
                @init="onInit"
                :track="paintOutline"
                :torch="torchActive"
              >
                <div>
                  <div class="pt-4 pl-3">
                    <v-btn icon dark @click="closeCamera">
                      <v-icon v-text="loading ? '' : 'mdi-close'"></v-icon>
                    </v-btn>
                  </div>
                  <div v-if="loading" class="loading-indicator">
                    Loading...
                  </div>
                  <div v-else class="backdrop_fram">
                    <div class="crop_fram"></div>
                  </div>
                </div>
              </qrcode-stream>
              <div v-if="!loading" class="backdrop_bot pt-5">
                <div class="d-flex justify-center ">
                  <v-btn
                    icon
                    @click="onTorchActive"
                    :disabled="torchNotSupported"
                  >
                    <v-icon
                      v-text="torchActive ? '$FlashlightOff' : '$Flashlight'"
                      size="25"
                    ></v-icon>
                  </v-btn>
                </div>
                <div class="pt-10 px-2">
                  <v-alert
                    v-model="torchNotSupported"
                    colored-border
                    border="left"
                    type="error"
                    elevation="2"
                  >
                    Flashlight not supported.
                  </v-alert>
                </div>
                <!-- <qrcode-capture @detect="onDetect" /> -->
              </div>
            </div>
          </v-dialog>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!-- Notification -->
      <div class="pt-5">
        <v-snackbar
          v-model="isData"
          text
          outlined
          color="error"
          :timeout="2000"
        >
          <div class="text-center">
            {{ error }}
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
      <!-- Main -->
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
      result: '',
      error: '',
      lists: null,
      values: null,
      dataMatched: true,
      isShowCamera: false,
      loading: false,
      used: true,
      avaliable: true,
      isData: false,
      errors: false,
      torchActive: false,
      torchNotSupported: false,
    }
  },
  mounted() {},
  methods: {
    onTorchActive() {
      this.torchActive = !this.torchActive
      console.log(this.torchActive)
    },
    closeCamera() {
      this.isShowCamera = !this.isShowCamera
    },
    async onDecode(result) {
      try {
        this.result = await result
        this.filterData(this.result)
        this.isShowCamera = false
      } catch (error) {
        console.error(error)
      }
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
        this.error = 'Not found'
        this.dataMatched = false
      }
    },
    async onInit(promise) {
      try {
        this.loading = true
        try {
          const { capabilities } = await promise
          console.log(capabilities)
          this.torchNotSupported = !capabilities.torch
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      } catch (error) {
        console.error(error)
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
        this.Error(error)
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
          alert('The redemption code has been used successfully.')
          this.result = ''
          this.dataMatched = false
        }
      } catch (error) {
        console.log(error)
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
      this.errors = true
    },
  },
}
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
.backdrop_top {
  /* background: rgba(0, 0, 0, 0.8); */
  height: 70vh;
}
.backdrop_bot {
  background: rgb(255, 255, 255);
  height: 30vh;
}
/* .camera_fram {
  height: 100vh;
  background: rgb(255, 255, 255);
} */
/* .camera {
  height: 70vh;
  background: rgb(0, 0, 0, 0.5);
} */
/* .camera_fram2 {
  background: rgba(255, 255, 255);
} */
.backdrop_fram {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10%;
}
.crop_fram {
  font-weight: 600;
  height: 260px;
  width: 260px;
  border: rgb(255, 255, 255) solid 3px;
  border-radius: 10px;
  animation: blink 800ms infinite;
}
@keyframes blink {
  50% {
    border-color: rgba(255, 255, 255, 0.1);
  }
}
.loading-indicator {
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #262626;
  padding-top: 75px;
}
</style>
