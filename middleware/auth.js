export default function ({ app, route, redirect }) {
  if (route.path == '/login' || route.path == '/register') {
    if (app.$cookies.get('user') != null) {
      return redirect('/')
    }
  }
}
