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
              <form @submit="handleUpdate">
                
                  <!-- Form Group (username)-->
                  <!-- Form Row-->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (first name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputUsername">
                        Username
                      </label>
                      <input
                        v-model="username"
                        class="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder="Enter your username"
                      />
                    </div>
                    <!-- Form Group (last name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputEmail">
                        Email
                      </label>
                      <input
                        v-model="email"
                        class="form-control"
                        id="inputEmail"
                        type="text"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (first name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        v-model="firstName"
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <!-- Form Group (last name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        v-model="lastName"
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <!-- Form Row-->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (phone number)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        v-model="phone"
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value="555-123-4567"
                      />
                    </div>
                    <!-- Form Group (birthDate)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthDate">
                        Birth date
                      </label>
                      <input
                        v-model="birthDate"
                        class="form-control"
                        id="inputBirthDate"
                        type="date"
                        name="birthDate"
                        placeholder="Enter your birthDate"
                        value="06/10/1988"
                      />
                    </div>
                  </div>
                  <!-- Form Row        -->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (address)-->
                    <div class="col-md-12">
                      <label class="small mb-1" for="inputAddress">
                        Address
                      </label>
                      <textarea
                        v-model="address"
                        class="form-control"
                        id="inputAddress"
                        type="text"
                        placeholder="Enter your address"
                        value="San Francisco, CA"
                      ></textarea>
                    </div>
                  </div>
                  <!-- Save changes button-->
                   <button type="submit" class="btn btn-primary">Update</button>
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

import { getUserById, updateUserById } from '../../../../domain/users'
export default {
  data() {
    return {
      id: null,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      phone: null,
      birthDate: null,
      address : null,
      loading: false,
      error: null,
     
     
      user: null, // TODO Remove this
    }
  },
  mounted() {
    this.id = this.$route?.params?.id
    console.log(this.id)
  
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
     const fn2 = async () => {
        try {
          const snap = await getUserById(this.id)
          
            this.username = snap.data().username
          this.firstName = snap.data().firstName
          this.email = snap.data().email
          this.birthDate = snap.data().birthDate
          this.address = snap.data().address
          this.lastName = snap.data().lastName
          this.phone = snap.data().phone
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
          username: this.username,
          firstName: this.firstName,
          email: this.email,
          phone: this.phone,
          lastName: this.lastName,
          birthDate: this.birthDate,
          address : this.address
        }
        this.loading = true
        this.user = await updateUserById(this.id, u)
        this.loading = false
         this.$router.push({ path: '/users/' })
         Toaster.show('User Updated')
         
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
