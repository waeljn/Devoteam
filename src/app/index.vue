<template>
  <div>
    <login v-if="!isLogged"></login>
    <layout v-if="isLogged"></layout>
    <miscs v-if="isLogged"></miscs>
  </div>
</template>
<script>
import Login from '../views/login'
import Layout from '../layout'
import Miscs from '../components/miscs'
export default {
  components: { Login, Layout, Miscs },
  data() {
    return {
      isLogged: false,
    }
  },
  mounted() {
    const email = localStorage.getItem('email')
    if (email) {
      this.isLogged = true
    } else {
      this.isLogged = false
    }
  },
}
</script>
