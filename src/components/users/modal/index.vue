<template>
  <!-- Modal -->
  <div
    ref="users-table-modal"
    class="modal fade"
    id="users-table-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="users-table-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="users-table-modal-label">
            Assign a project leader
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3 col-4 float-right">
            <input
              type="text"
              class="form-control"
              placeholder="Search name"
              @input="handleNameInput"
              v-model="name"
            />
            <div class="input-group-append">
              <div
                class="input-group-text with-pointer"
                @click="
                  name = ''
                  filteredUsers = users
                "
              >
                <span class="fa fa-trash"></span>
              </div>
            </div>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Rank</th>
                  <th style="text-align: center;">Action</th>
                </tr>
              </thead>
              <tbody>
                <users-table-item
                  :key="u.id"
                  v-for="u in filteredUsers"
                  :user="u"
                  :leader="leader"
                  @assign="$emit('assign', u)"
                ></users-table-item>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = window.$
import { getProjectById } from '../../../domain/projects'
import UsersTableItem from './users-table-item'
export default {
  components: {
    UsersTableItem,
  },
  props: {
    users: {
      type: Array,
      default: () => {
        return []
      },
    },
    leader: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      project: {
        type: Object,
        default: null,
      },
      name: '',
      filteredUsers: [],
    }
  },
  mounted() {
    this.filteredUsers = this.users
  },
  methods: {
    handleOpenModal(id) {
      this.$refs['users-table-modal'].modal('show')
      const fetch = async () => {
        try {
          this.loading = true
          const { data } = await getProjectById(id)
          this.project = data
          this.loading = false
          $('#users-table-modal').modal('show')
        } catch (error) {
          this.loading = false
          this.error = error
          $('#users-table-modal').modal('hide')
        }
      }
      fetch()
    },
    handleNameInput() {
      this.filteredUsers = this.users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(this.name.toLowerCase()) ||
          u.lastName.toLowerCase().includes(this.name.toLowerCase()),
      )
    },
  },
}
</script>

<style scoped>
.with-pointer {
  cursor: pointer;
}
</style>
