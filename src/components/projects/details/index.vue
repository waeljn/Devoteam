<template>
  <section class="content">
    <div class="card col-md-8 mx-auto">
      <div class="card-header">
        <h2 class="card-title text-danger">
            
              
             {{ project.title }}
            
        </h2  >
        
        <div class="card-tools">
          <router-link
            v-if="project.id"
            :to="'/projects/' + project.id + '/edit'"
          >
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
            v-show="!loading"
            @click="$emit('remove')"
          >
            <i class="fas fa-trash"></i>
          </button>
          <div
            class="spinner-border spinner-border-sm text-secondary mr-2"
            role="status"
            v-show="loading"
          >
            <span class="sr-only">Please wait...</span>
          </div>
        </div>
      </div>
      
      <div class="card-body">
        
        <div class="row">
          <div class="col-12 col-md-12 col-lg-8 order-2 order-md-1">
            <div class="row">
              
              <div class="col-12 col-sm-4">
                <div class="info-box bg-light">
                  <div class="info-box-content">
                    <span class="info-box-text text-center text-muted">
                      Company
                    </span>
                    <span class="info-box-number text-center text-muted mb-0">
                       {{ project.company }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                <div class="info-box bg-light">
                  <div class="info-box-content">
                    <span class="info-box-text text-center text-muted">
                         Status                    </span>
                    <span class="info-box-number text-center text-muted mb-0">
                      {{ project.status }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                <div class="info-box bg-light">
                  <div class="info-box-content">
                    <span class="info-box-text text-center text-muted">
                      Created At
                    </span>
                    <span class="info-box-number text-center text-muted mb-0">
                      {{ project.createdAt }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h4>Project desciption</h4>
                <div class="post">
                 
                    
                  
               
               
                </div>
               
                {{ project.description }}
                <div class="post">
               

                
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-4 order-1 order-md-2">
           
            <p class="text-muted">
              {{ project.desciption }}
            </p>
            <br />
            <div class="text-muted">
              <p class="text-sm">
                Leader Name 
                <b class="d-block"></b>
              </p>
              <p class="text-sm">
                Project Leader ID
                <b class="d-block"> {{ project.leaderId }}</b>
              </p>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
