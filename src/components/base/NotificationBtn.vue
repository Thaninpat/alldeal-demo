<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="220"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-badge color="red" overlap :value="notify" :content="notify">
          <v-icon v-text="'$NotifyBell'" />
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
            <v-icon v-text="'$EmailOpen'" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card class="overflow-auto" max-height="75vh">
        <v-list v-if="messages > 0">
          <v-list-item v-for="n in messages" :key="n" @click="() => {}">
            <v-list-item-content>
              <v-list-item-title>Notification title {{ n }}</v-list-item-title>
              <v-list-item-subtitle>subtitle {{ n }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item class="text-center">
            <v-list-item-title>All done</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    notify: 0,
    messages: 0,
    menu: false,
  }),
  mounted() {
    if (this.messages > 0) this.notify = this.messages
  },
}
</script>

<style></style>
