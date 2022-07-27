<template>
  <div class="card">
    <div class="card-header">
      Users Table
      <users-export :records="records"></users-export>
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
            <td>
              <a>
                {{ row.username }}
              </a>
              <br />
            </td>
            <td>{{ row.email }}</td>
            <td>{{ row.phone }}</td>
            <td>
              <router-link :to="'/users/' + row.id" v-show="isView">
                <a class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
              </router-link>
              <router-link :to="'/users/' + row.id + '/edit'" v-show="isEdit">
                <a class="btn btn-sm btn-warning ml-1">
                  <i class="fa fa-pen text-white"></i>
                </a>
              </router-link>
              <button
                class="btn btn-sm btn-secondary ml-1"
                v-show="isUse"
                @click="$emit('use', row.id)"
              >
                <i class="fa fa-add text-white"></i>
              </button>
            </td>
          </tr>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
import UsersExport from '../export'
export default {
  components: {
    UsersExport,
  },
  props: {
    records: {
      type: Array,
      default: () => [],
    },
    isUse: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    isView: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Phone', field: 'phone' },
        { label: 'Actions' },
      ],
      rows: this.records,
    }
  },
}
</script>

<style></style>
