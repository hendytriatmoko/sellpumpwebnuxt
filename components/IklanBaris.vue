<template>
  <div>
    <section id="info-iklan" class="mt-2">
      <v-row>
        <v-col cols="12" sm="4">
          <v-img :src="getImageProduk(hits.gambar_produk)">
          </v-img>
          <v-divider class="mt-2"></v-divider>
        </v-col>

        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="12" align="right">
              <h2 class="text-center">{{ hits.nama_produk }} - {{hits.tipe_produk}}</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3>Deskripsi</h3>
              <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="hits.deskripsi_produk"
              ></div>
            </v-col>
          </v-row>
          <v-row dense align="center">
            <v-col cols="6">
              <h2 class="#20929D--text">
                Rp {{ Number(hits.harga_produk).toLocaleString('id-ID') }}
              </h2>
            </v-col>
          </v-row>

          <hr class="my-3" />

          <v-row>
            <v-col cols="12 ">
              <table style="width:100%">
                <tr>
                  <td><b>Kategori</b></td>
                  <td>:</td>
                  <td class="pl-3">{{hits.kategori}} - {{hits.sub_kategori}}</td>
                </tr>
                <tr>
                  <td><b>Kode Produk</b></td>
                  <td>:</td>
                  <td class="pl-3">{{hits.kode_produk}}</td>
                </tr>
                <tr>
                  <td><b>Berat Produk</b></td>
                  <td>:</td>
                  <td class="pl-3">{{ Number(hits.berat_produk).toLocaleString('id-ID') }} Gram</td>
                </tr>
                <tr>
                  <td><b>Merk Produk</b></td>
                  <td>:</td>
                  <td class="pl-3">{{hits.nama_merk}}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td class="pl-3">
                    <img width="100px" :src="getImageMerk(hits.gambar_merk)">
                  </td>
                </tr>
              </table>
            </v-col>
          </v-row>

        </v-col>

        <v-col cols="12" sm="2">
          <div class="d-flex my-2">
            <v-tooltip bottom v-if="!guest && user.status == 'pembeli'">
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  height="47"
                  class="white"
                  v-on="on"
                  @click="addKeranjang()"
                >
                  <v-icon color="red" left>mdi-cart</v-icon>
                  Keranjang
                </v-btn>
              </template>
              <span>Keranjang</span>
            </v-tooltip>
            <v-tooltip
              bottom
              v-if="!guest && user.status != 'pembeli'"
            >
              <template v-slot:activator="{ on }">
                <v-btn text height="47" class="white" v-on="on" @click="goEdit()">
                  <v-icon color="blue" left>mdi-pencil</v-icon> Edit
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>
            <v-tooltip
              bottom
              v-if="!guest && user.status != 'pembeli'"
            >
              <template v-slot:activator="{ on }">
                <v-btn @click="hapusIklan=true" text height="47" class="white" v-on="on">
                  <v-icon color="red" left>mdi-delete</v-icon> Hapus
                </v-btn>
              </template>

              <span>Hapus</span>
            </v-tooltip>
          </div>
          <v-btn
            color="#20929D"
            dark
            block
            v-if="!guest"
            @click="dialogPembelian=true,beratProduk=hits.berat_produk,total=hits.harga_produk"
          >
            Pesan
          </v-btn>
          <v-btn
            color="#20929D"
            dark
            v-else
            block
            to="/login"
          >
            Pesan
          </v-btn>
          <hr class="my-3" />
          <div v-if="hits.link_tokopedia != '' || hits.link_bukalapak != ''">
            <div>Atau buka dengan :</div>
            <v-row>
              <v-col cols="12" sm="6" v-if="hits.link_tokopedia != ''">
                <a :href="hits.link_tokopedia"><v-img src="/img/tokped.png" width="70" ></v-img></a>
              </v-col>
              <v-col cols="12" sm="6" v-if="hits.link_bukalapak != ''">
                <a :href="hits.link_bukalapak"><v-img src="/img/bukalapak.png" class="mt-3" width="50" ></v-img></a>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </section>

    <hr class="my-3" />
    <v-row>
      <v-col cols="12" sm="4">
        <h2>Rating Produk</h2>
        <div class="ml-3">
          <div v-if="rating.length > 0">
            Rata-rata penilaian produk ( <b>{{ rateRating }}</b> )
            <v-rating
              v-model="rateRating"
              color="yellow darken-3"
              background-color="grey lighten-1"
              empty-icon="$ratingFull"
              half-increments
              readonly
              large
            ></v-rating>
          </div>
          <div v-else>Maaf Belum ada penilaian produk</div>
        </div>
      </v-col>
      <v-col cols="12" sm="8">
        <h2>Detail Ulasan</h2>
        <div class="ml-3">
          <div v-if="rating.length > 0">
            <div  v-for="(item,index) in rating" :key="index">
              <div class="d-flex">
                <h3>{{ item.nama }}</h3>
                <v-rating
                  :value="item.rating"
                  color="yellow darken-3"
                  background-color="grey lighten-1"
                  empty-icon="$ratingFull"
                  half-increments
                  readonly
                  small
                ></v-rating>
              </div>
              <div>
                {{ item.komentar }}
              </div>
            </div>
          </div>
          <div v-else>Maaf Belum ada ulasan produk</div>
        </div>
      </v-col>
    </v-row>
    <div id="create">
      <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-share-variant
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <a href="whatsapp://send?text=Hello saya ingin pesan&phone=+6285893157871" _blank><img style="width:30px" src="/img/wa.png"></a>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="clipboard()"
      >
        <v-icon>mdi-clipboard-outline</v-icon>
      </v-btn>
    </v-speed-dial>
    </div>
    <v-dialog v-model="hapusIklan" width="300">
      <v-card class="rounded-lg">
        <v-toolbar dense flat dark color="primary">
          <v-toolbar-title>
            <b>Hapus Iklan</b>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="hapusIklan = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <br />

        <v-card-text>
          Apakah Anda Yakin Ingin Menghapus Iklan <b> {{ hits.nama_produk }} </b>?
        </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-capitalize"
            color="secondary"
            @click="hapusIklan = false"
            text
          >
            <b>Cancel</b>
          </v-btn>
          <v-btn class="text-capitalize" @click="deleteIklan()" color="error" text>
            <b>Hapus</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogPembelian"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Checkout</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogPembelian = false,xPembelian()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <h2 class="ml-6 red--text">Informasi Produk</h2>
        <v-card
          rounded="lg"
          elevation="6"
          class="mb-2 mx-6"
        >
            <table style="width:100%">
              <tr>
                <td>
                  <center>
                  <v-img :src="getImageProduk(hits.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                  </center>
                </td>
                <td>
                  <h3>{{hits.nama_produk}}</h3>
                  <!-- <h5>{{hits.deskripsi_produk.length}}</h5> -->
                  <h5 v-if="descLength < 80">{{hits.deskripsi_produk}}</h5>
                  <h5 v-else>{{hits.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                  <h3>
                    Rp
                    {{ Number(hits.harga_produk).toLocaleString('id-ID') }}
                  </h3>
                </td>
                <td class="text-right pr-4" style="width:50px">
                  <div class="d-flex mt-2 mx-3">
                      <v-btn class="mt-8" x-small @click="kuantitas('minus')">
                        <v-icon color="red" >mdi-minus</v-icon>
                      </v-btn>
                      <v-text-field
                        class="mt-5 mx-2"
                        style="width:50px"
                        v-model="unitProduk"
                        @keyup="kuantitas()"
                        solo
                        number
                        dense
                      ></v-text-field>
                      <v-btn class="mt-8" x-small @click="kuantitas('plus')">
                        <v-icon color="green" >mdi-plus</v-icon>
                      </v-btn>
                    </div>
                </td>
              </tr>
            </table>
        </v-card>
        <br>
        <h2 class="ml-6 red--text">Informasi Pengiriman</h2>
        <br>
        <v-row class="mx-3">
          <v-col cols="12" sm="4">
            <div class="pb-2"><b> Provinsi </b></div>
            <v-autocomplete
                v-model="idProvinsi"
                :items="provinsi"
                outlined
                item-text="province"
                item-value="province_id"
                dense
                label="Provinsi"
                @change="getCity()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" v-if="idProvinsi != ''">
            <div class="pb-2"><b> Kota / Kabupaten </b></div>
            <v-autocomplete
                v-model="idCity"
                :items="city"
                outlined
                item-text="city_name"
                item-value="city_id"
                dense
                label="Kota / Kabupaten"
                @change="getSubdistrict()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" v-if="idCity != ''">
            <div class="pb-2"><b> Kecamatan </b></div>
            <v-autocomplete
                v-model="idKecamatan"
                :items="kecamatan"
                outlined
                item-text="subdistrict_name"
                item-value="subdistrict_id"
                dense
                label="Kecamatan"
                @change="getCost(),getSubdistrictDetail()"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-if="idKecamatan != ''" class="mx-3" style="margin-top:-30px">
          <v-col cols="12" sm="8">
            <div class="pb-2"><b> Pesan </b></div>
            <v-text-field
              outlined
              dense
              label="Pesan untuk penjual"
              v-model="pesanPembeli"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="pb-2"><b> PPN </b></div>
            <v-checkbox
              label="Pembelian dengan PPN 10% ?"
              style="margin-top:0px"
              v-model="ppn"
              @change="checkPPN()"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="12" style="margin-top:-30px">
            <div class="pb-2"><b> Detail Alamat </b></div>
            <v-text-field
              outlined
              dense
              label="Detail Alamat"
              v-model="detailAlamat"
            ></v-text-field>
          </v-col>              
        </v-row>
        <div class="ml-3" v-if="cost.length != 0 && detailAlamat != ''">
            <h2 class="red--text ml-3">Pilih Ekspedisi</h2>
            <br>
            <div >
              <v-row class="mx-2">
              <v-col 
                @click="pengiriman(item,index)" 
                cols="12" sm="3" 
                v-for="(item,index) in listCost" 
                :key="index"
                :style="index == indexs ? 'border: 2px solid blue;border-radius:10px;cursor:pointer' : 'cursor:pointer'"
              >
                <table>
                  <tr>
                    <td>
                      <v-img v-if="item.code == 'jne'" src="/img/jne.png" width="100px"></v-img>
                      <v-img v-if="item.code == 'pos'" src="/img/posindo.png" width="100px"></v-img>
                      <v-img v-if="item.code == 'tiki'" src="/img/tiki.png" width="100px"></v-img>
                    </td>
                    <td>
                      <h3 class="pl-2">{{ item.name }}</h3>
                      <div class="pl-2">{{ item.service }} - {{ item.description }}</div>
                      <div class="pl-2">{{ item.etd }} <span v-if="item.code != 'pos'">Hari</span></div>
                      <h4 class="red--text pl-2">Rp {{ Number(item.value).toLocaleString('id-ID') }}</h4>
                    </td>
                  </tr>
                </table>
              </v-col>
              </v-row>
            </div>
            <br>
        </div>
        <h2 class="ml-6 red--text">Informasi Pembayaran</h2>
        <v-card
          rounded="lg"
          elevation="6"
          class="mb-2 mx-6"
        >
            <table style="width:100%">
              <tr>
                <td class="pl-3">
                  <h4>Subtotal untuk Produk</h4>
                  <h4 v-if="ppn==true">PPN 10%</h4>
                  <h4>Subtotal untuk Pengiriman</h4>
                  <h2 class="red--text">Total Pembayaran</h2>
                </td>
                <td class="text-right pr-6">
                  <div>
                    Rp
                    {{ Number(this.total).toLocaleString('id-ID') }}
                  </div>
                  <div v-if="ppn==true">
                    Rp
                    {{ Number(this.biayaPPN).toLocaleString('id-ID') }}
                  </div>
                  <div>
                    Rp
                    {{ Number(this.biayaPengiriman).toLocaleString('id-ID') }}
                  </div>
                  <h3 class="red--text">
                    Rp
                    {{ Number(this.totalPembayaran).toLocaleString('id-ID') }}
                  </h3>
                </td>
              </tr>
            </table>
            <v-card-actions class="mr-5">
              <v-spacer></v-spacer>
              <v-btn
                @click="dialogPembelian = false,xPembelian()"
              >
              <!-- <v-btn
                @click="inv()"
              > -->
                Cancel
              </v-btn>
              <v-btn
                color="#20929D"
                class="white--text"
                :disabled="totalPembayaran == 0 || pickCost.length == 0 ? true : false"
                @click="buatPesanan()"
              >
                Buat Pesanan
              </v-btn>
            </v-card-actions>
        </v-card>
        <br>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="akunProfile">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Profile Perusahaan</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="akunProfile = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-alert border="left" colored-border type="warning" elevation="2">
          <strong>Anda belum mengisi profile perusahaan.</strong>
          <br />
          Untuk dapat menggunakan pembelian dengan PPN, anda wajib mengisi dahulu profile perusahaan. Untuk mengisi profile perusahaan <NuxtLink to="/account/profile/umum" style="color: #20929D"> Klik disini </NuxtLink>. close tab ini jika ingin melanjutkan pembelian dengan non-PPN
        </v-alert>
        <br>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VMoney } from 'v-money'
export default {
  name: 'iklan-baris',
  props: ['items', 'id'],
  components: {
    Spesifikasi: () =>
      import(
        /* webpackChunkName: "spesifikasi" */ '@/components/Spesifikasi.vue'
      ),
  },
  directives: { money: VMoney },
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    },
  },
  data: () => ({
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
    
    tab: 0,
    hits:[],
    hapusIklan: false,
    dialogPembelian: false,
    favorit: [],
    iklan: [],
    carousel: 0,
    unitMokas: [],
    fotos: [],
    seller: [],
    catatan: [],
    kebijakan: [],
    avg: [],
    sharing: {},
    telpon: 'telpon',
    whatsapp: 'whatsapp',
    chat: 'chat',
    record: '',
    pembeli: '',
    setterjual: false,
    note: '',
    networks: [
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'fab fah fa-lg fa-whatsapp',
        color: '#25d366',
      },
    ],
    judul: '',
    deskripsi: '',
    harga: '',
    amountRules: [
      (v) => v != 0 || 'Field is required',
      (v) => v.length <= 11 || 'Max 11 karakter',
    ],
    money: {
      precision: 0,
      thousands: '.',
      masked: true,
    },
    valid: true,
    dialog: false,
    formRules: [(v) => !!v || 'Field is required'],
    hubungi: false,
    gbrRatting: '',
    statistik: [],
    akunProfile:false,
    pembayaranTerverifikasi: [],
    dibatalkanPenjual: [],
    menungguPembayaran: [],
    rating:[],
    rateRating:0,
    DataToken:'',
    descLength:0,
    unitProduk:1,
    beratProduk:0,
    provinsi:[],
    idProvinsi:'',
    city:[],
    idCity:'',
    kecamatan:[],
    idKecamatan:'',
    detailKecamatan:[],
    cost:[],
    pickCost:[],
    indexs:99,
    listCost:[],
    ppn:false,
    pesanPembeli:'',
    detailAlamat:'',
    biayaPengiriman:0,
    total: 0,
    biayaPPN:0,
    biayaPengiriman:0,
    totalPembayaran:0,
    profil:[],
    dataInv:[],
    distinctInv:[],
    nomorInvoice:'',
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      // id: 'product/id',
      unitid: 'product/unitid',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setSellertId: 'product/setSeller',
      setAuth: 'auth/set',
    }),
    async getDtlIklan() {
      await this.$axios
        .get('/produk/v1/produk/getproduk',{
          params: {
              id_produk: this.id,
            },
        })
        .then((response) => {
          this.hits = response.data.data[0]
          this.descLength = this.hits.deskripsi_produk.length
          console.log('hits', this.hits)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    goEdit() {
      this.$router.push(
        '/seller/add-iklan?id='+this.id
      )
    },
    async deleteIklan(){
      let formData = new FormData()
      formData.append('id_produk', this.hits.id_produk)
      await this.$axios
        .put('/produk/v1/produk/delete', formData, {
          headers: { Authorization: this.DataToken }
        })
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Produk berhasil diHapus',
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
    async addKeranjang(){
      let formData = new FormData()
      formData.append('id_produk', this.hits.id_produk)
      formData.append('id_user', this.user.id_user)

      await this.$axios
        .post('/keranjang/v1/keranjang/create', formData, {
          headers: { Authorization: this.DataToken }
        })
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Produk ditambahkan ke Keranjang',
            })
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
    async getProfil(){
      var params = new URLSearchParams();
      params.append("id_user", this.user.id_user);
      var request = {
        params: params,
        headers: { Authorization: this.DataToken }
      };
      this.$axios
        .get("/user/v1/profil/getprofil", request)
        .then(response => {
          this.profil = response.data.data[0]
          console.log('profil nih', this.profil)
        })
        .catch(error => {
          console.log(error.response.data.api_message);
        });
    },
    async kuantitas(data){
      if (data == 'plus') {
        this.unitProduk += 1
      }else if (data == 'minus') {
        if (this.unitProduk > 1) {
          this.unitProduk -= 1
        }
      }
      this.beratProduk = this.hits.berat_produk*this.unitProduk
      this.total = this.hits.harga_produk*this.unitProduk
      this.xUbah()
    },
    async getProvinsi(){
      this.$axios('http://sellpump.xyz:2299/sellpump/api/keranjang/v1/rajaongkir/getprovince'
      ).then( ({ data }) => {
          let data_province = data.data
          let province = JSON.parse(data_province)
          this.provinsi = province.rajaongkir.results
          console.log('prov nih', this.provinsi)
        })      
    },
    async getCity(){
      var params = new URLSearchParams();
      params.append("id_provinsi", this.idProvinsi);
      var request = {
        params: params,
      };
      this.$axios('http://sellpump.xyz:2299/sellpump/api/keranjang/v1/rajaongkir/getcity',request
      ).then( ({ data }) => {
          let data_city = data.data
          let city = JSON.parse(data_city)
          this.city = city.rajaongkir.results
          console.log('city nih', this.city)
        })      
    },
    async getSubdistrict(){
      var params = new URLSearchParams();
      params.append("id_city", this.idCity);
      var request = {
        params: params,
      };
      this.$axios('http://sellpump.xyz:2299/sellpump/api/keranjang/v1/rajaongkir/getsubdistrict',request
      ).then( ({ data }) => {
          let data_kecamatan = data.data
          let kecamatan = JSON.parse(data_kecamatan)
          this.kecamatan = kecamatan.rajaongkir.results
          console.log('kecamatan nih', this.kecamatan)
        })      
    },
    async getSubdistrictDetail(){
      var params = new URLSearchParams();
      params.append("id_city", this.idCity);
      params.append("id_kecamatan", this.idKecamatan);
      var request = {
        params: params,
      };
      this.$axios('http://sellpump.xyz:2299/sellpump/api/keranjang/v1/rajaongkir/getsubdistrict',request
      ).then( ({ data }) => {
          let data_kecamatan = data.data
          let kecamatan = JSON.parse(data_kecamatan)
          this.detailKecamatan = kecamatan.rajaongkir.results
          console.log('kecamatan detail', this.detailKecamatan)
        })      
    },
    async getCost(){
      var params = new URLSearchParams();
      params.append("origin", 2113);
      params.append("destination", this.idKecamatan);
      params.append("weight", this.beratProduk);
      var request = {
        params: params,
      };
      this.$axios('http://sellpump.xyz:2299/sellpump/api/keranjang/v1/rajaongkir/getcost',request
      ).then( ({ data }) => {
          let data_cost = data.data
          let cost = JSON.parse(data_cost)
          this.cost = cost.rajaongkir.results
          console.log('cost nih', this.cost)
          this.aturCost()
        })      
    },
    async aturCost(){
      this.listCost = []
      for (let i = 0; i < this.cost.length; i++) {
        for (let j = 0; j < this.cost[i].costs.length; j++) {
          for (let k = 0; k < this.cost[i].costs[j].cost.length; k++) {
            this.listCost.push(
            {
              code:this.cost[i].code,
              name:this.cost[i].name,
              service:this.cost[i].costs[j].service,
              description:this.cost[i].costs[j].description,
              etd:this.cost[i].costs[j].cost[k].etd,
              value:this.cost[i].costs[j].cost[k].value,
            }
          )
          }
        }
      }
      console.log('listcost', this.listCost)
    },
    async pengiriman(item,index){
      this.pickCost = item
      this.biayaPengiriman = item.value
      this.indexs = index
      this.checkHargaJadi()
    },
    async checkPPN(){
      if (this.ppn == true) {
        this.biayaPPN = 0
        this.biayaPPN = this.total*0.1
        this.checkHargaJadi()
      } else {
        this.biayaPPN = 0
        this.checkHargaJadi()
      }
    },
    async checkHargaJadi(){
      this.totalPembayaran = parseInt(this.total)+parseInt(this.biayaPengiriman)+parseInt(this.biayaPPN)
    },
    async xUbah(){
      this.idProvinsi=''
      this.city=[]
      this.idCity=''
      this.kecamatan=[]
      this.idKecamatan=''
      this.detailKecamatan=[]
      this.cost=[]
      this.pickCost=[]
      this.indexs=99
      this.listCost=[]
      this.ppn=false
      this.pesanPembeli=''
      this.detailAlamat=''
      this.biayaPengiriman=0
      this.biayaPPN=0
      this.biayaPengiriman=0
      this.totalPembayaran=0
    },
    async xPembelian(){
      this.unitProduk=1
      this.total=0
      this.idProvinsi=''
      this.city=[]
      this.idCity=''
      this.kecamatan=[]
      this.idKecamatan=''
      this.detailKecamatan=[]
      this.cost=[]
      this.pickCost=[]
      this.indexs=99
      this.listCost=[]
      this.ppn=false
      this.pesanPembeli=''
      this.detailAlamat=''
      this.biayaPengiriman=0
      this.biayaPPN=0
      this.biayaPengiriman=0
      this.totalPembayaran=0
    },
    async buatPesanan(){
      if (this.ppn == true) {
        if (this.profil == undefined) {
          this.akunProfile = true
        } else {
          this.cekInv()
          // console.log('action with ppv verifikasi')
        }
      } else {
        // console.log('action without ppv verifikasi')
        this.cekInv()
      }
    },
    async cekInv(){
      var params = new URLSearchParams();
      let bulan = new Date().getMonth()+1;
      let tahun = new Date().getFullYear();

      if (bulan == 11 || bulan == 12 || bulan == 10) {
        params.append("created_at", tahun+"-"+bulan);
      }else{
        params.append("created_at", tahun+"-"+"0"+bulan);
      }      

      var request = {
        params: params,
        headers: { Authorization: this.DataToken }
      };
      this.$axios
        .get("/keranjang/v1/pesanan/getpesanan", request)
        .then(response => {
          this.dataInv = response.data.data
          console.log('dataInv nih', this.dataInv)
          this.distinctInv = [
              ...new Map(this.dataInv.map((item) => [item["no_inv"], item])).values(),
          ];
          
          console.log("distinctInv nih", this.distinctInv);
          this.inv()
        })
        .catch(error => {
          console.log(error.response.data.api_message);
        });
    },
    async inv(){
      let gsp = 'INV-GSP'
      let bulan = new Date().getMonth()+1;
      let tahun = new Date().getFullYear();
      let intPesanan = this.distinctInv.length+1
      let date = new Date()
      console.log('bulan', bulan)
      console.log('tahun', tahun)
      console.log('date', date)
      console.log('date search', tahun+'-'+bulan)
      // console.log('inv', bulan+'/'+intPesanan+'/'+gsp+'/'+tahun)
      this.nomorInvoice = bulan+'/'+intPesanan+'/'+gsp+'/'+tahun
      console.log('inv', this.nomorInvoice)
      this.postPesanan()
    },
    async postPesanan(){
        let formData = new FormData()
  
        formData.append('no_inv', this.nomorInvoice)
        formData.append('id_produk', this.hits.id_produk)
        formData.append('kuantitas', this.unitProduk)
        formData.append('harga', this.total)
        formData.append('berat', this.beratProduk)
        formData.append('id_user', this.user.id_user)
  
        await this.$axios
          .post('/keranjang/v1/pesanan/create', formData, {
            headers: { Authorization: this.DataToken }
          })
          .then((response) => {
              console.log(response)
              this.postInvoice()
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
    async postInvoice(){
      // console.log('no_inv', this.nomorInvoice)
      // console.log('id_user', this.user.id_user)
      // console.log('total', this.total)
      // if (this.ppn == true) {
      //   console.log('ppn', 'Y')
      //   console.log('nilai_ppn', this.biayaPPN)
      // } else {
      //   console.log('ppn', 'N')
      //   console.log('nilai_ppn', '0')
      // }
      
      // console.log('ongkos kirim', this.biayaPengiriman)
      // console.log('jumlah pembayaran', this.totalPembayaran)
      // console.log('id_status_pembayaran', '1')
      // console.log('nama eks', this.pickCost.name)
      // console.log('layanan eks', this.pickCost.service)
      // console.log('etd', this.pickCost.etd)
      // console.log('id_status_pengiriman', '1')
      // console.log('detail_alamat', this.detailKecamatan.province+','+this.detailKecamatan.city+','+this.detailKecamatan.subdistrict_name+' - '+this.detailAlamat)
      // console.log('pesan_pembeli', this.pesanPembeli)

      let formData = new FormData()
  
        formData.append('no_inv', this.nomorInvoice)
        formData.append('id_user', this.user.id_user)
        formData.append('total', this.total)
        if (this.ppn == true) {
          formData.append('ppn', 'Y')
          formData.append('nilai_ppn', this.biayaPPN)
        } else {
          formData.append('ppn', 'N')
          formData.append('nilai_ppn', 0)
        }

        formData.append('ongkos_kirim', this.biayaPengiriman)
        formData.append('jumlah_pembayaran', this.totalPembayaran)
        formData.append('id_status_pembayaran', '1')
        formData.append('nama_ekspedisi', this.pickCost.name)
        formData.append('layanan_ekspedisi', this.pickCost.service)
        formData.append('etd', this.pickCost.etd)
        formData.append('id_status_pengiriman', '1')
        formData.append('detail_alamat', this.detailKecamatan.province+','+this.detailKecamatan.city+','+this.detailKecamatan.subdistrict_name+' - '+this.detailAlamat)
        formData.append('pesan_pembeli', this.pesanPembeli)
  
        await this.$axios
          .post('/keranjang/v1/invoice/create', formData, {
            headers: { Authorization: this.DataToken }
          })
          .then((response) => {
              console.log(response)
              this.setAlert({
                status: true,
                color: 'success',
                text: 'Pesanan berhasil dibuat',
              })
            this.$router.push('/account/profile/pesanan')
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
    async getRating(){
      var params = new URLSearchParams();
      params.append("id_produk", this.hits.id_produk);
      var request = {
        params: params,
      };
      this.$axios
        .get("/produk/v1/rating/getrating", request)
        .then(response => {
          this.rating = response.data.data
          console.log('rating nih', this.rating)
          let rate = 0
          for (let i = 0; i < this.rating.length; i++) {
            rate = rate + parseInt(this.rating[i].rating)
          }
          this.rateRating = rate/this.rating.length
          console.log('rate rating nih', this.rateRating)
        })
        .catch(error => {
          console.log(error.response.data.api_message);
        });
    },
    async clipboard(){
      navigator.clipboard.writeText('http://sellpump.xyz:70'+this.$route.path);
      this.setAlert({
        status: true,
        color: 'success',
        text: 'Link berhasil disalin',
      })
    },
  },
  async created() {
    this.DataToken = this.$cookies.get("token");
    await this.getDtlIklan()
    this.getProvinsi()
    this.getProfil()
    this.getRating()
    console.log('ff',this.$route.path)
  },
}
</script>

<style>
#create .v-speed-dial {
  position: fixed;
}

#create .v-btn--floating {
  position: relative;
}
div.sticky {
  overflow: hidden;
  position: sticky;
  top: 12.6%;
  z-index: 1;
}
div.fixed {
  position: fixed;
  top: 35%;
  width: 290px;
  z-index: 1;
}
.v-application.primary--text {
  color: #20929d !important;
  caret-color: #20929d !important;
}
ody {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
h1 {
  text-align: center;
  margin: 50px 0 80px;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^='share-network-'] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^='share-network-'] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^='share-network-'] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>