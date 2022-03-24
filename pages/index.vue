<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="bg-white p-8 rounded-md w-full">
      <div class=" flex items-center justify-between pb-6">
        <div>
          <h2 class="text-gray-600 font-semibold">Emory Users</h2>
          <span class="text-xs">All Users</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="bg-gray-50 items-center p-2 rounded-md hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <input class="bg-gray-50 outline-none ml-1 block" type="text" name="" placeholder="search...">
          </div>
          <div class="lg:ml-40 ml-10 space-x-8">
            <button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
          </div>
        </div>
      </div>
      <div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User Id
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user) in users.data" :key="user.id">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ user.id }}
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img 
                          class="w-full h-full rounded-full"
                          :src="user.avatar"
                          :alt="user.first_name +' photo'" />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ user.first_name +' '+ user.last_name}}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ user.email }}
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <nuxt-link :to="`user/${user.id}`" class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Detail</nuxt-link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span class="text-xs xs:text-sm text-gray-900">
                  Showing {{ (users.page * users.per_page) - users.per_page + 1 }} to {{ users.page * users.per_page }} of {{ users.total }} Entries
              </span>
              <div class="inline-flex mt-2 xs:mt-0">
                <button 
                  :disabled="users.page-1 <= 0"
                  :class="{'cursor-not-allowed opacity-50' : users.page-1 <= 0 }"
                  class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
                  @click="movePage(users.page-1)">
                    Prev
                </button>
                &nbsp; &nbsp;
                <button
                  :disabled="users.page == users.total_pages"
                  :class="{'cursor-not-allowed opacity-50' : users.page == users.total_pages }"
                  class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
                  @click="movePage(users.page+1)">
                    Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({$axios, route, $auth}) {
    const page = route.query.page || 1;
    const { data } = await $axios.get('/users?page='+page);

    // console.log(data);
    const user = await $axios.get('users/2')
    $auth.setUser(user.data.data)

    return { 
      users: data 
    }
  },
  data() {
    return {
      users: {
        data: []
      }
    }
  },
  methods: {
    async movePage(to){
      const { data } = await this.$axios.get('/users?page='+to);

      this.users = data;
    }
  },
}
</script>
