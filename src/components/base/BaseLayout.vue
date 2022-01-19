<template>
  <div>
    <ConnectedBar :onLine="onLine" :showBackOnline="showBackOnline" />
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
        <NotificationBtn />
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
            <!--  <v-list-item v-if="!user.length > 0" link>
             <v-list-item-content>
              <v-list-item-title class="text-h6" v-text="user.given_name" />
              <v-list-item-subtitle v-text="user.email" />
            </v-list-item-content> 
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item> -->
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getLogoutApi } from '../../helper/utils'
import { Filter } from '../../helper/filter'
import ConnectedBar from './ConnectedBar.vue'
import FilterBtn from './FilterBtn.vue'
import NotificationBtn from './NotificationBtn.vue'
export default {
  props: ['pageTitle', 'pageDefaultBackLink', 'itemsFilter', 'filterLists'],
  components: { FilterBtn, NotificationBtn, ConnectedBar },
  data: () => ({
    drawer: false,
    group: null,
    connectionStatus: '',
    onLine: navigator.onLine,
    showBackOnline: false,
    // result: '',
  }),
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    logOut() {
      getLogoutApi()
      // removeCookie('id_token')
      // removeCookie('refresh_token')
      // this.$router.push('/redirect')
    },
    async filterItems(filterBy) {
      await Filter({ items: this.itemsFilter, filterBy: filterBy })
    },
    updateOnlineStatus(e) {
      const { type } = e
      this.onLine = type === 'online'
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
    onLine(val) {
      if (val) {
        this.showBackOnline = true
        setTimeout(() => {
          this.showBackOnline = false
          location.reload()
        }, 1000)
      }
    },
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
    this.getUser()
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
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
