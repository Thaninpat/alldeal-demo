<template>
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
        <qrcode-stream v-if="isShowCamera" @decode="onDecode" @init="onInit">
          <div class="pt-4 pl-3">
            <v-btn icon dark @click="openCamera">
              <v-icon v-text="'$Close'" />
            </v-btn>
          </div>
        </qrcode-stream>
      </div>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  props: {
    isShowCamera: {
      type: Boolean,
    },
  },
}
</script>

<style></style>
