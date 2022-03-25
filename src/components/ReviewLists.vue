<template>
  <v-card>
    <v-toolbar>
      <v-btn icon @click="closedDialog(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Review</v-toolbar-title>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
    </v-toolbar>
    <div v-if="loading == false">
      <v-list three-line subheader>
        <ReviewOverview :all="all" />
        <ReviewDetail v-for="item in items" :key="item.id" :item="item" />
      </v-list>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ReviewOverview from './ReviewOverview.vue'
import ReviewDetail from './ReviewDetail.vue'
export default {
  components: { ReviewOverview, ReviewDetail },
  props: ['campaignId', 'review'],
  data: () => ({ items: null, all: null, loading: true }),
  mounted() {
    this.getReviewApi()
  },
  methods: {
    async getReviewApi() {
      try {
        this.loading = true
        if (this.campaignId) {
          const url = 'https://cs-uat-cms.jenosize.dev/api/v2/deal/review/'
          const { data } = await axios.get(`${url}334`)
          const items = data.data
          this.all = items
          this.items = items.items.map((obj) => {
            if (obj.updated_at) {
              return {
                ...obj,
                updated_at: moment(obj.updated_at).format('DD-MM-YYYY HH:mm'),
              }
            }
          })
          this.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    closedDialog(val) {
      this.$emit('closed_dialog', val)
    },
  },
}
</script>
