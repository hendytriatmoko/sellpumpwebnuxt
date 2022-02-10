<template>
  <div>
 

    <v-app-bar
      app
      clipped-left
      color="white"
      v-if="$vuetify.breakpoint.smAndUp || isHome"

    >
      <nuxt-link to="/" class="d-flex ml-5 mr-5">
        <v-img src="/img/gsp1.png" width="50"></v-img>
        <div class="ml-3">
          <div style="width:80px">
            <h3>G R I Y A</h3>
          </div>
          <div style="width:80px">
            <h5>Saller Pump</h5>
          </div>
          <!-- <h3 >Griya</h3>
          <h5>Saller Pump</h5> -->
        </div>
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
            :style="$vuetify.breakpoint.xs ? 'width:90%' : 'width:35%'"
          >
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
          ></v-text-field>
          </label>          
        </template>

        <v-card height="380">
          <search :keyword="keyword" ref="childComponent" />
        </v-card>
      </v-menu>

      <v-btn
        color="#0288D1"
        dark
        v-if="guest"
        class="mx-2"
        :x-small="$vuetify.breakpoint.xs ? true : false"
        to="/login"
        :slot="$vuetify.breakpoint.xs ? 'extension' : 'default'"
      >
        Masuk/Daftar
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <account v-else />
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