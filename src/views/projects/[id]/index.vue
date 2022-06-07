<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Project Details
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/projects">
                <li class="breadcrumb-item">Projects</li>
              </router-link>
              <li class="breadcrumb-item active ml-2">Project Details</li>
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
      <project-details
        :project="project"
        v-if="project"
        @remove="handleRemove"
        :loading="loadingRemove"
      ></project-details>
      <div class="card" v-if="error">
        <div class="card-body text-danger">{{ error }}</div>
      </div>
      <div class="card" v-if="errorRemove">
        <div class="card-body text-danger">{{ errorRemove }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectDetails from '../../../components/projects/details'
import { removeProjectById, getProjectById } from '../../../domain/projects'
export default {
  components: {
    ProjectDetails,
  },
  data() {
    return {
      id: null,
      project: null,
      loading: false,
      error: null,
      loadingRemove: false,
      errorRemove: null
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
        const snap = await getProjectById(this.id)
        this.project = { ...snap.data(), id: this.id }
        console.info(this.project) // Todo Comment this
        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error
        console.log(error)
      }
    },
    async handleRemove() {
      if (confirm('Are you sure to remove the project?')) {
        try {
          this.loadingRemove = true
          const response = await removeProjectById(this.id)
          this.$router.push({ path: '/projects' })
          this.loadingRemove = false
        } catch (error) {
          this.loadingRemove = false
          this.errorRemove = error
          console.log(error)
        }
      }
    },
  },
}
</script>

<style></style>
