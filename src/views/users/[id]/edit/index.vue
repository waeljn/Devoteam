<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Edit User
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/users">
                <li class="breadcrumb-item ml-2">Users</li>
              </router-link>
              <router-link :to="'/users/' + id">
                <li class="breadcrumb-item ml-2">User ({{ id }})</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Edit User</li>
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
        <div class="col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <form @submit="handleCreate">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Name</label>
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Joe Doe"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="joe.doe@gmail.com"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Sex</label>
                  <br />
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    v-model="sex"
                  />
                  <label for="female">Woman</label>
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    v-model="sex"
                    class="mx-2"
                  />
                  <label for="male">Man</label>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input
                    v-model="phone"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="+123 45678900"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">
                    Todo
                    <div
                      v-show="loadingTodos"
                      class="spinner-border spinner-border-sm text-secondary mr-2"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  </label>
                  <select
                    v-model="todo"
                    class="form-control"
                    id="exampleFormControlSelect1"
                    :disabled="!todos"
                  >
                    <option :key="t.id" :value="t.id" v-for="t in todos">
                      {{ t.title }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Description
                  </label>
                  <textarea
                    v-model="description"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="About the user"
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
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
import { getTodos } from '../../../../domain/todos'
import { getUserById, updateUserById } from '../../../../domain/users'
export default {
  data() {
    return {
      id: null,
      sex: 'female',
      name: null,
      email: null,
      phone: null,
      todo: null,
      description: null,
      loading: false,
      error: null,
      loadingTodos: false,
      todos: null,
      errorTodos: null,
      user: null, // TODO Remove this
    }
  },
  mounted() {
    this.id = this.$route?.params?.id
    console.log(this.id)
    this.fetchTodos()
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      this.error = this.user = null
      this.loading = true
      try {
        const { data } = await getUserById(this.id)
        console.log(data)
        this.name = data.name
        this.email = data.email
        this.phone = data.phone
        this.description = data.description
        // this.todo = data.todo THIS IS THE CORRECT ONE
        this.todo = data.id
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },
    async fetchTodos() {
      this.errorTodos = this.todos = null
      this.loadingTodos = true
      try {
        const { data } = await getTodos()
        this.todos = data
        this.loadingTodos = false
      } catch (error) {
        this.errorTodos = error
        this.loadingTodos = false
        console.log(error)
      }
    },
    async handleCreate($e) {
      $e.preventDefault()
      try {
        let u = {
          name: this.name,
          sex: this.sex,
          email: this.email,
          phone: this.phone,
          description: this.description,
          todo: this.todo,
        }
        this.loading = true
        this.user = await updateUserById(this.id, u)
        console.log(u)
        this.loading = false
        // this.$router.push({ path: '/users/' })
      } catch (error) {
        this.loading = false
        this.error = false
        console.error(error)
      }
    },
  },
}
</script>

<style></style>
