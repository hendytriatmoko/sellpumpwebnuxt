<template>
  <div>
    
    <v-system-bar app height="30" window  class="d-none d-sm-flex white--text"
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
      color="white"
      v-if="$vuetify.breakpoint.smAndUp || isHome"

    >
      <nuxt-link to="/">
        <v-img src="/img/simotor_logo.webp" width="200" contain></v-img>
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
    go() {
      this.$refs.childComponent.hasilPencarian()
    },
  },
}
</script>