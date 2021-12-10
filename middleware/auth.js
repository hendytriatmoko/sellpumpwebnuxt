export default function ({ app, route, redirect }) {
  if (route.path == '/login' || route.path == '/register') {
    if (app.$cookies.get('user') != null) {
      return redirect('/')
    }
  }

  if (route.path == '/ticket' || route.path == '/refund' || route.path == '/detail-transaksi/ticket/:id' || route.path == '/add-unit' || route.path == '/add-ads' || route.path == '/account/profile/umum' || route.path == '/detail-transaksi/unit/:id' || route.path == '/account/profile/penjual' || route.path == '/account/profile/transaksitb' || route.path == '/account/profile/rekening' || route.path == '/account/profile/aktivitas' || route.path == '/account/profile/iklan-garasi' || route.path == '/account/profile/favorit' || route.path == '/account/profile/ulassan' || route.path == '/messages') {
    if (app.$cookies.get('user') == null) {
      app.$cookies.set('prevUrl', route.path)
      return redirect('/login')
    }
  }
}
