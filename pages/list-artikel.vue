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
        <br />
  
        <div align="center">
          <v-btn
            color="#20929D"
            dark
            outlined
            @click="getArtikel"
            v-if="artikel.length < total"
          >
            Muat Lebih Banyak
          </v-btn>
        </div>
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
        total: 0,
        lengthPage: 0,
        page: 1,
        limit: 8,
        offset: 0,
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
          let offset = (this.page - 1) * this.limit

          await this.$axios
            .get('/produk/v1/artikel/getartikel',{
              params: {
                limit: 8,
                offset: offset,
              },
            })
            .then((response) => {
                // let { data } = response.data.data
                // this.artikel = response.data.data
                // console.log('artikel', this.artikel)

                let data = response.data.data
                // let { hits } = data
                this.artikel.push(...data)

                this.total = response.data.count
                this.lengthPage = Math.ceil(this.total / this.limit)
                this.page++
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