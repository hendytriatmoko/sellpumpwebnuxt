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

    <!-- dua satu iklan baris iklankan secara cepat -->
    <div >
      <div>
        <div id="duasatu" class="mt-2">
          <v-card
            rounded="lg"
            style="max-width: 950px; margin: 0 auto !important"
          >
            <v-card-title style="margin-top: -10px"
              >Detail Iklan Anda</v-card-title
            >
            <v-card-subtitle> Isi detail iklan Anda </v-card-subtitle>
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
                              :src="item.previewUrl.includes('/produk/')
                                ? getImageMerk(item.previewUrl)
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
                    <v-col cols="6" >
                        <v-text-field
                            label="Nama Produk"
                            dense
                            outlined
                            v-model="produk[0].nama_produk"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-text-field
                            label="Kode Produk"
                            dense
                            outlined
                            v-model="produk[0].kode_produk"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mx-1" style="margin-top: -3%">
                    <v-col cols="6" >
                        <v-text-field
                            label="Tipe Produk"
                            dense
                            outlined
                            v-model="produk[0].tipe_produk"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-text-field
                            label="Berat Produk"
                            dense
                            outlined
                            suffix="g"
                            v-model="produk[0].berat_produk"
                        >
                        </v-text-field>
                    </v-col>
                    <!-- <v-col cols="3" >
                        <v-text-field
                            label="Stok Produk"
                            dense
                            outlined
                            v-model="produk[0].stok_produk"
                        >
                        </v-text-field>
                    </v-col> -->
                </v-row>
                <v-col cols="12" style="margin-top: -3%">
                  <v-textarea
                    name="input-7-4"
                    label="Deskripsi Produk"
                    dense
                    outlined
                    v-model="produk[0].deskripsi_produk"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" style="margin-top: -3%">
                  <div class="pb-2"><b> Informasi Harga </b></div>
                  <v-text-field
                    outlined
                    dense
                    label="Harga Produk"
                    v-model="produk[0].harga_produk"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-list style="margin-top: -6%">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          ><b> Gunakan Diskon ?</b></v-list-item-title
                        >
                        <v-list-item-subtitle>
                          Isikan harga setelah diskon
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-switch
                          v-model="useDiskon"
                          input-value="true"
                          color="#20929D"
                        ></v-switch>
                      </v-list-item-action>
                    </v-list-item>

                    <v-list-item v-if="useDiskon">
                      <v-text-field
                        v-model="produk[0].harga_diskon"
                        label="Harga setelah diskon"
                        outlined
                        dense
                      ></v-text-field>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-row class="mx-1 mt-2">
                    <v-col cols="4" style="margin-top: -3%">
                      <div class="pb-2"><b> Informasi Kategori </b></div>
                      <v-autocomplete
                          v-model="produk[0].id_kategori_produk"
                          :items="infoKategori"
                          outlined
                          item-text="desc"
                          item-value="id"
                          dense
                          readonly
                          @click="editKategori = true"
                          label="Kategori"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="4" style="margin-top: -3%">
                      <div class="pb-2"><b> Informasi Merk </b></div>
                      <v-autocomplete
                          v-model="produk[0].id_merk_produk"
                          :items="listMerk"
                          outlined
                          item-text="nama_merk"
                          item-value="id_merk"
                          dense
                          label="Merk"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="4" style="margin-top: -3%">
                      <div class="pb-2"><b> Informasi Brosur </b></div>
                      <v-autocomplete
                          v-model="produk[0].id_file"
                          :items="files"
                          outlined
                          item-text="nama_file"
                          item-value="id_file"
                          dense
                          label="Brosur"
                      ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row class="mx-1">
                    <v-col cols="6" style="margin-top: -3%">
                    <div class="pb-2"><b> Link Tokopedia </b></div>
                      <v-text-field
                        outlined
                        dense
                        label="Link Tokopedia"
                        v-model="produk[0].link_tokopedia"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" style="margin-top: -3%">
                    <div class="pb-2"><b> Link Bukalapak </b></div>
                      <v-text-field
                        outlined
                        dense
                        label="Link Bukalapak"
                        v-model="produk[0].link_bukalapak"
                      ></v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions style="margin-right: 2%">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#20929D"
                    class="white--text"
                    @click="storeIklan()"
                    v-if="$route.query.id == undefined"
                  >
                    Iklankan
                  </v-btn>
                  <v-btn
                    v-else
                    color="#20929D"
                    class="white--text"
                    @click="storeIklan()"
                  >
                    Update
                  </v-btn>
                </v-card-actions>
                <br />
              </v-list>
            </v-card>
          </v-card>
        </div>
      </div>
    </div>
    <br>
    <Footer />
    <v-dialog max-width="500px" v-model="editKategori">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Edit Kategori</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editKategori = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-autocomplete
            v-model="produk[0].kategori"
            :items="listKategori"
            outlined
            item-text="kategori"
            item-value="kategori"
            @change="editDataKategori()"
            dense
            class="mx-6"
            label="Nama Kategori"
        ></v-autocomplete>
        <v-autocomplete
            v-model="produk[0].sub_kategori"
            :items="listSubkategori"
            outlined
            v-if="produk[0].kategori != ''"
            item-text="sub_kategori"
            item-value="sub_kategori"
            dense
            class="mx-6"
            label="Nama Sub Kategori"
        ></v-autocomplete>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            small color="primary" dark
            @click="editDataSubKategori()"
          >
            <v-icon>mdi-save</v-icon>
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  name: 'add',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  directives: { money: VMoney, mask },
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
    listKategori:[],
    listMerk:[],
    useDiskon:false,
    // produk
    produk:[
      {
        berat_produk: 0,
        deskripsi_produk: "",
        gambar_merk: "",
        gambar_produk: "",
        harga_produk: 0,
        id_kategori_produk: "",
        id_merk_produk: "",
        id_produk: "",
        kategori: "",
        kode_produk: "",
        nama_merk: "",
        nama_produk: "",
        stok_produk: "99",
        sub_kategori: "",
        tayangan: "",
        link_tokopedia:"",
        link_bukalapak:"",
        harga_diskon:0,
        diskon:0,
        id_file:'',
        tipe_produk: "",
        updated_at: "",
      }
    ],
    kategori:'',
    infoKategori:[],
    listSubkategori : [],
    editKategori: false,
    files:[],
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
    async getFile(){
      var params = new URLSearchParams();

      var request = {
        params: params,
      };
      await this.$axios
        .get('/produk/v1/file/getfile', request)
        .then((response) => {
            this.files = response.data.data
            console.log('file', this.files)
        })
        .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
        })
    },
    async editDataKategori(){
        this.listSubkategori = []
        for (let i = 0; i < this.listKategori.length; i++) {
            if (this.listKategori[i].kategori == this.produk[0].kategori) {
                this.listSubkategori.push({
                    id:this.listKategori[i].id_kategori,
                    sub_kategori:this.listKategori[i].sub_kategori
                })
            }
        }
        console.log('listsub', this.listSubkategori)
    },
    async editDataSubKategori(){
        for (let i = 0; i < this.listSubkategori.length; i++) {
            if (this.listSubkategori[i].sub_kategori == this.produk[0].sub_kategori) {
                this.produk[0].id_kategori_produk = this.listSubkategori[i].id
            }
        }
        this.editKategori = false
        console.log('data produk pra', this.produk[0])

    },
    async aturKategori(){
      this.infoKategori = []
      for (let i = 0; i < this.listKategori.length; i++) {
        this.infoKategori.push({
          id:this.listKategori[i].id_kategori,
          desc:this.listKategori[i].kategori+'/'+this.listKategori[i].sub_kategori
        })
      }
    },
    async getMerk(){
      await this.$axios
        .get('/merk/v1/getmerk')
        .then((response) => {
          this.listMerk = response.data.data
          console.log('merk', this.listMerk)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
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
    async storeIklan(){
      this.produk[0].diskon = (this.produk[0].harga_diskon*100)/this.produk[0].harga_produk
      this.produk[0].diskon = 100 - Math.round(this.produk[0].diskon)
      let formData = new FormData()

      formData.append('nama_produk', this.produk[0].nama_produk)
      formData.append('harga_produk', parseInt(this.produk[0].harga_produk))
      formData.append('kode_produk', this.produk[0].kode_produk)
      formData.append('tipe_produk', this.produk[0].tipe_produk)
      formData.append('berat_produk', parseInt(this.produk[0].berat_produk))
      formData.append('id_merk_produk', parseInt(this.produk[0].id_merk_produk))
      formData.append('id_file', this.produk[0].id_file)
      formData.append('deskripsi_produk', this.produk[0].deskripsi_produk)
      formData.append('stok_produk', parseInt(this.produk[0].stok_produk))
      formData.append('id_kategori_produk', parseInt(this.produk[0].id_kategori_produk))
      formData.append('link_tokopedia', this.produk[0].link_tokopedia)
      formData.append('link_bukalapak', this.produk[0].link_bukalapak)
      console.log('id_file', this.produk[0].id_file)
      if (this.useDiskon == true) {
        formData.append('harga_diskon', this.produk[0].harga_diskon)
        formData.append('diskon', this.produk[0].diskon)
        formData.append('bool_diskon', "Y")
      }else{
        formData.append('harga_diskon', 0)
        formData.append('diskon', 0)
        formData.append('bool_diskon', "N")
      }

      if (this.list[0].foto != null) {
        formData.append('gambar_produk', this.list[0].foto)
      }

      if (this.$route.query.id == undefined) {
        await this.$axios
        .post('/produk/v1/produk/create', formData, {
          headers: { Authorization: this.DataToken }
        })
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Produk berhasil diIklankan',
            })
            this.xProduk()
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
      }else if (this.$route.query.id != undefined) {

      formData.append('id_produk', this.produk[0].id_produk)

        await this.$axios
        .put('/produk/v1/produk/update', formData, {
          headers: { Authorization: this.DataToken }
        })
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Produk berhasil diUpdate',
            })
            this.$router.push(
              '/detail-iklan/' + this.produk[0].nama_produk.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+this.produk[0].id_produk
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
      }
      
    },
    async xProduk(){
      this.produk = [
        {
          berat_produk: 0,
          deskripsi_produk: "",
          gambar_merk: "",
          gambar_produk: "",
          harga_produk: 0,
          id_kategori_produk: "6",
          id_merk_produk: "8",
          id_produk: "",
          kategori: "",
          kode_produk: "",
          nama_merk: "",
          nama_produk: "",
          stok_produk: "",
          sub_kategori: "",
          tayangan: "",
          tipe_produk: "",
          updated_at: "",
        }
      ]
    },
    async getDtlIklan(id) {
      await this.$axios
        await this.$axios
        .get('/produk/v1/produk/getproduk',{
          params: {
              id_produk: id,
            },
        })
        .then((response) => {
          this.produk = []
          let hits = response.data.data[0]
          this.produk = [hits]
          if (this.produk[0].bool_diskon == "Y") {
            this.useDiskon = true
          }
          this.list[0].previewUrl = this.produk[0].gambar_produk
          console.log('produk', this.produk)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    
  },
  async created() {
    console.log('data produk pra', this.produk[0])
    await this.getKategori()
    await this.getMerk()
    await this.getFile()
    console.log('rote', this.$route.query.id)
    this.DataToken = this.$cookies.get("token");
    if (this.$route.query.id != undefined) {
      await this.getDtlIklan(this.$route.query.id)
    }
    if (this.produk[0].kategori != '') {
      this.listSubkategori = []
        for (let i = 0; i < this.listKategori.length; i++) {
            if (this.listKategori[i].kategori == this.produk[0].kategori) {
                this.listSubkategori.push({
                    id:this.listKategori[i].id_kategori,
                    sub_kategori:this.listKategori[i].sub_kategori
                })
            }
        }
    }
  },
}
</script>

<style>
.pilih {
  background: rgba(32, 146, 157, 0.1);
}
#foto1 {
  display: none;
}
#foto2 {
  display: none;
}
#foto3 {
  display: none;
}
#foto4 {
  display: none;
}
#foto5 {
  display: none;
}
.lingluar {
  width: 20px;
  height: 20px;
  background: #20929d;
  border-radius: 50%;
  border: 2px solid white;
}
.lingdalam {
  width: 10px;
  height: 10px;
  margin-left: 2.6px;
  margin-top: 2.6px;
  background: white ;
  border: 1px solid white;
  border-radius: 50%;
}
.sdank {
  color: #20929d;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.scrolling-wrapper-flexbox {
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>