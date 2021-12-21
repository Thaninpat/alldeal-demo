<template>
  <v-app>
    <v-app-bar app absolute hide-on-scroll scroll-target="#scrolling">
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
          <v-list-item-group v-model="group">
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
export default {
  props: ['pageTitle', 'pageDefaultBackLink'],
  data: () => ({
    drawer: false,
    group: null,
    notify: 52,
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
  },
  // updated() {
  //   this.result = this.user.data.roles[0]
  // },
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
