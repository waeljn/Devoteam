<template>
  <div class="post">
    <div class="user-block">
      <img
        class="img-circle img-bordered-sm"
        :src="user.photo || 'https://randomuser.me/api/portraits/men/52.jpg'"
        alt="user image"
      />
      <a
        type="button"
        class="btn btn-tool float-right"
        title="Edit"
        data-widget="chat-pane-toggle"
        v-if="isEditable"
        @click="handleToggleInput"
      >
        <i class="fas fa-pencil"></i>
      </a>
      <span class="username">
        <a href="#">{{ user.firstName }} {{ user.lastName }}</a>
      </span>
      <span class="description">{{ user.email }}</span>
    </div>

    <p v-if="!isInput">
      {{ comment }}
    </p>
    <textarea
      class="form-control"
      v-if="isInput"
      v-model="inputComment"
    ></textarea>
    <button
      v-if="isInput"
      class="btn btn-primary mt-2"
      :disabled="loading || !inputComment"
      @click="$emit('save', inputComment)"
    >
      <i class="fa fa-save mr-2" v-show="!loading"></i>
      <span v-show="!loading">Save</span>
      <div
        class="spinner-border spinner-border-sm text-white mr-2"
        role="status"
        v-show="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInput: false,
      inputComment: '',
    }
  },
  mounted() {
    if (!this.comment) {
      this.isInput = true
    } else {
      this.inputComment = this.comment
    }
  },
  methods: {
    handleToggleInput() {
      this.isInput = !this.isInput
    },
  },
}
</script>

<style></style>
