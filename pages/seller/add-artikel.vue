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
        <div class="mt-2">
            <v-card
                rounded="lg"
                style="max-width: 950px; margin: 0 auto !important"
            >
                <v-card-title style="margin-top: -10px">
                    Detail Artikel Anda
                </v-card-title>
                <v-card-subtitle> Isi detail Artikel Anda </v-card-subtitle>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title>
                                <b> Pilih Foto Produk Anda </b>
                            </v-list-item-title>
                        </v-list-item>
                        <center>
                            <div
                            v-for="item in list"
                            :key="item.id"
                            class="required ml-3"
                            >
                            <image-uploader
                                v-model="item.foto"
                                :quality="0.7"
                                :scaleRatio="0.5"
                                accept="image/*"
                                :preview="false"
                                :className="[
                                'fileinput',
                                { 'fileinput--loaded': hasImage },
                                ]"
                                :autoRotate="true"
                                outputFormat="blob"
                                @input="setImage('foto' + item.id)"
                                :id="'foto' + item.id"
                            >
                            
                                <label :for="'foto' + item.id" slot="upload-label">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-img
                                        :src="item.previewUrl.includes('/artikel/')
                                            ? getImageProduk(item.previewUrl)
                                            : item.previewUrl"
                                        contain
                                        :width="$vuetify.breakpoint.xsOnly ? 130 :150"
                                        :height="$vuetify.breakpoint.xsOnly ? 130 : 150"
                                        v-on="on"
                                        style="position:relative"
                                    >
                                    </v-img>
                                    </template>
                                    <span>Pilih Foto</span>
                                </v-tooltip>
                                </label>
                            </image-uploader>
                            </div>
                        </center>
                        <v-list-item>
                            <v-list-item-title>
                                <div class="pb-2"><b> Informasi Produk </b></div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-row class="mx-1">
                            <v-col cols="12" sm="12" >
                                <v-text-field
                                    label="Judul Artikel"
                                    dense
                                    outlined
                                    v-model="judulArtikel"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" >
                                <v-textarea
                                    label="Deskripsi Artikel"
                                    dense
                                    outlined
                                    v-model="deskripsiArtikel"
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-card-actions style="margin-right: 2%">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="#20929D"
                                class="white--text"
                                @click="postingArtikel()"
                                v-if="idArtikel == ''"
                            >
                                Posting
                            </v-btn>
                            <v-btn
                                color="#20929D"
                                class="white--text"
                                @click="updateArtikel()"
                                v-else
                            >
                                Update
                            </v-btn>
                        </v-card-actions>
                        <br />
                    </v-list>                    
                </v-card>
            </v-card>
        </div>
    <Footer />
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
    name: 'add_artikel',
    components: {
    AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
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
        setImage(file) {
            this.hasImage = true
            this.image = file
            this.onFileChange(file)
        },
        onFileChange(foto) {
            const reader = new FileReader()
            if (foto == 'foto1') {
                reader.onload = (e) => {
                this.list[0].previewUrl = e.target.result
                }
                reader.readAsDataURL(this.list[0].foto)
                this.countRules.push(this.list[0].foto)
            }
        },
        postingArtikel(){
            let formData = new FormData()
  
            formData.append('gambar_artikel', this.list[0].foto)
            formData.append('judul_artikel', this.judulArtikel)
            formData.append('deskripsi_artikel', this.deskripsiArtikel)
    
             this.$axios
                .post('/produk/v1/artikel/create', formData, {
                    headers: { Authorization: this.DataToken }
                })
                .then((response) => {
                    console.log(response)
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'Artikel berhasil di posting',
                    })
                    this.$router.push('/')
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
        async getArtikel(){
         await this.$axios
            .get('/produk/v1/artikel/getartikel', {
            params: {
                id_artikel: this.$route.query.id,
            },
            })
            .then((response) => {
                let data  = response.data.data[0]
                this.judulArtikel = data.judul_artikel
                this.deskripsiArtikel = data.deskripsi_artikel
                this.list[0].previewUrl = data.gambar_artikel
                console.log('artikel', data)
            })
            .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
            })
        },
        async updateArtikel(){
            let formData = new FormData()
            if (this.list[0].foto != null) {
                formData.append('gambar_artikel', this.list[0].foto)
            }
            console.log('list', this.list)
            formData.append('judul_artikel', this.judulArtikel)
            formData.append('id_artikel', this.idArtikel)
            formData.append('deskripsi_artikel', this.deskripsiArtikel)
    
             this.$axios
                .put('/produk/v1/artikel/update', formData, {
                    headers: { Authorization: this.DataToken }
                })
                .then((response) => {
                    console.log(response)
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'Artikel berhasil di update',
                    })
                    this.$router.push(
                        '/artikel/'+this.idArtikel
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
    },
    async created() {
        this.DataToken = this.$cookies.get("token");
        console.log('route', this.$route.query.id)
        if (this.$route.query.id != undefined) {
            this.idArtikel = this.$route.query.id
            await this.getArtikel()
        }
    }
}
</script>

<style>
#foto1 {
  display: none;
}
</style>