<template>
  <!-- Modal -->
  <div
    ref="performance-table-modal"
    class="modal fade"
    id="performance-table-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="performance-table-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="performance-table-modal-label">
            Ttie
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
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = window.$
import { getProjectById } from '../../../domain/projects'
export default {
  data() {
    return {
      project: {
        type: Object,
        default: null,
      },
    }
  },
  methods: {
    handleOpenModal(id) {
      console.log(this.$refs['performance-table-modal']);
      console.log(id)
      this.$refs['performance-table-modal'].modal('show')
      const fetch = async () => {
        try {
          this.loading = true
          const { data } = await getProjectById(id)
          this.project = data
          this.loading = false
          console.log($('#performance-table-modal'));
          $('#performance-table-modal').modal('show')
        } catch (error) {
          this.loading = false
          this.error = error
          console.log(error)
          $('#performance-table-modal').modal('hide')
        }
      }
      fetch()
    },
  },
}
</script>

<style></style>
