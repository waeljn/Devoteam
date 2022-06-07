<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <!-- /.row -->
          <router-view />
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <app-footer />
  </div>
</template>

<script>
import NavBar from '../components/nav-bar'
import SideBar from '../components/side-bar'
import AppFooter from '../components/app-footer'
export default {
  components: { NavBar, SideBar, AppFooter },
  data() {
    return {
      isLoggedIn: true,
    }
  },
}
</script>

<style></style>
