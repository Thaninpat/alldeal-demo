<template>
  <v-container>
    <!-- Input data and camera scanner -->
    <v-row>
      <v-col cols="10">
        <v-text-field
          enterkeyhint="go"
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
              <v-icon v-text="'$Qrcode'"></v-icon>
            </v-btn>
          </template>
          <div class="backdrop_scanner">
            <div v-if="loading">Loading...</div>
            <div>
              <v-btn class="btn_close" icon>
                <v-icon
                  @click="closeCamera"
                  v-text="loading ? '' : '$Close'"
                ></v-icon>
              </v-btn>
              <div class="scanner">
                <StreamBarcodeReader
                  v-if="isShowCamera"
                  @decode="onDecode"
                  @loaded="onLoaded"
                />
              </div>
              <div v-if="!loading && isShowCamera" class="text-right ma-5">
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
            </div>
          </div>
        </v-dialog>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- Error Notification -->
    <div class="pt-5">
      <dialog-alert
        v-if="haveData"
        @isError="isData"
        :errors="haveData"
        :title="title"
        :text="error"
      />
      <dialog-alert
        v-if="errors"
        @isError="isError"
        :errors="errors"
        :title="title"
        :text="error"
      />
      <dialog-alert
        v-if="couponExpire"
        @isError="isExpire"
        :errors="couponExpire"
        :title="title"
        :text="error"
      />
    </div>
    <!-- Main detail -->
    <coupon-detail-list
      v-if="dataMatched === true"
      @isUsed="isUsed"
      :values="values"
    />
  </v-container>
</template>

<script>
import moment from 'moment'
import { ImageBarcodeReader, StreamBarcodeReader } from 'vue-barcode-reader'

import CouponDetailList from './CouponDetailList.vue'
import DialogAlert from './DialogAlert.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CouponDetailList,
    StreamBarcodeReader,
    ImageBarcodeReader,
    DialogAlert,
  },
  data: () => ({
    error: '',
    title: '',
    result: null,
    lists: null,
    values: null,
    dataMatched: true,
    isShowCamera: false,
    id: null,
    used: true,
    available: true,
    haveData: false,
    couponExpire: false,
    loading: true,
    errors: false,
  }),
  computed: {
    ...mapGetters({
      coupons: 'supplier/coupons',
      markCouponUsed: 'supplier/markCouponUsed',
    }),
  },
  methods: {
    ...mapActions({
      getCoupons: 'supplier/getCoupons',
      getMarkCouponUsed: 'supplier/getMarkCouponUsed',
    }),
    closeCamera() {
      this.isShowCamera = !this.isShowCamera
      this.loading = true
    },

    onDecode(content) {
      this.filterData(content)
      this.result = content
      // console.log('Result:', content)
    },
    onLoaded() {
      this.loading = false
    },
    onError(error) {
      this.Error(error)
      console.warn(error.name, error.message)
    },

    matchRedemption(value) {
      if (value.errorCode == '999') {
        this.isData(true)
        this.dataMatched = false
      } else {
        this.isData(false)
        this.dataMatched = true
        this.isShowCamera = false
        let couponsItems = [value]
        this.values = couponsItems.map(this.getDisplay)
        // console.log('values: ', this.values)
      }
    },

    async filterData(result) {
      try {
        if (result) {
          await this.getCoupons({
            path: '/coupondetail',
            method: 'POST',
            data: { couponCode: result },
          })
          this.matchRedemption(this.coupons.data)
        } else {
          console.log('No data list')
          this.isData(true)
          this.dataMatched = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    getDisplay(list) {
      if (list) {
        return {
          couponCode: list.couponCode,
          orderNo: list.orderNo,
          orderItemNo: list.orderItemNo,
          redeemStartTms: moment(list.redeemStartTms).format('DD/MM/YY hh:mm'),
          redeemEndTms: moment(list.redeemEndTms).format('DD/MM/YY hh:mm'),
          redeemedTms:
            list.redeemedTms == null
              ? null
              : moment(list.redeemedTms).format('DD/MM/YY hh:mm'),
          redeemedBy: list.redeemedBy,
          status: list.redeemedTms == null ? 'Available' : 'Used',
        }
      } else {
        return null
      }
    },
    async isUsed(couponCode) {
      this.available = !this.available
      try {
        await this.getMarkCouponUsed({
          path: '/couponredemptions',
          method: 'POST',
          data: { couponCode: couponCode },
        })
        const markCoupon = this.markCouponUsed
        // console.log(markCoupon)
        if (markCoupon.status.code === 'OD999') {
          const res = {
            couponExpire: true,
            errorCode: markCoupon.status.code,
            messageEn: markCoupon.status.messageEn,
          }
          this.isExpire(res)
        } else {
          await this.filterData(couponCode)
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    isData(haveData) {
      this.haveData = haveData
      this.title = 'Not found'
      this.error = 'No information found'
    },
    isExpire(res) {
      this.couponExpire = res.couponExpire
      this.title = 'Error code: ' + res.errorCode
      this.error = res.messageEn
    },
    isError(errors) {
      this.errors = errors
      this.title = 'Error'
    },
    Error(error) {
      if (error.name === 'NotAllowedError') {
        this.error = 'you need to grant camera access permission'
      } else if (error.name === 'NotFoundError') {
        this.error = 'no camera on this device'
      } else if (error.name === 'NotSupportedError') {
        this.error = 'secure context required (HTTPS, localhost)'
      } else if (error.name === 'NotReadableError') {
        this.error = 'is the camera already in use?'
      } else if (error.name === 'OverconstrainedError') {
        this.error = 'installed cameras are not suitable'
      } else if (error.name === 'StreamApiNotSupportedError') {
        this.error = 'Stream API is not supported in this browser'
      } else if (error.name === 'InsecureContextError') {
        this.error =
          'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
      } else {
        this.error = `${error.message}`
      }
      this.isError(true)
    },
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
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.loading-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
</style>
