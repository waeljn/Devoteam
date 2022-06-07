<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="container-xl mx-auto">
        <!-- Account page navigation-->
        <nav class="nav nav-borders">
          <router-link to="/profile">
            <a class="nav-link ms-0" target="#">Profile</a>
          </router-link>
          <router-link to="/profile/security">
            <a class="nav-link active" target="#">Security</a>
          </router-link>
        </nav>
        <hr class="mt-0 mb-4" />
        <div class="row">
          <div class="col-lg-8">
            <!-- Change password card-->
            <div class="card mb-4">
              <div class="card-header">Change Password</div>
              <div class="card-body">
                <form>
                  <!-- Form Group (new password)-->
                  <div class="mb-3">
                    <label class="small mb-1" for="newPassword">
                      New Password
                    </label>
                    <input
                      class="form-control"
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      v-model="newPassword"
                    />
                  </div>
                  <!-- Form Group (confirm password)-->
                  <div class="mb-3">
                    <label class="small mb-1" for="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      class="form-control"
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      v-model="confirmPassword"
                    />
                  </div>
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="handleChangePassword"
                  >
                    Save
                  </button>
                  <span class="text-danger mx-2" v-show="error">
                    {{ error }}
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toaster } from '../../../components/miscs/toaster'
import { changePassword, logout } from '../../../domain/auth'
export default {
  data() {
    return {
      security: null,
      newPassword: '',
      confirmPassword: '',
      error: '',
    }
  },
  mounted() {
    this.security = JSON.parse(localStorage.getItem('security'))
  },
  methods: {
    handleMakeProfile() {
      Toaster.show('Profile Created')
      location.href = '/'
    },
    handleDeleteProfile() {
      if (confirm('Are you sure to delete the profile?')) {
        localStorage.removeItem('profile')
        location.reload()
      }
    },
    async handleChangePassword($e) {
      this.error = ''
      $e.preventDefault()
      if (this.newPassword === this.confirmPassword) {
        await changePassword({ newPassword: this.newPassword })
      
        location.href =" /home"
      } else {
        this.error = 'New and old password do no match'
      }
    },
  },
}
</script>
