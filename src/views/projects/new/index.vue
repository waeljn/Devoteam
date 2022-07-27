<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              New Project
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/projects">
                <li class="breadcrumb-item ml-2">Projects</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Create Project</li>
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
          <div class="card">
            <div class="card-body">
              <form @submit="handleCreate">
                <div class="form-group">
                  <label for="inputTitle">Project Title</label>
                  <input
                    type="text"
                    id="inputTitle"
                    class="form-control"
                    v-model="title"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputDescription">Project Description</label>
                  <textarea
                    type="text"
                    id="inputDescription"
                    class="form-control"
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
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputProjectLeader">Project Leader</label>
                  <br />
                  <button
                    v-if="!leader"
                    @click="handleOpenChooseLeaderModal"
                    class="btn btn-sm btn-outline-primary"
                    type="button"
                  >
                    <i class="fa fa-user mr-2"></i>
                    Choose leader
                  </button>
                  <leader
                    v-if="leader"
                    :user="leader"
                    @change="handleOpenChooseLeaderModal"
                  />
                </div>
                <button
                  class="btn btn-sm btn-info float-right"
                  type="submit"
                  :disabled="loadingCreate"
                >
                  Create
                  <div
                    class="spinner-border spinner-border-sm text-white ml-2"
                    role="status"
                    v-show="loadingCreate"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <users-modal
        :users="users"
        @assign="handleUserAssignement"
        :leader="leader"
      ></users-modal>
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
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { createProject } from '../../../domain/projects'
import { getTodos } from '../../../domain/todos'
import { getUsers } from '../../../domain/users'
import { Toaster } from '../../../components/miscs'
import UsersModal from '../../../components/users/modal'
import Leader from './leader'

const $ = window.$
export default {
  components: { UsersModal, Leader },
  data() {
    return {
      title: null,
      description: null,
      leaderId: null,
      company: null,
      loading: false,
      error: null,
      loadingCreate: false,
      errorCreate: null,
      users: [],
      loadingUsers: false,
      errorUsers: null,
      leader: null,
    }
  },
  mounted() {
    this.fetchTodos()
    this.fetchUsers()
  },
  methods: {
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
    async fetchUsers() {
      this.errorUsers = null
      this.loadingUsers = true
      try {
        const snap = await getUsers()
        snap.forEach((doc) => {
          this.users.push(doc.data())
        })
        this.loadingUsers = false
      } catch (error) {
        this.errorUsers = error
        this.loadingUsers = false
        console.log(error)
      }
    },
    async handleCreate($e) {
      $e.preventDefault()
      const fn = async () => {
        try {
          this.loadingCreate = true
          const Statuses = {
            UNASSIGNED: 'UNASSIGNED',
          }
          const snap = await createProject({
            title: this.title,
            description: this.description,
            createdAt: new Date().toISOString(),
            leaderId: this.leaderId, // Account ID
            company: this.company,
            status: Statuses.UNASSIGNED, // UNASSIGNED || IN_PROGRESS || COMPLETED
          })
          this.title = null
          this.description = null
          this.leaderId = null
          this.company = null
          this.$router.push({ path: '/projects/' })
          Toaster.show('Project created')
          this.loadingCreate = false
        } catch (error) {
          this.loadingCreate = false
          this.errorCreate = error
          console.log(error)
        }
      }
      fn()
    },
    handleOpenChooseLeaderModal() {
      $('#users-table-modal').modal('show')
    },
    handleUserAssignement($e) {
      $('#users-table-modal').modal('hide')
      this.leader = $e
      console.log(this.leader.username)
      this.leaderId = this.leader.username
    },
  },
}
</script>

<style></style>
