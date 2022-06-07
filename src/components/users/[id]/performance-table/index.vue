<template>
  <div class="card">
    <div class="card-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Objectives</th>
            <th scope="col">%</th>
            <th scope="col">Deadline</th>
            <th scope="col">N+1</th>
            <th scope="col">N</th>
          </tr>
        </thead>
        <tbody>
          <row
            :key="o.id"
            v-for="o in objectives"
            :objective="o"
            @gate-clicked="handleGateClicked"
            @open-modal="handleOpenModal"
          ></row>
        </tbody>
      </table>

      <div class="float-right mt-3">
        <button
          class="btn btn-sm btn-primary mr-3"
          @click="handleCalculatePerformance"
        >
          Calculate Performance
        </button>
        <span v-if="result" class="text-bold mr-3">{{ result }}%</span>
      </div>
    </div>

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
            <div class="modal-body" v-if="loading">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <h5
              class="modal-title"
              id="performance-table-modal-label"
              v-if="!loading && project"
            >
              {{ project.title }}
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
          <div class="modal-body" v-if="loading">
            ...
          </div>
          <div class="modal-body" v-if="!loading && project">
            {{ project.title }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import objectives from './objectives.json'
import Row from './row'
const $ = window.$
import { getProjectById } from '../../../../domain/projects'
export default {
  components: {
    Row,
  },
  data() {
    return {
      objectives,
      result: 0,
      project: null,
      loading: false,
    }
  },
  methods: {
    handleCalculatePerformance() {
      this.result = 0
      try {
        let all = true
        this.objectives.forEach((o) => {
          if (!o.value) {
            all = false
          }
        })
        if (all) {
          this.objectives.forEach((o) => {
            this.result = this.result + o.value * o.weight
          })
        } else {
          throw 'Please pick all the gates'
        }
      } catch (error) {
        alert(error)
      }
    },
    handleGateClicked({ id, value }) {
      this.objectives = this.objectives.map((o) =>
        o.id === id ? { ...o, value } : o,
      )
    },
    handleOpenModal(id) {
      const fetch = async () => {
        try {
          $('#performance-table-modal').modal('show')
          this.loading = true
          const { data } = await getProjectById(id)
          this.project = data
          this.loading = false
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
