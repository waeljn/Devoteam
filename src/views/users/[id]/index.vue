<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              User Details
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/users">
                <li class="breadcrumb-item">Users</li>
              </router-link>
              <li class="breadcrumb-item active ml-2">User Details</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <section class="content">
      <user-details
        :user="user"
        v-if="user"
        @projects="handleProjects"
        @todos="handleTodos" 
        @remove="handleRemove"
        @performance="handlePerformance"
        @comments="handleComments"
      ></user-details>
      <div class="col-md-8 mx-auto">
        <projects-table
          v-if=" tab=== 'projects' && projects && projects.length > 0 "
          :records="projects"
        ></projects-table>
      </div>
      <!-- <div class="col-md-8 mx-auto">
        <todos-table
          v-if="tab === 'TODOS' && todos && todos.length > 0"
          :records="todos"
        ></todos-table>
      </div> -->
      <div class="col-md-8 mx-auto">
        <user-performance-table
          v-if="tab === 'PERFORMANCE'"
        ></user-performance-table>
      </div>
      <!--  <div
        class="col-md-8 mx-auto"
        v-if="tab === 'COMMENTS' && manager && user"
      >
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4>Comments</h4>
              <user-comments-details
                :user="manager"
                :comment="managerComment"
                :loading="loadingManagerCommentSave"
                @save="handleManagerComment"
              ></user-comments-details>
              <user-comments-details
                :user="user"
                :comment="userComment"
                :loading="loadingUserCommentSave"
                @save="handleUserComment"
              ></user-comments-details>
            </div>
          </div>
        </div>
      </div> -->
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
      <div class="col-md-8 mx-auto" v-if="loading">
        <div class="card">
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
      </div>
    </section>
  </div>
</template>

<script>
import UserDetails from '../../../components/users/details'
import UserPerformanceTable from '../../../components/users/[id]/performance-table'
import ProjectsTable from '../../../components/projects/table'
import UserCommentsDetails from '../../../components/comments/details'
import TodosTable from '../../../components/todos/table'
import { removeUserById, getUserById } from '../../../domain/users'
import { getProjectsByUserId } from '../../../domain/projects'
import { getTodosByUserId } from '../../../domain/todos'
import { getCommentsByUserId } from '../../../domain/comments'
export default {
  components: {
    UserDetails,
    ProjectsTable,
    TodosTable,
    UserPerformanceTable,
    ProjectsTable,
    UserCommentsDetails,
  },
  data() {
    return {
      id: null,
      user: null,
      manager: null,
      loading: false,
      error: null,
      projects: [],
      todos: [],
      tab: null,
      //userComment: null
      // managerComment: null, 
      userComment: 'Test user comment',
      managerComment: 'Test manager comment',
      loadingManagerCommentSave: false,
      loadingUserCommentSave: false,
    }
  },
  mounted() {
    this.id = this.$route?.params?.id
    this.fetchData()
   // this.handleComments()
    this.handleProjects()
   // this.handleTodos()
    this.handlePerformance()
   // this.handleRemove()
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const { data } = await getUserById(this.id)
        this.user = data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error
        console.log(error)
      }
    },
   async handleProjects() {
      this.tab = 'PROJECTS'
     this.projects = []
      this.error = null
      this.loading = true
      try {
        const snap = await getProjectsByUserId()
        snap.forEach((doc) => {
          this.projects.push({ ...doc.data(), id: doc.id })
        })
        console.info(this.projects) // Todo Comment this
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },/* 
    },
    async handleTodos() {
      this.tab = 'TODOS'
      this.projects = []
      this.error = null
      this.loading = true
      try {
        const { data } = await getTodosByUserId(this.id)
        this.todos = data
        this.count = data.length
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },*/
    handlePerformance() {
      this.tab = 'PERFORMANCE'
    },
      async handleRemove() {
      if (confirm('Are you sure to remove the user?')) {
        try {
          this.loadingRemove = true
          const response = await removeUserById(this.id)
          this.$router.push({ path: '/users' })
          this.loadingRemove = false
        } catch (error) {
          this.loadingRemove = false
          this.errorRemove = error
          console.log(error)
        }
      }
    },/*
    async handleProjects() {
      this.tab = 'PROJECTS'
      this.projects = []
      this.error = null
      this.loading = true
      try {
        const { data } = await getProjectsByUserId(this.id)
        this.projects = data
        this.count = data.length
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },
    async handleComments() {
      this.tab = 'COMMENTS'
      this.comments = []
      this.error = null
      this.loading = true
      try {
        const { data } = await getCommentsByUserId(this.id)
        this.comments = data
        this.count = data.length
        this.loading = false
        this.manager = {
          name: 'Aaron Andrews',
          email: 'aaron@devoteam.com',
          photo: 'https://randomuser.me/api/portraits/men/52.jpg',
        }
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },
    async handleManagerComment(c) {
      alert('Manager Comment ' + c)
      this.loadingManagerCommentSave = true
    },
    async handleUserComment(c) {
      alert('User Comment ' + c)
      this.loadingUserCommentSave = true
    },*/
  },
}
</script>

<style></style>
