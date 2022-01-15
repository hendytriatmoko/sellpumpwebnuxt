<template>
  <div>
      <app-bar />

        <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        </v-app-bar>
        <!-- <v-app-bar app color="#20929D" dark>
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        </v-app-bar> -->
        <br />
        <h2 class="text-center">ARTIKEL</h2>
        <v-divider></v-divider>
        <br>
        <v-row>
          <v-col
            cols="6"
            sm="3"
            v-for="item in artikel"
            :key="item.id_artikel"
          >
            <list-artikel :item="item" />
          </v-col>
        </v-row>
        <br>
        <v-divider></v-divider>
        <br>
        <Footer/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
import { VMoney } from 'v-money'
Vue.use(VueGeolocation)
export default {
    name: 'artikel',
    components: {
    AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListArtikel: () =>
      import(/* webpackChunkName: "list-artikel" */ '@/components/ListArtikel.vue'),
    },
    data: () => ({
        artikel:[],
    }),
    computed: {
        ...mapGetters({
            user: 'auth/user',
            utc: 'timezone/utc',
            timezone: 'timezone/region',
        }),
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setProductId: 'product/setProduct',
            setUnitID: 'product/setUnit',
        }),
        async getArtikel() {
          await this.$axios
            .get('/produk/v1/artikel/getartikel')
            .then((response) => {
                let { data } = response.data
                this.artikel = data
                console.log('artikel', this.artikel)
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
        },
    },
    async created(){
        await this.getArtikel()
    },
}
</script>

<style>

</style>