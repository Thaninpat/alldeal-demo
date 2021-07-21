<template>
  <v-col class="d-flex justify-center" cols="2.4">
    <strong>{{ item.name }}</strong>
  </v-col>
</template>

<script>
export default {
  props: ['item'],
}
</script>
