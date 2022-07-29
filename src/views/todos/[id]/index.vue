<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Todos Details
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/todos">
                <li class="breadcrumb-item">Todos</li>
              </router-link>
              <li class="breadcrumb-item active ml-2">Todos Details</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <section class="content">
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
      <todos-details
        :todos="todos"
        v-if="todos"
        @remove="handleRemove"
      ></todos-details>
      
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import todosDetails from '../../../components/todos/details'
import { removeTodoById, getTodoById } from '../../../domain/todos'
export default {
  components: {
    todosDetails,
    getTodoById,
    removeTodoById
  },
  data() {
    return {
      id: null,
      todos: null,
      loading: false,
      error: null,
    }
  },
  mounted() {
    this.id = this.$route?.params?.id
    this.fetchData()
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
      async fetchData() {
      try {
        this.loading = true
        const snap = await getTodoById(this.id)
        this.todos = { ...snap.data(), id: this.id }
        console.info(this.todos) // Todo Comment this
        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error
        console.log(error)
      }
    },
     async handleRemove() {
      if (confirm('Are you sure to remove this Task?')) {
        try {
          this.loadingRemove = true
          const response = await removeTodoById(this.id)
          this.$router.push({ path: '/projects/'  })
          
        } catch (error) {
         
          this.errorRemove = error
          console.log(error)
        }
      }
    },
  },
}
</script>

<style></style>
