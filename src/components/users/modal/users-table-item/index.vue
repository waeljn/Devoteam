<template>
  <tr>
    <td>
      <img
        :src="user.avatar"
        alt="Product 1"
        class="img-circle img-size-32 mr-2"
      />
    </td>
    <td>
      {{ user.firstName }}
      {{ user.lastName }}
    </td>
    <td>
      <span class="badge bg-info" v-if="user.role === 'ROLE_CONSULTANT'">
        Consultant
      </span>
      <span class="badge bg-primary" v-if="user.role === 'ROLE_MANAGER'">
        Manager
      </span>
      <span class="badge bg-danger" v-if="user.role === 'ROLE_ADMIN'">
        Admin
      </span>
    </td>
    <td>
      {{ user.rank }}
    </td>
    <td>
      <a
        :href="'#/users/' + user.id"
        target="_blank"
        class="btn btn-sm btn-outline-secondary float-right"
      >
        <i class="fa fa-eye"></i>
        View
      </a>
      <button
        class="btn btn-sm btn-outline-info float-right mr-2"
        @click="$emit('assign')"
        v-show="!assignee"
      >
        <i class="fa fa-check"></i>
        Assign
      </button>
      <button
        class="btn btn-sm btn-outline-info float-right mr-2"
        @click="$emit('assign')"
        v-show="assignee && user.id !== assignee.id"
      >
        <i class="fa fa-check"></i>
        Assign
      </button>
      <button
        class="btn btn-sm btn-outline-gray float-right mr-2"
        @click="$emit('assign')"
        v-show="assignee && user.id === assignee.id"
        disabled
      >
        <i class="fa fa-check"></i>
        Assigned
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    assignee: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style></style>
