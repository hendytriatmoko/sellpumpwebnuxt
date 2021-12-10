<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
      crossorigin="anonymous"
    />

    <v-system-bar
      app
      height="30"
      window
      class="d-none d-sm-flex white--text"
      color="#20929D"
      dark
    >
      
      <div >
        <span style="text-align: center" class="ml-6">
          Iklan baris adalah iklan motor yang dijual dengan kondisi siap pakai.
          <a href="/tentang?tab=iklanbaris" class="yellow--text">
            Selengkapnya tentang iklan baris disini.
          </a>
        </span>
      </div>
     
    </v-system-bar>
  <v-system-bar app height="30" window  class="d-none d-sm-flex white--text" style="margin-top:2%;"      
       >
      <v-icon class="ml-6">mdi-cellphone</v-icon>
      <a
        href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
        class="black--text" target="_blank"
      >
        <span> Download SiMotor App </span>
      </a>
      <v-spacer></v-spacer>
      <a href="/tentang?tab=about" class="black--text">
        <span>Tentang SiMotor</span>
      </a>
      <a href="/tentang?tab=bantuan" class="black--text">
        <span class="mx-2">Bantuan SiMotor</span>
      </a>
    </v-system-bar>
    <v-app-bar
      app
      clipped-left
      extension-height="17"
      color="white"
      id="bar"
      v-if="$vuetify.breakpoint.smAndUp || isHome"
      style="margin-top:4%"
    >
      <nuxt-link to="/">
        <v-img src="/img/simotor_logo.webp" width="200" contain></v-img>
      </nuxt-link>

      <v-menu open-on-hover offset-y v-if="$vuetify.breakpoint.smAndUp">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="mx-2" color="#000000" >
            Kategori
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in categories"
            :key="item.id"
            :href="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>

            <v-list-item-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover offset-y v-if="$vuetify.breakpoint.smAndUp">
        <template v-slot:activator="{ on, attrs }" v-if="!guest">
          <v-btn text v-bind="attrs" v-on="on" class="mx-2" color="#000000">
            Jual
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in jual" :key="item.id" :to="item.route">
            <v-list-item-title>{{ item.title }}</v-list-item-title>

            <v-list-item-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <v-menu offset-y :slot="$vuetify.breakpoint.xs ? 'extension' : 'default'">
        <template v-slot:activator="{ on, attrs }">
          <label class="d-flex" style="width: 35%">
            <v-icon size="30">mdi-magnify</v-icon>
            <v-text-field
              v-model="keyword"
              dense
              flat
              solo-inverted
              hide-details
              label="Cari"
              v-bind="attrs"
              v-on="on"
              @keyup="doSearch"
              @keyup.enter="go"
            ></v-text-field>
          </label>
        </template>

        <v-card height="380">
          <search :keyword="keyword" ref="childComponent" />
        </v-card>
      </v-menu>

      <v-btn
        color="#000000"
        text
        rounded
        class="mx-2"
        :x-small="$vuetify.breakpoint.xs ? true : false"
        to="/login"
        v-if="guest"
        @click="$cookies.set('prevUrl', $route.path)"
      >
        Masuk/Daftar
      </v-btn>

      <v-btn
        color="#0288D1"
        dark
        v-if="guest"
        class="mx-2"
        :x-small="$vuetify.breakpoint.xs ? true : false"
        to="/login"
        :slot="$vuetify.breakpoint.xs ? 'extension' : 'default'"
        @click="$cookies.set('prevUrl', $route.path)"
      >
        Jual
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <account v-else />
   
    
    </v-app-bar>
    <v-row style="margin-top:5px">
      <v-col cols="10" sm="10">
        <v-breadcrumbs :items="items" class="mx-5">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
      <!-- <v-col  cols="2" sm="2">
        <p class="pt-3 mr-0">ID Iklan: {{ productid }}</p>
      </v-col> -->
    </v-row>

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer> </v-spacer>
      <v-btn
        text
        height="47"
        href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
        target="_blank"
      >
        <v-icon left> mdi-google-play </v-icon>
        Download
      </v-btn>
      <v-tooltip bottom v-if="!guest">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="doFavorit">
            <v-icon left v-if="favorit == undefined || favorit.length == 0">
              mdi-heart-outline
            </v-icon>

            <v-icon color="red" left v-else>mdi-heart</v-icon>
          </v-btn>
        </template>

        <span>Favorit</span>
      </v-tooltip>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon left>mdi-share-variant-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(network, index) in networks" :key="index">
            <ShareNetwork
              :network="network.network"
              :key="network.network"
              :style="{ backgroundColor: network.color }"
              :url="sharing.url"
              :title="sharing.title"
              :hashtags="sharing.hashtags"
              :twitterUser="sharing.twitterUser"
            >
              <i :class="network.icon"></i>
              <span>{{ network.name }}</span>
            </ShareNetwork>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip
        bottom
        v-if="hits.id_app_user == user.id && hits.id_mst_iklan_status != 2"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :to="'/seller/edit/' + productid">
            <v-icon left>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <span>Edit</span>
      </v-tooltip>
    </v-app-bar>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Iklan</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="judul"
              label="Judul Iklan"
              outlined
              dense
              :rules="formRules"
            ></v-text-field>

            <v-text-field
              v-model="deskripsi"
              label="Deskripsi Iklan"
              outlined
              dense
              :rules="formRules"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#20929D"
            :disabled="!valid"
            class="white--text"
            @click="updateIklan"

          >
            Simpan
          </v-btn >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
