<template>
  <div>
    <app-bar />

        <!-- <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        </v-app-bar> -->
        <!-- <v-app-bar app color="#20929D" dark>
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        </v-app-bar> -->
        <br />

    <h2 class="text-center">Produk Iklan</h2>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-divider></v-divider>
      <iklan-baris
        :id="productid"
        :items="items"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'iklan',
  // props: ['items', 'hits'],
  components: {
    AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    IklanBaris: () =>
      import(
        /* webpackChunkName: "iklan-baris" */ '@/components/IklanBaris.vue'
      ),
  },
  data: () => ({
    hits: [],
    hitstemp: [],
    productid: '',
    title: '',
    items: [
      {
        text: 'Beranda',
        disabled: false,
        to: '/',
      },
      {
        text: 'Motor Bekas',
        disabled: false,
        href: "/search?q=''&category=0&order=posting_terbaru&tb=false",
      },
    ],
    tab: 0,
    favorit: [],
    sharing: {},
    networks: [
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'fab fah fa-lg fa-whatsapp',
        color: '#25d366',
      },
    ],
    dialog: false,
    judul: '',
    deskripsi: '',
    valid: true,
    formRules: [(v) => !!v || 'Field is required'],
  }),
  computed: {
    ...mapGetters({
      // productid: 'product/productid',
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    doSearch() {
      this.$refs.childComponent.doSearch()
    },
    go() {
      this.$refs.childComponent.hasilPencarian()
    },
    async getDtlIklanTemp() {
      await this.$axios
        .get('/search/v4/search', {
          params: {
            // id: this.productid,
            search: this.$route.params.id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hitstemp = hits[0]._source
          console.log('ini iklannya temp', this.hitstemp)
          this.productid = this.hitstemp.id
          this.getDtlIklan()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getFavorit() {
      await this.$axios
        .get('/iklan/v3/iklan_favorit', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.productid,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.favorit = hits[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doFavorit() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/iklan/v3/iklan_favorit', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getFavorit()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
    edit() {
      this.dialog = true
      this.judul = this.hits.judul
      this.deskripsi = this.hits.deskripsi
    },
    async updateIklan() {
      let formData = new FormData()

      formData.set('judul', this.judul.trim())
      formData.set('deskripsi', this.deskripsi.trim())
      formData.set('id', this.productid)

      if (this.hits.id_mst_iklan_jenis == 1) {
        await this.$axios
          .put('/iklan/v3/iklan_hp_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })

            if (error.response.status == 403) {
              this.setAuth({})
              this.$cookies.set('user', null)
              this.$cookies.set('prevUrl', this.$route.path)
              this.setAlert({
                status: true,
                color: 'error',
                text: responses.api_message,
              })
              this.$router.push('/login')
            }
          })
      } else {
        await this.$axios
          .put('/iklan/v3/iklan_tb_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })

            if (error.response.status == 403) {
              this.setAuth({})
              this.$cookies.set('user', null)
              this.$cookies.set('prevUrl', this.$route.path)
              this.setAlert({
                status: true,
                color: 'error',
                text: responses.api_message,
              })
              this.$router.push('/login')
            }
          })
      }
    },
  },
  async created() {
    // await this.getDtlIklanTemp()
    // this.rute = this.$route.params.id.replace(/-/g, ' ')
    // this.rute = this.rute.split(' ')
    // this.productid = this.rute[this.rute.length - 1]
    // console.log('split woy', this.rute)
    // console.log('dapet idnya', this.productid)
    this.rute = this.$route.params.id
    var id = this.rute.length - 36
    this.productid = this.rute.substring(id)
    console.log('ini rute', this.rute)
    console.log('productid', this.productid)
    console.log('router', this.$route)
    // await this.getDtlIklan()
  },
}
</script>

<style>
/* a:link,
a:visited {
  color: white;
  text-decoration: none;
} */
</style>