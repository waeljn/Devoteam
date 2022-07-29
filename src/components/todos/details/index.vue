<template>
  <section class="content">
    <div class="card col-md-8 mx-auto">
      <div class="card-header">
        <h3 class="card-title"></h3>
        <div class="card-tools">
         
        <button
            type="button"
            class="btn btn-tool"
            data-card-widget="remove"
            title="Remove"
            v-show="!loading"
            @click="$emit('remove')"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
      ....
        </div>
      
    </div>
  </section>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style></style>
