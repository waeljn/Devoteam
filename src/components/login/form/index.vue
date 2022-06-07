<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="https://www.devoteam.com">
        <img class="logo" src="img/full_logo.png" />
      </a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form @submit="handleSubmit">
          <div class="input-group mb-3">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Email"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              :type="passwordHidden ? 'password' : 'text'"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <div class="input-group-append">
              <div
                class="input-group-text with-pointer"
                @click="passwordHidden = !passwordHidden"
              >
                <span v-show="!passwordHidden" class="fas fa-eye-slash"></span>
                <span v-show="passwordHidden" class="fas fa-eye"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="text-danger">{{ error }}</div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember" />
                <label for="remember" class="mx-1 with-pointer">
                  Remember Me
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button type="submit" class="btn btn-rose text-white btn-block">
                Sign In
              </button>
            </div>
            <!-- /.col -->
          </div>
        </form>
        <!-- /.social-auth-links -->
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      email: 'jendoubiwael99@gmail.com',
      password: '123456789',
      passwordHidden: true,
    }
  },
  methods: {
    handleSubmit($e) {
      $e.preventDefault()
      this.$emit('submitted', { email: this.email, password: this.password })
    },
  },
}
</script>

<style scoped>
.logo {
  width: 196px;
}
.btn-rose {
  background-color: #f8485e;
}
.btn-rose:hover {
  background-color: #f7354d;
}
.with-pointer {
  cursor: pointer;
}
</style>
