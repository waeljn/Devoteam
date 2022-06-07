<template>
  <export-excel
    class="btn btn-outline-secondary btn-sm float-right"
    :data="json_data"
    :fields="json_fields"
    worksheet="Users"
    name="filename.xls"
  >
    Export to Excel
    <i class="fa fa-download"></i>
  </export-excel>
</template>

<script>
import ExportExcel from 'vue-json-excel'
export default {
  components: {
    ExportExcel,
  },
  props: {
    records: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      json_fields: {
        ID: 'id',
        Name: 'name',
        Email: 'email',
        Phone: 'phone',
      },
      json_data: this.records,
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    }
  },
}
</script>

<style></style>
