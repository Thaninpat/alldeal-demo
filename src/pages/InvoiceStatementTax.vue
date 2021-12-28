<template>
  <base-layout pageTitle="Statement/Tax Invoice">
    <v-container>
      <statement :items="statementItems" />
      <v-divider></v-divider>
      <tax-invoice :items="taxInvoiceItems" />
    </v-container>
  </base-layout>
</template>

<script>
import Statement from '../components/Statement.vue'
import TaxInvoice from '../components/TaxInvoice.vue'
export default {
  components: { Statement, TaxInvoice },
  data: () => ({
    statementItems: [
      {
        id: '1',
        statementDate: '2021-02-02',
        fileName: 'abc_1234_def.pdf',
        download: true,
      },
      {
        id: '2',
        statementDate: '2021-02-02',
        fileName: 'abc1_as_234.pdf',
        download: true,
      },
      {
        id: '3',
        statementDate: '2021-02-02',
        fileName: 'abc1_234.pdf',
        download: true,
      },
      {
        id: '4',
        statementDate: '2021-02-02',
        fileName: 'abc1234_456.pdf',
        download: true,
      },
      {
        id: '5',
        statementDate: '2021-02-02',
        fileName: 'abc12_3456.pdf',
        download: true,
      },
    ],
    taxInvoiceItems: [
      {
        id: '70',
        statementDate: '2020-12',
        fileName: 'WTD00769202012.PDF',
        download: true,
      },
      {
        id: '71',
        statementDate: '2020-13',
        fileName: 'WTD00769202013.PDF',
        download: true,
      },
      {
        id: '72',
        statementDate: '2020-14',
        fileName: 'WTD00769202014.PDF',
        download: true,
      },
      {
        id: '73',
        statementDate: '2020-15',
        fileName: 'WTD00769202015.PDF',
        download: true,
      },
      {
        id: '74',
        statementDate: '2020-16',
        fileName: 'WTD00769202016.PDF',
        download: true,
      },
    ],
  }),
}
</script>

<style scope>
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
  font-size: 11px;
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
