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
                    <div class="pt-2"><b> Pilih Produk </b></div>
                  </v-list-item-title>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="buttonAddProduk()">Tambah Produk</v-btn>
                  </v-card-actions>
                </v-list-item>
                <br>
                <div>
                    <v-card v-if="produkTerpilih.length > 0" class="mx-3 py-4">
                        <v-card
                        rounded="lg"
                        v-for="(item,index) in produkTerpilih"
                        :key="index"
                        elevation="6"
                        class="mb-2 mx-6"
                        >
                            <div class="d-flex mx-3">
                            <div>
                                <v-img :src="getImageProduk(item.data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                            </div>
                            <div class="ml-3 my-2" style="width:58%">
                                <h3>{{item.data.nama_produk}} - {{item.data.tipe_produk}}</h3>
                                <h5 v-if="item.data.deskripsi_produk.length < 80">{{item.data.deskripsi_produk}}</h5>
                                <h5 v-else>{{item.data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                <h3>
                                Rp
                                {{ Number(item.data.harga_produk).toLocaleString('id-ID') }}
                                </h3>
                            </div>
                            <div>
                                <div class="d-flex mt-2 mx-3">
                                <v-btn class="mt-8" x-small @click="changeKuantitas(item.data.id_produk,'minus')">
                                    <v-icon color="red" >mdi-minus</v-icon>
                                </v-btn>
                                <v-text-field
                                    class="mt-5 mx-2"
                                    style="width:50px"
                                    v-model="item.unit"
                                    solo
                                    number
                                    dense
                                ></v-text-field>
                                <v-btn class="mt-8" x-small @click="changeKuantitas(item.data.id_produk,'plus')">
                                    <v-icon color="green" >mdi-plus</v-icon>
                                </v-btn>
                                </div>
                            </div>
                            <div class="mt-6 ml-6">
                                <v-icon class="pt-2" @click="hapusProdukTerpilih(index)" large color="red" >mdi-delete</v-icon>
                            </div>
                            </div>
                        </v-card>
                    </v-card>
                    <v-card v-else class="text-center mx-3 py-3">
                        <div>Belum ada produk dipilih</div>
                    </v-card>
                </div>
                <br>
                <v-list-item>
                  <v-list-item-title>
                    <div class="pt-2"><b> Pilih User </b></div>
                  </v-list-item-title>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="buttonAddUser()">Pilih</v-btn>
                  </v-card-actions>
                </v-list-item>
                <br>
                <div>
                    <v-card class="mx-3" v-if="userTerpilih != null">
                        <v-list>
                            <v-list-item
                                class="list-user"
                            >
                                <v-list-item-avatar>
                                    <v-img v-if="userTerpilih.foto != ''" :src="getImageProduk(userTerpilih.foto)"></v-img>
                                    <v-img v-else src="/img/profile.png"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{ userTerpilih.nama }} - {{userTerpilih.email}}</v-list-item-title>

                                    <v-list-item-subtitle
                                        class="red--text"
                                    >
                                        {{ userTerpilih.no_telp }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <v-card v-else class="text-center mx-3 py-3">
                        <div>Belum ada user dipilih</div>
                    </v-card>
                </div>
                <br>
                <v-list-item>
                  <v-list-item-title>
                    <div class="pb-2"><b> Informasi Produk </b></div>
                  </v-list-item-title>
                </v-list-item>
                <v-col cols="12" style="margin-top: -3%">
                  <v-text-field
                        label="Nama Produk"
                        dense
                        outlined
                        v-model="produk.namaProduk"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" style="margin-top: -3%">
                  <v-textarea
                    name="input-7-4"
                    label="Deskripsi Produk"
                    dense
                    v-model="produk.deskripsiProduk"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-row class="mx-1">
                    <v-col cols="6" style="margin-top: -3%">
                    <div class="pb-2"><b> Harga Asli </b></div>
                      <v-text-field
                        outlined
                        readonly
                        dense
                        label="Harga Asli"
                        v-model="produk.hargaAsli"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" style="margin-top: -3%">
                    <div class="pb-2"><b> Harga Khusus </b></div>
                      <v-text-field
                        outlined
                        dense
                        label="Harga Khusus"
                        v-model="produk.hargaKhusus"
                      ></v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions style="margin-right: 2%">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#20929D"
                    class="white--text"
                    @click="postIklan()"
                  >
                    Iklankan
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
    <v-dialog v-model="dialogListProduk" max-width="600px">
        <v-card height="400px">
            <v-toolbar flat dense color="#20929D">
                <v-toolbar-title><b>Pilih Produk</b></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogListProduk = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <br>
            <v-text-field
                v-model="keyword"
                class="mx-6"
                dense
                label="Search by nama/tipe/merk"
                prepend-inner-icon="mdi-magnify"
                @keyup.enter="getProduk()"
                outlined
            ></v-text-field>
            <v-card class="mx-6" height="250px" style="overflow-y:scroll">
                <v-list>
                    <v-list-item
                        class="list-produk"
                        v-for="(item,index) in dataProduk" :key="index"
                        style="cursor:pointer"
                        @click="pilihProduk(item)"
                    >
                        <v-list-item-avatar>
                            <v-img :src="getImageProduk(item.gambar_produk)"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.nama_produk }} - {{item.tipe_produk}}</v-list-item-title>

                            <v-list-item-subtitle
                                class="red--text"
                            >
                                Rp
                                {{ Number(item.harga_produk).toLocaleString('id-ID') }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogListUser" max-width="600px">
        <v-card height="400px">
            <v-toolbar flat dense color="#20929D">
                <v-toolbar-title><b>Pilih User</b></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogListUser = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <br>
            <v-text-field
                v-model="keywordUser"
                class="mx-6"
                dense
                label="Search by nama/email"
                prepend-inner-icon="mdi-magnify"
                @keyup.enter="getUser()"
                outlined
            ></v-text-field>
            <v-card class="mx-6" height="250px" style="overflow-y:scroll">
                <v-list>
                    <v-list-item
                        class="list-produk"
                        v-for="(item,index) in listUser" :key="index"
                        style="cursor:pointer"
                        @click="pilihUser(item)"
                    >
                        <v-list-item-avatar>
                            <v-img v-if="item.foto != ''" :src="getImageProduk(item.foto)"></v-img>
                            <v-img v-else src="/img/profile.png"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.nama }} - {{item.email}}</v-list-item-title>

                            <v-list-item-subtitle
                                class="red--text"
                            >
                                {{ item.no_telp }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
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
  name: 'add-iklan-khusus',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  directives: { money: VMoney, mask },
  data: () => ({
    dataProduk:[],
    listUser:[],
    DataToken:'',
    DataUser:'',
    keyword:'',
    keywordUser:'',
    dialogListProduk:false,
    dialogListUser:false,
    produkTerpilih:[],
    userTerpilih:null,
    produk:{
        namaProduk:'',
        deskripsiProduk:'',
        hargaAsli:'',
        hargaKhusus:0,
        beratKhusus:0,
        diskon:0,
    }
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
    async buttonAddProduk(){
        await this.getProduk()
        this.dialogListProduk = true
    },
    async buttonAddUser(){
        await this.getUser()
        this.dialogListUser = true
    },
    async getProduk(){
      var params = new URLSearchParams();

      if (this.keyword != '') {
          params.append("search", this.keyword);
      }

      var request = {
        params: params,
      };
      await this.$axios
        .get('/produk/v1/produk/getproduk', request)
        .then((response) => {
            this.dataProduk = response.data.data
            console.log('produk', this.dataProduk)
        })
        .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
        })
    },
    async getUser(){
        var params = new URLSearchParams();

        if (this.keywordUser != '') {
            params.append("search", this.keywordUser);
        }

        var request = {
            params: params,
            headers: { Authorization: this.DataToken }
        };
        await this.$axios
            .get('/user/v1/user/getuser', request)
            .then((response) => {
                this.listUser = response.data.data
                console.log('dataUser', this.listUser)
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
    },
    async pilihProduk(item){
        // item.kuantitas = 1
        // item.totalHarga = item.harga_produk*item.kuantitas
        // console.log('item',item)
        // this.produkTerpilih.push(item)
        // console.log('item terpilih', this.produkTerpilih)
        
        // this.hitungHarga()

        this.produkTerpilih.push(
            {
              data:item,
              unit:1,
              weight:item.berat_produk,
              jumlah:item.harga_produk,
            },
        )
        this.hitungHarga()
        this.keyword = ''
        this.dialogListProduk = false
        console.log('item', item)
        console.log('produk terpilih', this.produkTerpilih)
    },
    async pilihUser(item){
        this.userTerpilih = item
        console.log('userterpilih', this.userTerpilih)
        this.keywordUser = ''
        this.dialogListUser = false
    },
    async hitungHarga(){
        this.produk.hargaAsli = 0
        this.produk.beratKhusus = 0
        for (let i = 0; i < this.produkTerpilih.length; i++) {
            this.produkTerpilih[i].weight = this.produkTerpilih[i].data.berat_produk*this.produkTerpilih[i].unit
            this.produkTerpilih[i].jumlah = this.produkTerpilih[i].data.harga_produk*this.produkTerpilih[i].unit
            this.produk.hargaAsli += this.produkTerpilih[i].jumlah
            this.produk.beratKhusus += this.produkTerpilih[i].weight
        }
        console.log('produk terpilih', this.produkTerpilih)
    },
    async changeKuantitas(id,param){
        for (let i = 0; i < this.produkTerpilih.length; i++) {
            if (this.produkTerpilih[i].data.id_produk == id) {
                if (param == 'plus') {
                    this.produkTerpilih[i].unit = this.produkTerpilih[i].unit+1
                }else{
                    if (this.produkTerpilih[i].unit != 1) {
                    this.produkTerpilih[i].unit = this.produkTerpilih[i].unit-1
                    }
                }
            }
        }
        this.hitungHarga()
    },
    async hapusProdukTerpilih(data){
        this.produkTerpilih.splice(data,1)
        this.hitungHarga()
        // console.log(index)
    },
    async postIklan(){
        console.log('produk', this.produk)
        this.produk.diskon = (this.produk.hargaKhusus*100)/this.produk.hargaAsli
        console.log('diskon', Math.round(this.produk.diskon))

        let formData = new FormData()

        formData.append('id_user', this.userTerpilih.id_user)
        formData.append('nama_khusus', this.produk.namaProduk)
        formData.append('harga_khusus', this.produk.hargaKhusus)
        formData.append('berat_khusus', this.produk.beratKhusus)
        formData.append('deskripsi_khusus', this.produk.deskripsiProduk)
        formData.append('harga_asli', this.produk.hargaAsli)
        formData.append('diskon', this.produk.diskon)

        await this.$axios
            .post('/produk/v1/khusus/create', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.postProdukKhusus()
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
    async postProdukKhusus(){
        let formData = new FormData()

        formData.append('id_user', this.userTerpilih.id_user)
        formData.append('nama_khusus', this.produk.namaProduk)
        formData.append('harga_khusus', this.produk.hargaKhusus)
        formData.append('berat_khusus', this.produk.beratKhusus)
        formData.append('deskripsi_khusus', this.produk.deskripsiProduk)
        formData.append('harga_asli', this.produk.hargaAsli)
        formData.append('diskon', this.produk.diskon)

        await this.$axios
            .post('/produk/v1/khusus/create', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.postProdukKhusus()
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
    this.DataUser = this.$cookies.get("user");
  },
}
</script>

<style>
.list-produk:hover {
  background-color: #bfbfbf;
}
</style>