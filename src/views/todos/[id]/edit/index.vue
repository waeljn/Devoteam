<template>
   <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Edit Todo
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/todos">
                <li class="breadcrumb-item ml-2">Todos</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Edit Todo</li>
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
        <div class="col-md-6">
          <div class="col-md-12">
          
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
                    <label for="inputDescription">Todo Team</label>
                    <textarea
                      id="inputDescription"
                      class="form-control"
                      v-model="team"
                      rows="4"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    
                    
                      
                  </div>
                  <button @click="handleUpdate" class="btn btn-primary">
                    Update
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

import UsersTable from '../../../../components/users/table'
import UsersGrid from '../../../../components/users/grid'
import { getTodoById, updateTodoById } from '../../../../domain/todos'
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
    this.id = this.$route?.params?.id
    console.log(this.id)
  
    this.fetchTodo()
  },
  methods: {
    async fetchTodo() {
     const fn2 = async () => {
        try {
          const snap = await getTodoById(this.id)
          
            this.title = snap.data().title
          this.description = snap.data().description
          this.team = snap.data().team
          
           // console.log(doc.id, ' => ', doc.data())
          
        } catch (error) {
          console.log(error)
        }
      }
      fn2()
    },
   
    async handleUpdate($e) {
      $e.preventDefault()
      try {
        let u = {
          title: this.title,
          description: this.description,
          team: this.team,
        
        }
        this.loading = true
        this.user = await updateTodoById(this.id, u)
        this.loading = false
      
        this.$router.push({ path: '/projects/'+this.id+ '/todos' })
        
         
      } catch (error) {
        this.loading = false
        this.error = false
        console.error(error)
      }
    },
  },
}

</script>

<style>

</style>