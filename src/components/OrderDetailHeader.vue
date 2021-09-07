<template>
  <v-col class="d-flex justify-sm-center" cols="2.4">
    <span class="title_header">{{ item.name }}</span>
  </v-col>
</template>

<script>
export default {
  // props: ['item'],
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
}
</script>
<style lang="scss" scoped>
.title_header {
  font-size: 14px;
  font-weight: 600;
}
</style>
