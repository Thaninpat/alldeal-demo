<template>
  <v-container>
    <div class="not_found_page_landing text-center">
      <h1 class="header_not_found">404</h1>
      <h2 class="title_not_found">Page Not Found</h2>
      <p class="title_not_found">
        The resource request could not be found on this server
      </p>
      <v-btn to="/home" color="primary">go to homepage</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.not_found_page_landing {
  color: hsl(0, 0%, 40%);
}
.header_not_found {
  font-size: 8rem;
}
.title_not_found {
  font: 4rem;
}
</style>
