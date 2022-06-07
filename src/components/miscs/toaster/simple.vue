<template>
  <div
    class="toast top-right toast-medium"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="simple-toast"
  >
    <div class="toast-header">
      <img src="/img/logo.png" class="rounded mr-2 logo" alt="App logo" />
      <strong class="mr-auto">DevoTeam</strong>
      <small>Just now</small>
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
      {{ message }}
    </div>
  </div>
</template>

<script>
const $ = window.$
export let cmp
export default {
  beforeMount() {
    cmp = this
  },
  data() {
    return {
      message: '',
    }
  },
  mounted() {
    $('.toast').toast({ animation: true, autohide: true, delay: 2500 })
  },
  methods: {
    show(message) {
      this.message = message
      $('.toast').toast('show')
    },
  },
}
</script>

<style scoped>
.top-right {
  position: absolute;
  top: 64px;
  right: 24px;
}
.toast-medium {
  width: 240px;
}
.logo {
  height: 18px;
  width: 18px;
}
</style>
