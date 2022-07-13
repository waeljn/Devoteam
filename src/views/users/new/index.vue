<template>
  <!-- Content Header (Page header) -->
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              New User
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <router-link to="/users">
                <li class="breadcrumb-item ml-2">Users</li>
              </router-link>
              <li class="breadcrumb-item ml-2">Create User</li>
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
                  <label for="exampleFormControlInput1">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Exemple@devoteam.com"
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="exampleFormControlInput1">Password</label>
                  <button
                    class="btn btn-sm btn-info float-right"
                    type="button"
                    @click="handleGeneratePassword"
                  >
                    Generate
                  </button>
                  <div class="input-group">
                    <input
                      v-model="password"
                      :type="passwordHidden ? 'password' : 'text'"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="TestDevoteam123"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text with-pointer"
                        @click="passwordHidden = !passwordHidden"
                      >
                        <span
                          v-show="!passwordHidden"
                          class="fas fa-eye-slash"
                        ></span>
                        <span v-show="passwordHidden" class="fas fa-eye"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Role</label>
                  <select
                    v-model="role"
                    class="form-control"
                    id="exampleFormControlSelect1"
                    :disabled="!roles"
                  >
                    <option :value="null" disabled>
                      Select a role
                    </option>
                    <option :key="r" :value="r" v-for="r in roles">
                      {{ r.split('_')[1] }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Rank</label>
                  <select
                    v-model="rank"
                    class="form-control"
                    id="exampleFormControlSelect1"
                    :disabled="!ranks"
                  >
                    <option :value="null" disabled>
                      Select a rank
                    </option>
                    <option :key="r" :value="r" v-for="r in ranks">
                      {{ r }}
                    </option>
                  </select>
                </div>
                <button
                  :disabled="!email || !password || !role"
                  type="submit"
                  class="btn btn-primary"
                >
                  Submit
                </button>
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
import { roles, createUser, ranks } from '../../../domain/auth'
import { createUser as createDbUser } from '../../../domain/users'
import { getTodos } from '../../../domain/todos'
import { Toaster } from '../../../components/miscs'
export default {
  data() {
    return {
      email: null,
      password: null,
      role: null,
      rank: null,
      loading: false,
      error: null,
      roles,
        username: '',
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phone: '',
      birthDate: '',
      organization: '',
      passwordHidden: true,
      user: null, // TODO Remove this
      ranks,
    }
  },
  mounted() {
    this.fetchTodos()
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
    async handleCreate($e) {
      $e.preventDefault()
      try {
        let u = {
          email: this.email,
          password: this.password,
        }
        this.loading = true
        const { user } = await createUser(u)
        const { data } = await createDbUser({
          id: user.uid,
          email: user.email,
          role: this.role,
          rank: this.rank,
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          email: this.email,
          phone: this.phone,
          birthDate: this.birthDate,
          organization: this.organization,
        })
        this.loading = false
        this.$router.push({ path: '/users/' })
        Toaster.show('User created')
      } catch (error) {
        this.loading = false
        this.error = false
        console.error(error)
      }
    },
    handleGeneratePassword($e) {
      $e.preventDefault()
      function makeid(length) {
        var result = ''
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          )
        }
        return result
      }

      this.password = makeid(12)
    },
  },
}
</script>

<style scoped>
.with-pointer {
  cursor: pointer;
}
</style>
