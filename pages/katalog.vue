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
        <h2 class="text-center">KATALOG PRODUK</h2>
        <v-divider></v-divider>
        <br>
        <v-row>
            <v-col cols="12" sm="3">
                <h3 >Filter</h3>
                <v-divider class="mb-2"></v-divider>
                    <v-list-item
                        :style="pickSubKategori == 'Semua' ? ';background:#20929D;border:2px solid black' : 'border:1px solid black'"
                        @click="pilihSubKategori('Semua')"
                    > 
                      <b :style="pickSubKategori == 'Semua' ? 'color:white' : ''">Semua</b>
                    </v-list-item>
                <br>
                <v-expansion-panels accordion>
                    <v-expansion-panel
                        v-for="(item,i) in viewKategori"
                        :key="i"
                    >
                        <div>
                        <v-expansion-panel-header><b> {{ item.name }}</b></v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-list
                            >
                                <div
                                    v-for="data in item.children"
                                    :key="data.id"
                                    style="cursor:pointer"
                                    @click="pilihSubKategori(data.name)"
                                >
                                    <v-list-item
                                      :style="data.name == pickSubKategori ? ';background:#20929D;' : ''"
                                    >
                                        <span 
                                          :class="data.name == pickSubKategori ? 'white--text' : ''"
                                        >
                                            {{ data.name }}
                                        </span>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-expansion-panel-content>
                        </div>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col cols="12" sm="9">
                <h3 >Produk</h3>
                <v-divider class="mb-2"></v-divider>
                <v-row v-if="listIklan.length > 0">
                    <v-col
                        cols="6"
                        sm="3"
                        v-for="item in listIklan"
                        :key="item.id_produk"
                    >
                        <list-iklan :item="item" />
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col
                        cols="12"
                        sm="12"
                    >
                        <h3 class="text-center mt-5">Belum Ada Produk</h3>
                    </v-col>
                </v-row>
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
    name: 'katalog',
    components: {
    AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ '@/components/ListIklan.vue'),
    },
    data: () => ({
        list: [
            {
                id: 1,
                foto: null,
                previewUrl: '/img/icons/thumbnail/Photo.png',
                label: 'Foto 1',
                required: '*',
            },
        ],
        countRules: [],
        hasImage: false,
        judulArtikel: '',
        deskripsiArtikel:'',
        idArtikel:'',
        listKategori:[],
        viewKategori: [],
        pickSubKategori:'Semua',
        listIklan:[],
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
        async con(data){
            console.log('data', data)
        },
        async getKategori(){
          await this.$axios
            .get('/kategori/v1/getkategori')
            .then((response) => {
            this.listKategori = response.data.data
            console.log('kategori', this.listKategori)
            this.aturKategori()
            })
            .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
            })
        },
        async aturKategori(){
            this.viewKategori = []
            let distincKategori = Array.from(new Set(this.listKategori.map(s => s.kategori)))
                .map(kategori => {
                    return {
                        name: kategori,
                        children: [],
                    }
                })
            for (let i = 0; i < distincKategori.length; i++) {
                for (let j = 0; j < this.listKategori.length; j++) {
                    if (this.listKategori[j].kategori == distincKategori[i].name) {
                        let ind = j
                        distincKategori[i].children.push({
                            id: j,
                            name:this.listKategori[ind].sub_kategori
                        })
                    }
                }
            }
            this.viewKategori = distincKategori
            console.log('view kategori', this.viewKategori)

        },
        async pilihSubKategori(data){
            this.pickSubKategori = data
            this.getIklan()
        },
        async getIklan(){
          var params = new URLSearchParams();

          if (this.pickSubKategori != 'Semua') {
              params.append("sub_kategori", this.pickSubKategori);
          }

          var request = {
            params: params,
          };
          await this.$axios
            .get('/produk/v1/produk/getproduk', request)
            .then((response) => {
                this.listIklan = response.data.data
                console.log('produk', this.listIklan)
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
        }
    },
    async created(){
        await this.getKategori()
        await this.getIklan()
    }
}
</script>

<style>

</style>