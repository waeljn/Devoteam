<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img
        src="img/logo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8;"
      />
      <span class="brand-text font-weight-light">DevoTeam</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar" v-if="profile">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="img/avatar.png"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
           <router-link to="/" >
          <a  class="d-block">{{ email }}</a>
           </router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link" >
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </router-link>
          </li>
          <li class="nav-item"  >
            <router-link to="/users" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Users
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projects" class="nav-link">
              <i class="nav-icon fas fa-edit"></i>
              <p>
                Projects
              </p>
            </router-link>
          </li>
        
        
          <li class="nav-item" >
            <router-link to="/workspace" class="nav-link">
              <i class="nav-icon fas fa-sticky-note"></i>
              <p>
                Workspace
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">
              <i class="nav-icon fas fa-address-book"></i>
              <p>
                Contact
              </p>
            </router-link>
          </li> 
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- Sidebar -->
    <div class="sidebar" v-if="!profile">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="img/avatar.png"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ email }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="/profile" class="nav-link btn-danger text-white">
              <i class="nav-icon fa fa-user"></i>
              <p>
                Profile
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      role: null,
      profile: null,
    }
  },
  mounted() {
    this.email = localStorage.getItem('email')
    this.role = localStorage.getItem('role')
    this.profile = localStorage.getItem('profile')
  },
}
</script>
<style scoped>
.nav-icon-sm {
  font-size: 16px;
}
</style>
