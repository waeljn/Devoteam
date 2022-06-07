<template>
  <footer class="main-footer">
    <strong>
      Copyright © {{ currentYear }}
      <a href="https://www.devoteam.com">DevoTeam.com</a>
      .
    </strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b>
      1.0.0
    </div>
  </footer>
</template>

<script>
export default {
  data(){
    return {
      currentYear: null
    }
  },
  mounted(){
    this.currentYear = this.getCurrentYear()
  },
  methods: {
    getCurrentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
