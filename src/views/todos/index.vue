<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
               All Todos
            
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">Todos</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <todos-table
        v-if="todos && todos.length > 0"
        :records="todos"
      ></todos-table>
      <div class="card" v-if="loading">
        <div class="card-body d-flex align-items-center">
          <div
            class="spinner-border spinner-border-sm text-secondary mr-2"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          Loading...
        </div>
      </div>
      <div class="card" v-if="count === 0">
        <div class="card-body">No data</div>
      </div>
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import TodosTable from '../../components/todos/table'
import { getTodos } from '../../domain/todos'
export default {
  components: {
    TodosTable, 
  },
  data() {
    return {
      loading: false,
      todos: [],
      count: null,
      error: null,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.todos = []
      this.error = null
      this.loading = true
      try {
        const { data } = await getTodos()
        this.todos = data
        this.count = data.length
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },
  },



  


}
</script>

<style></style>
