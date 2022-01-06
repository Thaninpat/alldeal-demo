<template>
  <v-app>
    <v-app-bar app absolute hide-on-scroll scroll-target="#scrolling">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-light">
        <FilterBtn
          v-if="filterLists"
          @filter="filterItems"
          :filterLists="filterLists"
        />
      </v-toolbar-title>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="220"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="notify = 0">
            <v-badge color="red" overlap :value="notify" :content="notify">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  v-text="`VIEW READ (${notify})`"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-email-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card class="overflow-auto" max-height="75vh">
            <v-list>
              <v-list-item v-for="n in messages" :key="n" @click="() => {}">
                <v-list-item-content>
                  <v-list-item-title
                    >Notification title {{ n }}</v-list-item-title
                  >
                  <v-list-item-subtitle>subtitle {{ n }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <!-- <v-list>
            <v-list-item v-for="n in notify" :key="n" @click="() => {}">
              <v-list-item-content>
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list> -->
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-sheet id="scrolling" class="overflow-y-auto">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <div class="text-right">
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon v-text="'$Close'" />
            </v-btn>
          </div>
          <v-list-item class="pb-4">
            <v-img src="/img/alldeal_logo.png"></v-img>
          </v-list-item>
          <v-list-item v-if="!user.length > 0" link>
            <v-list-item-content>
              <v-list-item-title class="text-h6" v-text="user.given_name" />
              <v-list-item-subtitle v-text="user.email" />
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
          <!-- <label v-text="user === null ? '' : user.data.roles[0]"></label> -->
          <v-list-item-group v-model="group" color="primary">
            <div v-for="(item, index) in items" :key="index">
              <v-list-item :to="item.to">
                <v-list-item-title> {{ item.name }} </v-list-item-title>
              </v-list-item>
            </div>
            <v-divider />
            <v-list-item class="mt-4" @click="logOut">
              <v-list-item-title class="btn_logout">
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <slot />
      </v-main>
    </v-sheet>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { removeCookie } from '../../helper/utils'
import { Filter } from '../../helper/filter'
import FilterBtn from './FilterBtn.vue'
export default {
  props: ['pageTitle', 'pageDefaultBackLink', 'itemsFilter', 'filterLists'],
  components: { FilterBtn },
  data: () => ({
    drawer: false,
    group: null,
    notify: 0,
    messages: 10,
    menu: false,
    // result: '',
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    logOut() {
      removeCookie('id_token')
      removeCookie('refresh_token')
      this.$router.push('/redirect')
    },
    async filterItems(filterBy) {
      await Filter({ items: this.itemsFilter, filterBy: filterBy })
    },
  },
  computed: {
    ...mapGetters({
      items: 'menus',
      user: 'user/user',
    }),
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  created() {
    // let url_string = window.location.href
    // let url = new URL(url_string)
    // let code = url.searchParams.get('code')
    // if (code) console.log(code)
  },
  mounted() {
    this.getUser()
    // this.filterItems()
  },
  updated() {
    // console.log('Items filter: ', this.itemsFilter)
    // this.result = this.user.data.roles[0]
  },
}
</script>

<style lang="scss" scoped>
.v-application {
  font-family: 'Kanit';
}
.btn_logout {
  color: hsl(0, 100%, 50%);
}
</style>
