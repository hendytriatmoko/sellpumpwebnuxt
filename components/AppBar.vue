<template>
  <div>
 

    <v-app-bar
      app
      clipped-left
      color="white"

    >
      <nuxt-link to="/" class="d-flex ml-5 mr-5">
        <v-img :style="$vuetify.breakpoint.xs ? 'margin-left:-20px' : ''" src="/img/logogsp.png" width="120"></v-img>
        <v-btn
          color="#0288D1"
          dark
          style="margin-left:40%;margin-top:7%"
          v-if="guest && $vuetify.breakpoint.smAndDown"
          :x-small="$vuetify.breakpoint.xs ? true : false"
          to="/login"
        >
          Masuk/Daftar
        </v-btn>
        
      </nuxt-link>

      <v-menu open-on-hover offset-y v-if="$vuetify.breakpoint.smAndUp">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="mx-2" color="#000000">
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

      <div v-if="user.status != 'pembeli'">
        <v-menu open-on-hover offset-y v-if="$vuetify.breakpoint.smAndUp">
          <template v-slot:activator="{ on, attrs }" v-if="!guest">
            <v-btn text v-bind="attrs" v-on="on" class="mx-2" color="#000000">
              Jual
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-list >
            <v-list-item v-for="item in jual" :key="item.id" :to="item.route">
              <v-list-item-title>{{ item.title }}</v-list-item-title>

              <v-list-item-action>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <v-menu offset-y :slot="$vuetify.breakpoint.xs ? 'extension' : 'default'">
        <template v-slot:activator="{ on, attrs }">
          <label class="d-flex"
            :style="$vuetify.breakpoint.xs ? 'width:70%' : 'width:35%'"
          >
          <v-icon v-if="$vuetify.breakpoint.smAndUp" size="30">mdi-magnify</v-icon>
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
          ></v-text-field>
          </label>          
        </template>

        <v-card height="380">
          <search :keyword="keyword" ref="childComponent" />
        </v-card>
      </v-menu>

      <v-menu 
        open-on-hover offset-y 
        v-if="$vuetify.breakpoint.smAndDown" 
        :slot="$vuetify.breakpoint.xs ? 'extension' : 'default'"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="mx-2" color="#000000">
            kategori
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
      <div v-if="user.status != 'pembeli'">
        <v-menu open-on-hover offset-y v-if="$vuetify.breakpoint.smAndDown">
          <template v-slot:activator="{ on, attrs }" v-if="!guest">
            <v-btn  text v-bind="attrs" v-on="on" color="#000000">
              Jual
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-list >
            <v-list-item v-for="item in jual" :key="item.id" :to="item.route">
              <v-list-item-title>{{ item.title }}</v-list-item-title>

              <v-list-item-action>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      

      <v-btn
        color="#0288D1"
        dark
        v-if="guest && $vuetify.breakpoint.smAndUp"
        class="mx-2"
        :x-small="$vuetify.breakpoint.xs ? true : false"
        to="/login"
        :slot="$vuetify.breakpoint.xs ? 'extension' : 'default'"
      >
        Masuk/Daftar
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <account style="margin-right:10px" v-if="!guest" />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app-bar',
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
        title: 'Katalog Produk',
        route: '/katalog',
      },
      {
        id: 2,
        title: 'List Artikel',
        route: '/list-artikel',
      },
    ],
    jual: [
      {
        id: 1,
        title: 'Tambah Iklan',
        route: '/seller/add-iklan',
      },
      {
        id: 2,
        title: 'Tambah Artikel',
        route: '/seller/add-artikel',
      },
      {
        id: 3,
        title: 'Tambah Merk & Kategori',
        route: '/seller/add-merk-kategori',
      },
      {
        id: 4,
        title: 'Tambah Iklan Khusus',
        route: '/seller/add-iklan-khusus',
      },
      {
        id: 5,
        title: 'Tambah File',
        route: '/files',
      },
    ],
    keyword: '',
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
    isHome() {
      return this.$route.path === '/'
    },
  },
  methods: {
    doSearch() {
      this.$refs.childComponent.doSearch()
    },
  },
  async created(){
    console.log('juallllllllllllllll', this.user)
  }
}
</script>