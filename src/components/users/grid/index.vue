<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Latest Members</h3>
        <div class="card-tools">
          <span class="badge badge-danger">{{ users.length }} New Members</span>
          <button
            type="button"
            class="btn btn-tool"
            data-card-widget="collapse"
          >
            <i class="fas fa-minus"></i>
          </button>
          <button type="button" class="btn btn-tool" data-card-widget="remove">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <ul class="users-list clearfix">
          <li :key="u.id" v-for="u in users">
            <img
              :src="'https://randomuser.me/api/portraits/men/' + u.id + '.jpg'"
              alt="User Image"
            />
            <a class="users-list-name" href="#">{{ u.name }}</a>
            <span
              class="users-list-date text-danger with-pointer"
              @click="$emit('remove', u.id)"
            >
              Remove
            </span>
          </li>
        </ul>
      </div>

      <a href="#" class="card-footer text-cente">
        <router-link to="/users">
          <span class="text-white mx-2">More info</span>
          <i class="fas fa-arrow-circle-right text-white"></i>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.with-pointer {
  cursor: pointer;
}
</style>
