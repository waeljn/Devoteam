<template>
  <div
    class="col-md-8 mx-auto card card-primary card-outline direct-chat direct-chat-primary"
  >
    <div class="card-header">
      <h3 class="card-title">{{ user.name }}</h3>
      <div class="card-tools">
        <span title="3 New Messages" class="badge bg-primary mx-2">
          3 Notifications
        </span>
        <router-link v-if="user.id" :to="'/users/' + user.id + '/edit'">
          <a
            type="button"
            class="btn btn-tool"
            title="Edit"
            data-widget="chat-pane-toggle"
            @click="$emit('update')"
          >
            <i class="fas fa-pencil"></i>
          </a>
        </router-link>
        <button
          type="button"
          class="btn btn-tool"
          data-card-widget="remove"
          title="Remove"
          @click="$emit('remove')"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="card card-widget widget-user shadow-lg">
      <div
        class="widget-user-header text-white"
        style="
          background: url('https://adminlte.io/themes/v3/dist/img/photo1.png')
            center center;
        "
      >
        <h3 class="widget-user-username text-right"></h3>
        <h5 class="widget-user-desc text-right">{{ user.website }}</h5>
      </div>
      <div class="widget-user-image">
        <img
          class="img-circle"
          :src="
            'https://randomuser.me/api/portraits/med/men/' + user.id + '.jpg'
          "
          alt="User Avatar"
        />
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-sm-4 border-right">
            <div class="description-block">
              <h5 class="description-header">Username</h5>
              <span class="description-text">{{ user.username }}</span>
            </div>
          </div>
          <div class="col-sm-4 border-right">
            <div class="description-block">
              <h5 class="description-header">Email</h5>
              <span class="description-text">{{ user.email }}</span>
            </div>
          </div>

          <div class="col-sm-4">
            <div class="description-block">
              <h5 class="description-header">Phone</h5>
              <span class="description-text">{{ user.phone }}</span>
            </div>
          </div>
        </div>
        <ul class="nav flex-column">
          <li class="nav-item" @click="$emit('projects')">
            <a class="nav-link with-pointer">
              Projects
              <span class="float-right badge bg-primary">31</span>
            </a>
          </li>
          <li class="nav-item" @click="$emit('todos')">
            <a class="nav-link with-pointer">
              Tasks
              <span class="float-right badge bg-info">5</span>
            </a>
          </li>
          <li class="nav-item" @click="$emit('performance')" v-if="role === 'ROLE_ADMIN'">
            <a class="nav-link with-pointer">
              Calculate performance
            </a>
          </li>
          <li class="nav-item" @click="$emit('comments')">
            <a class="nav-link with-pointer">
              Comments
            </a>
          </li>
        </ul>
      </div>
    </div>
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
  data() {
    return {
      role: null,
    }
  },
  mounted() {
    this.role = localStorage.getItem('role')
  },
}
</script>
<style scoped>
.with-pointer {
  cursor: pointer;
}
</style>
