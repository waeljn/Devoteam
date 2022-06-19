<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Users
              <router-link to="/users/new">
                <a class="btn btn-simple d-inline">Create New</a>
              </router-link>
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">Users</li>
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
      <users-table
        v-if="users && users.length > 0"
        :records="users"
      ></users-table>
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
import UsersTable from '../../components/users/table'
import { getUsers } from '../../domain/users'
export default {
  components: {
    UsersTable,
  },
  data() {
    return {
      loading: false,
      users: [],
      count: null,
      error: null,
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
     async fetchUsers() {
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
          this.error = error
        this.loading = false
        console.log(error)
        
      }
    },
  },
}
</script>

<style></style>
