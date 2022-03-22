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
        <v-container>
            <h2 class="text-center">ARTIKEL</h2>
            <v-divider></v-divider>
            <br>
            <v-row
                v-if="artikel.length > 0"
            >
                <v-col cols="12" sm="4">
                        <div>Diposting : 
                            {{
                                moment
                                    .utc(artikel[0].created_at)
                                    .add(utc, 'h')
                                    .format('DD MMM YYYY, HH:mm')
                            }}
                        </div>
                    <center>
                        <v-img :src="getImageProduk(artikel[0].gambar_artikel)"></v-img>
                    </center>
                </v-col>
                <v-col cols="12" sm="8">
                    <h3 class="text-center">{{ artikel[0].judul_artikel }}</h3>
                    <div style="white-space: pre-wrap" v-html="artikel[0].deskripsi_artikel"></div>
                </v-col>
            </v-row>
            <br>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="dark" class="red--text" @click="hapus()"> <v-icon>mdi-delete</v-icon> Hapus</v-btn>
                <v-btn color="#20929D" class="white--text" @click="edit()"> <v-icon>mdi-pencil</v-icon> Edit</v-btn>
            </v-card-actions>
        </v-container>
        <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
Vue.use(VueGeolocation)
export default {
    name: 'artikel',
    components: {
    AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
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
        async getArtikel(){
         await this.$axios
            .get('/produk/v1/artikel/getartikel', {
            params: {
                id_artikel: this.$route.params.id,
            },
            })
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
        async hapus(){
            let formData = new FormData()
  
            formData.append('id_artikel', this.artikel[0].id_artikel)
    
            await this.$axios
                .put('/produk/v1/artikel/delete', formData, {
                    headers: { Authorization: this.DataToken }
                })
                .then((response) => {
                    console.log(response)
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'Artikel berhasil di hapus',
                    })
                    this.$router.push(
                        '/'
                    )
                })
                .catch((error) => {
                    let responses = error.response.data
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: responses.api_message,
                    })
                })
        },
        async edit(){
            this.$router.push(
                '/seller/add-artikel?id='+this.$route.params.id
            )
        }
    },
    async created(){
        this.DataToken = this.$cookies.get("token");
        await this.getArtikel()
        console.log('route', this.$route.params.id)
    }
}
</script>

<style>

</style>