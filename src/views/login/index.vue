<template>
  <div class="login-page">
    <login-form :error="error" @submitted="handleLogin"></login-form>
  </div>
</template>

<script>
import LoginForm from '../../components/login/form'
import { getRole, login } from '../../domain/auth'
export default {
  components: { LoginForm },
  data() {
    return {
      error: null,
    }
  },
  methods: {
    async handleLogin({ email, password }) {
      try {
        const { user } = await login({ email, password })
        console.log(user)
        const role = await getRole()
        localStorage.setItem('email', email)
        localStorage.setItem('email', email)
        localStorage.setItem('profile', 'true')
        location.reload()
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>
<style scoped>
.logo-container {
  border-radius: 36px;
}
.logo {
  width: 72px;
  height: 72px;
  border-radius: 36px;
  resize: calc(40);
}
</style>
