<template>
  <div>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-avatar size="30">
        <v-img
          v-if="item.user.image_url"
          alt="Avatar"
          :src="item.user.image_url"
        />
        <v-icon v-else size="30" dark color="hsl(210, 100%, 27%)"
          >mdi-account-circle</v-icon
        >
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>
          {{ item.user.name }}
        </v-list-item-subtitle>
        <v-rating
          v-model="item.star"
          background-color="#eee"
          color="orange"
          x-small
          half-increments
          readonly
        ></v-rating>
        <v-list-item-title class="text-subtitle-2">
          {{ item.comment }}
        </v-list-item-title>
        <div class="justify-start">
          <v-chip
            v-for="badges in item.reviewBadges"
            :key="badges.id"
            class="ma-1 ml-0"
            small
          >
            <v-list-item-subtitle class="text-caption">
              {{ badges.message }}
            </v-list-item-subtitle>
          </v-chip>
        </div>
        <div v-for="(album, index) in item.albums" :key="index">
          <v-img :src="album"></v-img>
        </div>
        <v-list-item-subtitle class="text-caption" v-text="item.updated_at">
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style></style>
