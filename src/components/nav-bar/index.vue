<template>
  <!-- /.navbar -->
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav" v-if="profile">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <router-link to="/">
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">Home</a>
        </li>
      </router-link>
      <router-link to="/contact">
        <li class="nav-item d-none d-sm-inline-block">
          <a class="nav-link">Contact</a>
        </li>
      </router-link>
    </ul>
    <ul class="navbar-nav" v-if="!profile">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <router-link to="/profile">
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">Profile</a>
        </li>
      </router-link>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input
                class="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button
                  class="btn btn-navbar"
                  type="button"
                  data-widget="navbar-search"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-cog"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <router-link to="/profile">
            <a href="#" class="dropdown-item">
              <i class="fas fa-user mr-2"></i>
              Profile
            </a>
          </router-link>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" @click="handleLogout">
            <i class="fa fa-sign-out mr-2"></i>
            Sign out
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { logout } from '../../domain/auth'
export default {
  data() {
    return {
      profile: null,
    }
  },
  mounted() {
    this.profile = localStorage.getItem('profile')
  },
  methods: {
    async handleLogout() {
      if (confirm('Are you sure to sign out?')) {
        try {
          await logout()
          localStorage.clear()
          location.reload()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style></style>
