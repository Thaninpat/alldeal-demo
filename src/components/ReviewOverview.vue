<template>
  <v-list-item three-line>
    <v-list-item-content class="text-center">
      <!-- ซ้าย -->
      <v-list-item-title class="text-h4 font-weight-bold">
        {{ all.average }}
      </v-list-item-title>
      <v-rating
        v-model="all.average"
        background-color="#eee"
        color="orange"
        x-small
        half-increments
        readonly
      ></v-rating>
      <v-list-item-subtitle>
        {{ all.items.length }} rating
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content>
      <!-- ขวา -->
      <div class="rating_container">
        <div class="text-caption font-weight-bold text--secondary mr-1">5</div>
        <v-progress-linear
          :value="(all.star5 * 100) / all.items.length"
          color="orange"
          background-color="#eee"
          rounded
          height="4"
        />
      </div>
      <div class="rating_container">
        <div class="text-caption font-weight-bold text--secondary mr-1">4</div>
        <v-progress-linear
          :value="(all.star4 * 100) / all.items.length"
          color="orange"
          background-color="#eee"
          rounded
          height="4"
        />
      </div>
      <div class="rating_container">
        <div class="text-caption font-weight-bold text--secondary mr-1">3</div>
        <v-progress-linear
          :value="(all.star3 * 100) / all.items.length"
          color="orange"
          background-color="#eee"
          rounded
          height="4"
        />
      </div>
      <div class="rating_container">
        <div class="text-caption font-weight-bold text--secondary mr-1">2</div>
        <v-progress-linear
          :value="(all.star2 * 100) / all.items.length"
          color="orange"
          background-color="#eee"
          rounded
          height="4"
        />
      </div>
      <div class="rating_container">
        <div class="text-caption font-weight-bold text--secondary mr-1">1</div>
        <v-progress-linear
          :value="(all.star1 * 100) / all.items.length"
          color="orange"
          background-color="#eee"
          rounded
          height="4"
        />
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ['all'],
}
</script>

<style lang="scss" scoped>
.rating_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -5px;
}
</style>
