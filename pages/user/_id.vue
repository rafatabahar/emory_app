<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="h-full flex justify-center items-center bg-gray-200">
      <div class="border-b-2 block md:flex">

        <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg text-center" :class="{'md:w-full' : !editable}">
          <div class="flex justify-center text-center item-center">
            <span class="text-xl font-semibold block">{{ user.first_name+' '+user.last_name }}</span>
          </div>

          <span class="text-gray-600">{{ user.email }}</span>
          <div class="w-full p-8 mx-2 flex justify-center items-center">
            <img class="max-w-xs w-32 items-center border rounded-full ring-2 ring-offset-2 ring-black" :src="user.avatar" :alt="user.first_name + ' Photo'">
          </div>
        </div>
        
        <div v-if="editable" class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md rounded-lg">
          <Notification
            v-if="notification.show"
            :type="notification.type"
            :message="notification.message"
            classes="mb-2"
            @closeButtonClick="notification.show = false"
          />
          <form @submit.prevent="updateProfile()">
            <div class="rounded shadow p-6">
              <div class="pb-4">
                <label for="name" class="font-semibold text-gray-700 block pb-1">First Name</label>
                <div class="flex">
                  <input v-model="user.first_name" class="border-1 rounded-r px-4 py-2 w-full bg-gray-100" type="text" />
                </div>
              </div>
              <div class="pb-4">
                <label for="name" class="font-semibold text-gray-700 block pb-1">Last Name</label>
                <div class="flex">
                  <input v-model="user.last_name" class="border-1 rounded-r px-4 py-2 w-full bg-gray-100" type="text" />
                </div>
              </div>
              <div class="pb-4">
                <label for="about" class="font-semibold text-gray-700 block pb-1">Email</label>
                <input v-model="user.email" class="border-1 rounded-r px-4 py-2 w-full bg-gray-100" type="email" />
              </div>
              <!-- <button class="flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 cursor-pointer">Update</button> -->
              <AppButton
                :disabled="isLoading"
                :is-loading="isLoading"
                type="submit">
                Update
              </AppButton>
            </div>
          </form>
        </div>

      </div>
    
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'UserDetailPage',
  async asyncData({params, $axios, $auth}) {
    const { data } = await $axios.get('/users/' + params.id);

    const loggedInUser = await $axios.get('users/2') 
    $auth.setUser(loggedInUser.data.data)

    return { user: data.data }
  },
  data() {
    return {
      user: null,
      isLoading: false,
      notification: {
        show: false,
        type: "",
        message: "",
      }
    }
  },
  computed: {
    editable(){
      return this.user.id === this.$auth.user.id
    }
  },
  mounted() {
    
  },
  methods: {
    async updateProfile(){
      try {
        this.isLoading = true;
        const { data } = await this.$axios.patch('/users/'+this.$route.params.id, this.user)
        console.log(data);

        this.notification = {
          show: true,
          type: 'success',
          message: 'Successfully updated profile'
        }

        this.isLoading = false;
      } catch (error) {
        console.log(error);

        this.notification = {
          show: true,
          type: 'error',
          message: 'Something went wrong'
        }

        this.isLoading = false;
      }
    }
  },
}
</script>
