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
              {{row.description}}
               
              
            </td>
                 <td>
              {{row.team}}
            </td>
            <td>
              
               <router-link
            v-if="row.id"
            :to="'/todos/' + row.id + '/edit'"
          >
            <a
              type="button"
              class="btn btn-tool"
              title="Edit"
              data-widget="chat-pane-toggle"
              @click="$emit('update')"
            >
              <i class="fas fa-pencil"></i>
            </a>
          </router-link>
<button
            type="button"
            class="btn btn-tool"
            data-card-widget="remove"
            title="Remove"
            v-show="!loading"
            @click="$emit('remove')"
          >
            <i class="fas fa-trash"></i>
          </button>
              
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
        { label: 'Description', field: 'description' },
        { label: 'Team', field: 'userId' },
        { label: 'Actions' },
      ],
      rows: this.records,
    }
  },
}
</script>

<style></style>
