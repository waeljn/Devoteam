<template>
  <div class="card">
    <div class="card-header">
      Comments Table
    </div>
    <div class="card-body">
      <datatable :columns="columns" :data="rows" class="table table-bordered">
        <template slot-scope="{ row }">
          <tr>
            <td>
              <router-link :to="'/users/' + row.id">
                {{ row.id }}
              </router-link>
            </td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.body }}</td>
            <td>
              <router-link :to="'/users/' + row.id">
                <a class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
              </router-link>
              <router-link :to="'/users/' + row.id + '/edit'">
                <a class="btn btn-sm btn-warning ml-1">
                  <i class="fa fa-pen text-white"></i>
                </a>
              </router-link>
            </td>
          </tr>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Body', field: 'body' },
        { label: 'Actions' },
      ],
      rows: this.records,
    }
  },
}
</script>

<style></style>
