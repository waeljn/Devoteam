<template>
  <div class="card">
    <div class="card-body">
      <datatable :columns="columns" :data="rows" class="table table-bordered">
        <template slot-scope="{ row }">
          <tr>
            <td>
              <router-link :to="'/projects/' + row.id">
                {{ row.id }}
              </router-link>
            </td>
            <td>{{ row.title }}</td>
            <td v-show="row.completed === true">
              <i class="fa fa-check text-success"></i>
            </td>
            <td v-show="row.completed === false">
              <i class="fa fa-times text-danger"></i>
            </td>
            <td>
              <router-link :to="'/users/' + row.userId">
                <a href="#">View User ({{ row.userId }})</a>
              </router-link>
            </td>
            <td>
              <router-link :to="'/todos/' + row.id ">
                <a class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
              </router-link>
              <router-link :to="'/todos/' + row.id + '/edit'">
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
        { label: 'Title', field: 'title' },
        { label: 'Completed', field: 'email' },
        { label: 'User', field: 'userId' },
        { label: 'Actions' },
      ],
      rows: this.records,
    }
  },
}
</script>

<style></style>
