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
            <td>
              <a>
                {{ row.title }}
              </a>
              <br />
            </td>
            <td>
              <ul class="list-inline">
                <li class="list-inline-item">
                  {{ row.company }}
                </li>
              </ul>
            </td>
            <td class="project-state text-center">
              {{ row.leaderId }}
            </td>
            <td class="project-state text-center">
              {{ row.createdAt }}
            </td>
            <td class="project-state text-center">
              <span
                v-show="row.status === 'UNASSIGNED'"
                class="badge bg-gray mr-1 my-auto"
              >
                {{ row.status }}
              </span>
              <span
                v-show="row.status === 'COMPLETED'"
                class="badge bg-success mr-1 my-auto"
              >
                {{ row.status }}
              </span>
              <span
                v-show="row.status === 'IN_PROGRESS'"
                class="badge bg-info mr-1 my-auto"
              >
                {{ row.status }}
              </span>
            </td>
            <td class="project-actions text-center">
              <router-link :to="'/projects/' + row.id">
                <a class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
              </router-link>
              <router-link :to="'/projects/' + row.id + '/edit'">
                <a class="btn btn-sm btn-warning ml-1">
                  <i class="fa fa-pen text-white"></i>
                </a>
              </router-link>

              <router-link :to="'/projects/' + row.id + '/todos'" class="ml-1">
                <a class="btn btn-sm btn-info"><i class="fa fa-add"></i></a>
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
        { label: 'Project Name', field: 'title' },
        { label: 'Client Company', field: 'body' },
        { label: 'Project Leader', field: 'leaderId' },
        { label: 'Created At', field: 'createdAt' },
        { label: 'Status', field: 'status' },
        { label: 'Actions' },
      ],
      rows: this.records,
    }
  },
}
</script>

<style scoped>
.rounded-circle {
  border-radius: 50% !important;
}
.img-account-profile {
  height: 48px;
}
</style>
