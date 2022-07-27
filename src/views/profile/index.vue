<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="container-xl">
        <!-- Account page navigation-->
        <nav class="nav nav-borders">
          <router-link to="/profile">
            <a class="nav-link active ms-0" href="#">Profile</a>
          </router-link>
          <router-link to="profile/security">
            <a class="nav-link" href="#">Security</a>
          </router-link>
        </nav>
        <hr class="mt-0 mb-4" />
        <div class="row">
          <div class="col-xl-4">
            <!-- Profile picture card-->
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <!-- Profile picture image-->
                <img
                  v-if="avatar"
                  class="img-account-profile rounded-circle mb-2"
                  :src="avatar"
                  alt=""
                />
                <img
                  class="img-account-profile rounded-circle mb-2"
                  v-if="!avatar"
                  src="/img/user.png"
                  alt=""
                />
                <!-- Profile picture help block-->
                <div class="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <!-- Profile picture upload button-->
                <button
                  class="btn btn-primary"
                  type="button"
                  :disabled="loadingUpload"
                  @click="handleOpenFileManager"
                >
                  <span v-show="!loadingUpload">Upload new image</span>
                  <span v-show="loadingUpload">Uploading...</span>
                  <div
                    class="spinner-border spinner-border-sm text-white mr-2"
                    role="status"
                    v-show="loadingUpload"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <!-- Account details card-->
            <div class="card mb-4">
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <form>
                  <!-- Form Group (username)-->
                  <!-- Form Row-->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (first name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputUsername">
                        Username
                      </label>
                      <input
                        v-model="username"
                        class="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder="Enter your username"
                      />
                    </div>
                    <!-- Form Group (last name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputEmail">
                        Email
                      </label>
                      <input
                        v-model="email"
                        class="form-control"
                        id="inputEmail"
                        type="text"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (first name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        v-model="firstName"
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <!-- Form Group (last name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        v-model="lastName"
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <!-- Form Row-->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (phone number)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        v-model="phone"
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value="555-123-4567"
                      />
                    </div>
                    <!-- Form Group (birthDate)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthDate">
                        Birth date
                      </label>
                      <input
                        v-model="birthDate"
                        class="form-control"
                        id="inputBirthDate"
                        type="date"
                        name="birthDate"
                        placeholder="Enter your birthDate"
                        value="06/10/1988"
                      />
                    </div>
                  </div>
                  <!-- Form Row        -->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (address)-->
                    <div class="col-md-12">
                      <label class="small mb-1" for="inputAddress">
                        Address
                      </label>
                      <textarea
                        v-model="address"
                        class="form-control"
                        id="inputAddress"
                        type="text"
                        placeholder="Enter your address"
                        value="San Francisco, CA"
                      ></textarea>
                    </div>
                  </div>
                  <!-- Save changes button-->
                  <router-link to="profile/security">
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="handleMakeProfile"
                    >
                      Save changes
                    </button>
                  </router-link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- /.container-fluid -->
    <input
      v-show="false"
      type="file"
      id="input-upload"
      ref="fileInput"
      @change="handleUploadPhoto"
    />
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { getUserById, getUsers, updateUserById } from '../../domain/users'
import { getUser } from '../../domain/auth'

export default {
  data() {
    return {
      id : null,
      profile: null,
      username: null,
      firstName: null,
      lastName: null,
      address: null,
      email: null,
      phone: null,
      birthDate: null,
      avatar: null,
      loading: false,
      loadingUpload: false,
    }
  },
  mounted() {
    this.id = this.$route?.params?.id
    console.log(this.id)
    this.handleGetUser()
  },
  methods: {
    handleMakeProfile() {
      const fn = async () => {
        try {
          const profile = {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            email: this.email,
            phone: this.phone,
            birthDate: this.birthDate,
            avatar: this.avatar,
          }
          console.log(profile)
         const { uid } = getUser()
          const { data } = await updateUserById(uid, profile)
        } catch (error) {
          console.log(error)
         // alert('An error happened!')
        }
      }
      fn()
    },
    handleDeleteProfile() {
      if (confirm('Are you sure to delete the profile?')) {
        localStorage.removeItem('profile')
        location.reload()
      }
    },

    handleUploadPhoto($event) {
      function makeid(length) {
        var result = ''
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          )
        }
        return result
      }

      const randid = makeid(24)
      this.photo = null
      this.loadingUpload = true
      const file = $event.target.files[0]
      const storage = getStorage()
      const storageRef = ref(storage, 'avatars/' + randid + '.jpg')

      const uploadTask = uploadBytesResumable(storageRef, file)

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.avatar = downloadURL
            this.loadingUpload = false
          })
        },
      )
    },
    handleOpenFileManager() {
      this.$refs['fileInput'].click()
    },
    handleGetUser() {
      const fetch = async () => {
        try {
          const snap = await getUserById("pZQJkP3dpKZ4YZeAeexx2aBo8Fp1")
          
            this.username = snap.data().username
          this.firstName = snap.data().firstName
          this.email = snap.data().email
          this.birthDate = snap.data().birthDate
          this.address = snap.data().address
          this.lastName = snap.data().lastName
          this.phone = snap.data().phone
          this.avatar=snap.data().avatar
            console.log(doc.id, ' => ', doc.data())
          
        } catch (error) {
          console.log(error)
        }
      }
      fetch()
    },
  },
}
</script>

<style>
.img-account-profile {
  height: 10rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
</style>
