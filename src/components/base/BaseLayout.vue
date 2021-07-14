<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-light">
        <v-btn text><v-icon>mdi-filter</v-icon>Filter</v-btn>
      </v-toolbar-title>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-badge color="red" overlap :content="notify">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item class="pb-4 pt-4">
          <v-img src="/images/alldeal_logo.png"></v-img>
        </v-list-item>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <div v-for="(item, index) in items" :key="index">
            <v-list-item :to="item.to">
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: ['pageTitle', 'pageDefaultBackLink'],
  data: () => ({
    drawer: false,
    group: null,
    notify: 52,
  }),
  computed: {
    items() {
      return this.$store.getters.menus
    },
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style lang="scss" scoped>
.v-application {
  font-family: 'Kanit';
}
</style>
