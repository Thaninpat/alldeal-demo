<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ico-paid {
  background: url('/icons/paid.ico');
}
.ico-coupon {
  background: url('/icons/coupon.ico');
}
.ico-cart {
  background: url('/icons/cart.ico');
}
.ico-paid,
.ico-coupon,
.ico-cart {
  display: block;
  background-size: cover;
  width: 18px;
  height: 18px;
}
.item-list {
  font-size: 13px;
}
.item-list-detail {
  font-size: 12px;
}
</style>
