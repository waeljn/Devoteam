<template>
  <div>
    <simple-toast></simple-toast>
  </div>
</template>

<script>
import SimpleToast from './toaster/simple.vue'
import { Toaster } from './toaster'
export { Toaster }
export default {
  components: {
    SimpleToast,
  },
}
</script>

<style></style>
