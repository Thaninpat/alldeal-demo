<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="black" v-bind="attrs" v-on="on">
        filter
      </v-btn>
    </template>
    <v-list>
      <div v-for="(list, idx) in filterLists" :key="idx">
        <v-list-item @click="filter(list)">
          <v-list-item-title>
            <a>{{ list }}</a>
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: ['filterLists'],
  data: () => ({}),
  methods: {
    async filter(filterBy) {
      this.$emit('filter', filterBy)
    },
  },
}
</script>

<style></style>
