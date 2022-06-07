<template>
  <div class="d-flex flex-row align-items-center">
    <img :src="user.avatar" class="avatar mx-2" />
    <div class="d-flex flex-column">
      <div>
        {{ user.firstName }} {{ user.lastName }}
        <span class="badge bg-info" v-if="user.role === 'ROLE_CONSULTANT'">
          Consultant
        </span>
        <span class="badge bg-primary" v-if="user.role === 'ROLE_MANAGER'">
          Manager
        </span>
        <span class="badge bg-danger" v-if="user.role === 'ROLE_ADMIN'">
          Admin
        </span>
        ({{ user.rank }})
      </div>
      <small>{{ user.email }}</small>
    </div>
    <button class="btn btn-secondary btn-sm mx-5 float-right" type="button" @click="$emit('change')">Change</button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
</style>
