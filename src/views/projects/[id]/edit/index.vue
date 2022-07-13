<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Edit Project
              <div
                class="spinner-border spinner-border-sm text-secondary ml-3"
                role="status"
                v-show="loading"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/projects">
                <li class="breadcrumb-item ml-2">Projects</li>
              </router-link>
              <router-link :to="'/projects/' + id">
                <li class="breadcrumb-item ml-2">Project ({{ id }})</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Edit Project</li>
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
      <form @submit="handleUpdate">
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="form-group">
                  <label for="inputTitle">Project Title</label>
                  <small class="badge badge-gray float-right" v-show="status === 'UNASSIGNED'">
                    {{ status }}
                  </small>
                  <small class="badge badge-info float-right" v-show="status === 'IN_PROGRESS'">
                    {{ status }}
                  </small>
                  <small class="badge badge-success float-right" v-show="status === 'COMPLETED'">
                    {{ status }}
                  </small>
                  <input
                    type="text"
                    id="inputTitle"
                    class="form-control"
                    v-model="title"
                  />
                </div>
                <div class="form-group">
                  <label for="inputDescription">Project Description</label>
                  <textarea
                    id="inputDescription"
                    class="form-control"
                    rows="4"
                    v-model="description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="inputClientCompany">Client Company</label>
                  <input
                    type="text"
                    id="inputClientCompany"
                    class="form-control"
                    v-model="company"
                  />
                </div>
                <div class="form-group">
                  <label for="inputProjectLeader">Project Leader</label>
                  <input
                    type="text"
                    id="inputProjectLeader"
                    class="form-control"
                    v-model="leaderId"
                  />
                </div>
                <button
                  class="btn btn-sm btn-info float-right"
                  type="submit"
                  :disabled="loadingUpdate"
                >
                  Update
                  <div
                    class="spinner-border spinner-border-sm text-white ml-2"
                    role="status"
                    v-show="loadingUpdate"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { getTodos } from '../../../../domain/todos'
import { getProjectById, updateProjectById } from '../../../../domain/projects'
export default {
  data() {
    return {
      id: null,
      title: null,
      description: null,
      leaderId: null,
      status: null,
      company: null,
      loading: false,
      error: null,
      loadingTodos: false,
      todos: null,
      errorTodos: null,
      loadingUpdate: false,
      errorUpdate: null,
    }
  },
  mounted() {
    this.id = this.$route?.params?.id
    this.fetchTodos()
    this.fetchProject()
  },
  methods: {
    async fetchProject() {
      const fn = async () => {
        try {
          this.loading = true
          const snap = await getProjectById(this.id)
          this.title = snap.data().title
          this.description = snap.data().description
          this.status = snap.data().status
          this.company = snap.data().company
          this.leaderId = snap.data().leaderId
          this.loading = false
        } catch (error) {
          console.log(error)
          this.loading = false
        }
      }
      fn()
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
    async handleUpdate($e) {
      $e.preventDefault()
      try {
        const payload = {
          title: this.title,
          description: this.description,
          leaderId: this.leaderId,
          status: this.status,
          company: this.company,
        }
        this.loadingUpdate = true
        const project = await updateProjectById(this.id, payload)
        this.loadingUpdate = false
        this.fetchProject()
        this.$router.push({ path: '/projects/' })
        Toaster.show('Project Updated')
      } catch (error) {
        this.loadingUpdate = false
        this.errorUpdate = error
        console.error(error)
      }
    },
  },
}
</script>

<style></style>
