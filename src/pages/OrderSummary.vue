<template>
  <base-layout pageTitle="Order Summary">
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
          <v-card color="#f1f1f1" height="150">
            <div class="d-flex justify-flex-start">
              <v-avatar class="ma-3" size="110" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
              <div>
                <v-card-subtitle class="pt-2">
                  {{ item.title }}
                </v-card-subtitle>
                <v-card-subtitle class="pa-3 pb-0 grey--text">
                  {{ item.status }}:{{ item.statusDate }}
                </v-card-subtitle>
                <div>
                  <v-btn class="pa-0" text>
                    <v-icon small v-text="'$mdiCart'"></v-icon>
                    <div class="grey--text">{{ item.value1 }}</div>
                  </v-btn>
                  <v-btn class="pa-0" text>
                    <v-icon small v-text="'$mdiCashCheck'"></v-icon>
                    <div class="grey--text">{{ item.value2 }}</div>
                  </v-btn>
                  <v-btn class="pa-0" text>
                    <v-icon small v-text="'$mdiTicket'"></v-icon>
                    <div class="grey--text">{{ item.value3 }}</div>
                  </v-btn>
                </div>
                <v-btn class="pa-0 pl-3" text>
                  <v-icon small>mdi-forum</v-icon>
                  <div class="grey--text">{{ item.review }} Review</div>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </base-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: '/img/thumbnail.jpg/',
          title: '0001 - Deal Item 1',
          statusDate: '1 Apr 21 - 30 Jun 21',
          status: 'Active',
          value1: '68',
          value2: '71',
          value3: '23',
          review: '2',
        },
        {
          src: '/img/thumbnail.jpg/',
          title: '0002 - Deal Item 2',
          statusDate: '1 Nov 21 - 21 May 21',
          status: 'Active',
          value1: '578',
          value2: '569',
          value3: '235',
          review: '89',
        },
        {
          src: '/img/thumbnail.jpg/',
          title: '0003 - Deal Item 3',
          statusDate: '1 Nov 21 - 21 Apr 21',
          status: 'End',
          value1: '558',
          value2: '547',
          value3: '302',
          review: '24',
        },
        {
          src: '/img/thumbnail.jpg/',
          title: '0004 - Deal Item 4',
          statusDate: '1 Nov - 30 Apr 21',
          status: 'End',
          value1: '',
          value2: '',
          value3: '',
          review: '',
        },
      ],
    }
  },
}
</script>

<style></style>
