export default function ({ store, redirect, route }) {
    if (['login'].includes(route.name)) return

    // If the user is not authenticated
    if (!store.state.loggedIn) {
      return redirect('/login')
    }
}