<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              New Todo
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/todos">
                <li class="breadcrumb-item ml-2">Todos</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Create Todo</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Team</h3>
              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body  md-3">
              <div class="form-group">
                <label for="inputDescription">Team select</label>
                <users-table
                  v-if="users && users.length > 0"
                  :isUse="true"
                  :isEdit="false"
                  :isView="true"
                  :records="users"
                  @use="handleUse"
                ></users-table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="col-md-12">
            <users-grid
              :isUse="true"
              :isEdit="false"
              :isView="true"
              :users="selectedUsers"
              @use="handleUse"
              @remove="handleRemove"
            ></users-grid>
            <div class="col-md-12">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">General</h3>
                  <div class="card-tools">
                    <button
                      type="button"
                      class="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <label for="inputDescription">Title </label>
                  <input
                    type="text"
                    id="inputTitle"
                    class="form-control"
                    v-model="title"
                    required
                  />
                  <div class="form-group">
                    <label for="inputDescription">Todo Description</label>
                    <textarea
                      id="inputDescription"
                      class="form-control"
                      v-model="description"
                      rows="4"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    
                    
                      
                  </div>
                  <button @click="handleCreate" class="btn btn-primary">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div class="card" v-if="user">
        <pre class="card-body">{{ JSON.stringify(user, null, 2) }}</pre>
      </div>
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { createTodo } from '../../../domain/todos'
import { getTodos } from '../../../domain/todos'
import { getUsers } from '../../../domain/users'
import { Toaster } from '../../../components/miscs'
import UsersTable from '../../../components/users/table'
import UsersGrid from '../../../components/users/grid'
export default {
  components: {
    UsersTable,
    UsersGrid,
  },
  data() {
    return {
      
      title: null,
      description: null,
      team : null,
      loading: false,
      error: null,
      loadingTodos: false,
      todos: null,
      errorTodos: null,
      user: null, // TODO Remove this
      users: [],
      selectedUsers: [],
    }
  },
  mounted() {
    this.fetchTodos()
    this.fetchData()
  },
  methods: {
    async fetchTodos() {
      this.errorTodos = this.todos = null
      this.loadingTodos = true
        try {
          const snap = await getTodos()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.todos.push(doc.id, ' => ', doc.data())
             this.loadingTodos = false
          })
        } catch (error) {
          this.loadingTodos = false
          console.log(error)
        }
    },
    async fetchData() {
      this.users = []
      this.error = null
      this.loading = true
      try {
       const snap = await getUsers()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.users.push(doc.id, ' => ', doc.data())
            this.loading = false
          })
      } catch (error) {
         this.loading = false
        console.log(error)
      }
    },
    async handleCreate($e) {
      $e.preventDefault()
      try {
        let u = {
          title: this.title,
          
          description: this.description,
          team:  this.selectedUsers.map(({ username }) => username),
        }
        const ids = this.selectedUsers.map(({ id }) => id)
        console.log(ids)
        this.loading = true
        const { data } = await createTodo(u)
        this.user = data
        console.log(u)
        this.loading = false
         this.$router.push({ path: '/projects/' })
        Toaster.show('Todo created')
      } catch (error) {
        this.loading = false
        this.error = false
        console.error(error)
      }
    },
    handleUse($e) {
      const su = this.selectedUsers.find(({ id }) => id === $e)
      if (!su) {
        const u = this.users.find(({ id }) => id === $e)
        this.selectedUsers = [...this.selectedUsers, u]
      } else {
        alert('User is already added.')
      }
    },
    handleRemove($e) {
      if (confirm`Are you sure to remove this user?`)
        this.selectedUsers = this.selectedUsers.filter(({ id }) => id !== $e)
    },
  },
}
</script>

<style></style>
