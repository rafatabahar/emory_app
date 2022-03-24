<template>
  <div class="h-screen flex justify-center items-center bg-gray-200">
    <div class="flex justify-center items-center bg-white py-8 px-12 rounded-md shadow-lg md:w-2/5 sm:w-3/4">
      <form class="bg-white w-3/4" @submit.prevent="login()">

        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" v-if="error">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ error }}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="error = ''">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>

        <h1 class="text-gray-800 font-bold text-2xl mb-1 mt-2">Hello Again!</h1>
        <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

        <div class="input-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <input 
            v-model="email" 
            class="pl-2 outline-none border-none" 
            type="text" 
            placeholder="Email Address" 
            required />
        </div>

        <div class="input-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          <input 
            v-model="password" 
            class="pl-2 outline-none border-none" 
            type="password" 
            placeholder="Password" 
            required />
        </div>
        
        <button 
          :disabled="loading"
          :class="{'cursor-not-allowed opacity-50' : loading }"
          type="submit" 
          class="flex w-full justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Login
        </button>
        <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
      return {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
          error: '',
          loading: false
      }
  },
  mounted() {
      
  },
  methods: {
    async login() {
      try {
        this.loading = true;

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        const user = await this.$axios.get('users/2')
        this.$auth.setUser(user.data.data)

        this.$router.push('/')
      } catch (e) {
        if(e.response){
          this.error = e.response.data.error
          console.log(this.error);
          console.log(e.response);
        }else{
          this.error = 'Unknow error, please try again'
        }

        this.loading = false;
      }
    }
  }
}
</script>

<style>
  .input-container{
    @apply flex items-center border-2 py-2 px-3 rounded-2xl mb-4 overflow-hidden;
  }
</style>