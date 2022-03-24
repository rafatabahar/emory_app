<template>
  <div class="relative inline-block text-left">
    <div>
      <button 
        type="button" 
        class="flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
        aria-expanded="true" 
        aria-haspopup="true"
        @click="togleMenu=!togleMenu" >

          <img class="w-10 h-10 rounded-full" :src="$auth.user.avatar" alt="">
          <p class="ml-2">
            {{ $auth.user.first_name +' '+$auth.user.last_name }}
          </p>
        
      </button>
    </div>

    <div v-if="togleMenu" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <nuxt-link :to="`/user/${$auth.user.id}`" class="menu-item" role="menuitem" tabindex="-1">Account</nuxt-link>
        <form method="POST" action="#" role="none">
          <button type="button" class="menu-item w-full text-left" role="menuitem" tabindex="-1" @click="$auth.logout();$router.push('/login')">Sign out</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: 'default.png'
    }
  },
  data() {
    return {
      togleMenu: false
    }
  },
}
</script>

<style>
  .menu-item{
    @apply text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200
  }
</style>