<template>
  <base-layout pageTitle="Home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card elevation="24" class="mt-4 mx-auto" max-width="600">
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="5"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="1"
                padding="16"
              ></v-sparkline>
            </v-sheet>
            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">
                User Registrations
              </div>
              <div class="subheading font-weight-light grey--text">
                Last Campaign Performance
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small>
                mdi-clock
              </v-icon>
              <span class="text-caption grey--text font-weight-light"
                >last registration 26 minutes ago</span
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </base-layout>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      labels: [
        '01-Apr-21',
        '02-Apr-21',
        '03-Apr-21',
        '04-Apr-21',
        '05-Apr-21',
        '06-Apr-21',
        '07-Apr-21',
      ],
      value: [32, 45, 50, 60, 48, 50, 59],
    }
  },
}
</script>

<style lang="scss"></style>
