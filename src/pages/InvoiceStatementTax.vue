<template>
  <base-layout pageTitle="Statement/Tax Invoice">
    <v-container>
      <statement :items="items" />
      <v-divider></v-divider>
      <tax-invoice :items="items" />
    </v-container>
  </base-layout>
</template>

<script>
import Statement from '../components/Statement.vue'
import TaxInvoice from '../components/TaxInvoice.vue'
export default {
  components: { Statement, TaxInvoice },
  data() {
    return {
      items: [
        {
          id: '1',
          statementDate: '2021-02-02',
          fileName: 'abc_1234_aasdf_1212121.pdf',
          download: true,
        },
        {
          id: '2',
          statementDate: '2021-02-02',
          fileName: 'abc1_asas_234.pdf',
          download: true,
        },
        {
          id: '3',
          statementDate: '2021-02-02',
          fileName: 'abc1_aslk_l234.pdf',
          download: true,
        },
        {
          id: '4',
          statementDate: '2021-02-02',
          fileName: 'abc1234_as3456.pdf',
          download: true,
        },
        {
          id: '5',
          statementDate: '2021-02-02',
          fileName: 'abc1234_as3456.pdf',
          download: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scope>
table {
  width: 100%;
}
tr {
  background-color: hsl(0, 0%, 98%);
}
tr:nth-child(odd) {
  background-color: hsl(108, 100%, 95%);
}
th {
  padding: 0px 4px;
  font-weight: bold;
  background-color: hsl(0, 0%, 90%);
}
td {
  text-align: center;
}
a {
  text-decoration-line: none;
}
</style>
