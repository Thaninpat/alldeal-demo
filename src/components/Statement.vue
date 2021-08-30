<template>
  <div class="mb-5">
    <v-row class="my-2">
      <v-col cols="12" md="12">
        <div>
          <strong>Statement</strong>
        </div>
      </v-col>
    </v-row>
    <table>
      <tr class="item-list">
        <th>No</th>
        <th>Statement</th>
        <th>File Name</th>
        <th>Download</th>
      </tr>
      <tr class="item-list-detail" v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.statementDate }}</td>
        <td>{{ item.fileName }}</td>
        <td>
          <a href="#">Download</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['items'],
}
</script>
