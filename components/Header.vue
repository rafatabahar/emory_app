<template>
  <!-- navbar goes here -->
  <nav class="bg-gray-100 shadow">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">

        <div class="flex space-x-4">
          <!-- logo -->
          <div>
            <nuxt-link to="/" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
              <svg class="h-6 w-6 mr-1 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span class="font-bold">Emory App</span>
            </nuxt-link>
          </div>

          <!-- primary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <nuxt-link to="/" class="py-5 px-3 text-gray-700 hover:text-gray-900">Users</nuxt-link>
            <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">About</a>
          </div>
        </div>

        <!-- secondary nav -->
        <div class="hidden md:flex items-center space-x-1">
          <UserDropdownMenu />
        </div>

        <!-- mobile button goes here -->
        <div class="md:hidden flex items-center">
          <button class="mobile-menu-button" @click="togleMobile=!togleMobile">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- mobile menu -->
    <div class="mobile-menu md:hidden" :class="{ 'hidden': !togleMobile }">
      <a href="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Users</a>
      <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">About</a>
      <a :href="'/users/' + $auth.user.id" class="block py-2 px-4 text-sm hover:bg-gray-200">Profile</a>
      <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200" @click="$auth.logout();$router.push('/login')">Sign Out</a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      togleMobile: false,
    }
  },
}
</script>
