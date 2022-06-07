<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">New Task</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/todos">
                <li class="breadcrumb-item ml-2">Tasks</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Create Task</li>
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
              <div class="form-group">
                <label for="inputDescription">Task Description</label>
                <textarea
                  id="inputDescription"
                  class="form-control"
                  rows="4"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="inputStatus">Status</label>
                <select id="inputStatus" class="form-control custom-select">
                  <option selected="" disabled="">Select one</option>
                  <option>On Hold</option>
                  <option>Canceled</option>
                  <option>Success</option>
                </select>
              </div>
              <select
                v-model="user"
                class="form-control"
                id="exampleFormControlSelect1"
                :disabled="!users"
                multiple
              >
                <option :value="null" disabled>Select users</option>
                <option :key="u" :value="u" v-for="u in users">
                  {{ u.username }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-6">
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
            <div class="card-body">
              <div class="form-group">
                <label for="inputDescription">Team select</label>
                <textarea
                  id="inputDescription"
                  class="form-control"
                  rows="4"
                ></textarea>
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
      <button @click="handleefjr">xx</button>
    </section>
  </div>
</template>

<script>
import { createTodo } from "../../../../../domain/todos";
import { getTodos } from "../../../../../domain/todos";
import { getUsers } from "../../../../../domain/users";
import { Toaster } from "../../../../../components/miscs";
export default {
  data() {
    return {
      id: null,
      sex: "female",
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
      users: [],
    };
  },
  mounted() {
    this.id = this.$route?.params?.id
    this.fetchTodos();
    this.fetchUsers();
  },
  methods: {
    async fetchTodos() {
      this.errorTodos = this.todos = null;
      this.loadingTodos = true;
      try {
        const { data } = await getTodos();
        this.todos = data;
        this.loadingTodos = false;
      } catch (error) {
        this.errorTodos = error;
        this.loadingTodos = false;
        console.log(error);
      }
    },
    async fetchUsers() {
      this.users = [];
      this.error = null;
      this.loading = true;
      try {
        const { data } = await getUsers();
        this.users = data;
        this.count = data.length;
        this.loading = false;
      } catch (error) {
        this.error = error;
        this.loading = false;
        console.log(error);
      }
    },
    handleefjr() {console.log(this.user);
    },
    async handleCreate($e) {
      $e.preventDefault();
      try {
        let u = {
          name: this.name,
          sex: this.sex,
          email: this.email,
          phone: this.phone,
          description: this.description,
          todo: this.todo,
        };
        this.loading = true;
        this.user = await createTodo(u);
        console.log(u);
        this.loading = false;
        // this.$router.push({ path: '/projects/' })
        Toaster.show("Task created");
      } catch (error) {
        this.loading = false;
        this.error = false;
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
