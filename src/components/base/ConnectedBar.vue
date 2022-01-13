<template>
  <div>
    <v-system-bar v-if="!onLine" dark color="red lighten-1">
      <v-icon>mdi-web-cancel</v-icon>
      <span>Offline mode</span>
    </v-system-bar>
    <v-system-bar v-if="showBackOnline" dark color="green lighten-1">
      <v-icon>mdi-web</v-icon>
      <span>Online again</span>
    </v-system-bar>
  </div>
</template>

<script>
export default {
  props: ['onLine', 'showBackOnline'],
}
</script>