window.addEventListener("scroll", () =>{
    if (window.pageYOffset > 100) {
        document.getElementById("hidden").style.display = "";   
        document.getElementById("bar").style.height = "120px";          
    }else{
        document.getElementById("hidden").style.display = "none";
        document.getElementById("bar").style.height = "70px";   
    }
})
export default {
  name: 'app-bar-iklan-baris',
  props: ['items', 'hits'],
  components: {
    Search: () =>
      import(/* webpackChunkName: "search" */ '@/components/MenuSearch.vue'),
    Account: () =>
      import(/* webpackChunkName: "account" */ '@/components/MenuAccount.vue'),
  },
  data: () => ({
    categories: [
      {
        id: 1,
        title: 'Iklan Tawar Bersama',
        route: '/iklantb',
      },
      {
        id: 2,
        title: 'Iklan Baris',
        route: '/kategori-ib',
      },
      {
        id: 4,
        title: 'Aksesoris & Suku Cadang',
        route: '/aksesoris-sparepart',
      },
      { id: 3, title: 'Tiket Tawar Bersama', route: '/ticket' },
        { id: 5, title: 'Cek Harga Pasar', route: '/harga-pasar' },
    ],
    jual: [
      {
        id: 1,
        title: 'Tambah Unit',
        route: '/garage/add-unit',
      },
      {
        id: 2,
        title: 'Tambah Iklan',
        route: '/seller/add',
      },
    ],
    keyword: '',
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
      guest: 'auth/guest',
      user: 'auth/user',
      productid: 'product/productid',
    }),
    isHome() {
      return this.$route.path === '/'
    },
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
    setInterval(() => {
      this.sharing = {
          url:  'https://simotor.id/detail-iklan/' +
        this.hits.judul.toLowerCase().replace(/ /g, '-').replace(/[/]/g, '-') +
        '-' + this.productid,
        title: this.hits.judul,
        description: this.hits.deskripsi,
        quote: this.hits.judul,
        hashtags: 'nuxtjs,simotor',
        twitterUser: 'simotor',
      }
    }, 1000)
  },
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
h1 {
  text-align: center;
  margin: 50px 0 80px;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^='share-network-'] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^='share-network-'] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^='share-network-'] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>    