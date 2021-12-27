<template>
  <div>
    <h2>Keranjang</h2>
    <br />
            <v-card
              rounded="lg"
              v-for="item in infoKeranjang"
              :key="item.data.id_produk"
              elevation="6"
              class="mb-2 mx-2"
            >
                <div class="d-flex">
                  <div>
                    <v-checkbox @change="getCheckout()" v-model="item.check" class="ml-2 mt-6"></v-checkbox>
                  </div>
                  <div>
                    <v-img :src="getImageProduk(item.data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                  </div>
                  <div class="ml-3 my-2" style="width:58%">
                    <h3>{{item.data.nama_produk}}</h3>
                    <h5 v-if="item.data.deskripsi_produk.length < 80">{{item.data.deskripsi_produk}}</h5>
                    <h5 v-else>{{item.data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                    <h3>
                      Rp
                      {{ Number(item.data.harga_produk).toLocaleString('id-ID') }}
                    </h3>
                  </div>
                  <div>
                    <div class="d-flex mt-2 mx-3">
                      <v-btn class="mt-8" x-small @click="change(item.data.id_produk,'minus'),getCheckout()">
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
                      <v-btn class="mt-8" x-small @click="change(item.data.id_produk,'plus'),getCheckout()">
                        <v-icon color="green" >mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="mt-6 ml-6">
                    <v-icon class="pt-2" large color="red">mdi-delete</v-icon>
                  </div>
                </div>
            </v-card>
        <br />
        <v-card
          rounded="lg"
          elevation="6"
          class="mb-2 mx-2"
          v-if="checkout.length > 0"
        >
          <div class="pt-2 pl-3 pr-3">
            <table style="width:100%">
              <tr>
                <td class="text-left"><h3>{{ checkout.length }} Item Dipilih</h3></td>
                <td class="text-right"><h4>Total: <span class="red--text"> Rp {{ Number(total).toLocaleString('id-ID') }}</span></h4></td>
              </tr>
            </table>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-1 white--text"
              color="#20929D"
              @click="checkCart=true"
            >
              Checkout
            </v-btn>
          </v-card-actions>
        </v-card>
        <br>
        <v-dialog 
          v-model="checkCart"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar flat dense color="#20929D">
              <v-toolbar-title><b>Checkout</b></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="checkCart = false,xCheckout()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <br>
            <h2 class="ml-6 red--text">Informasi Produk</h2>
            <v-card
              rounded="lg"
              v-for="item in checkout"
              :key="item.data.id_produk"
              elevation="6"
              class="mb-2 mx-6"
            >
                <table style="width:100%">
                  <tr>
                    <td>
                      <center>
                      <v-img :src="getImageProduk(item.data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                      </center>
                    </td>
                    <td>
                      <h3>{{item.data.nama_produk}}</h3>
                      <h5 v-if="item.data.deskripsi_produk.length < 80">{{item.data.deskripsi_produk}}</h5>
                      <h5 v-else>{{item.data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                      <h3>
                        Rp
                        {{ Number(item.data.harga_produk).toLocaleString('id-ID') }}
                      </h3>
                    </td>
                    <td class="text-right pr-4" style="width:50px">
                      <div>X {{item.unit}}</div>
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
                    @change="getCost()"
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
                    @click="checkCart = false,xCheckout()"
                  >
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
// import Vue from 'vue'
// import AxiosPlugin from 'vue-axios-cors';
// Vue.use(AxiosPlugin)
import { VMoney } from 'v-money'
import { data } from '@chenfengyuan/vue-countdown'
export default {
  name: 'cart',
  components: {
  },
  data: () => ({
    keranjang: [],
    infoKeranjang:[],
    akunProfile: false,
    checkout:[],
    total: 0,
    berat: 0,
    checkCart:false,
    biayaPPN:0,
    biayaPengiriman:0,
    totalSemua:0,
    totalPembayaran:0,
    detailAlamat:'',
    apiKey:'0e33e27e42c55799ebe174e1307f2adf',
    provinsi:[],
    idProvinsi:'',
    city:[],
    idCity:'',
    kecamatan:[],
    idKecamatan:'',
    cost:[],
    pickCost:[],
    indexs:99,
    listCost:[],
    profil:[],
    ppn:false,
    pesanPembeli:'',
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
    async getKeranjang() {
      await this.$axios
        .get('/keranjang/v1/keranjang/getkeranjang', {
          headers: { Authorization: this.DataToken }
        })
        .then((response) => {
          this.keranjang = response.data.data
          let dataKeranjang = []
          for (let i = 0; i < this.keranjang.length; i++) {
            dataKeranjang.push({
              check:false,
              unit:1,
              data:this.keranjang[i]
            })
          }
          this.infoKeranjang = dataKeranjang
          console.log('keranjang', this.keranjang)
          console.log('data keranjang', this.infoKeranjang)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async change(id,param){
      for (let i = 0; i < this.infoKeranjang.length; i++) {
        if (this.infoKeranjang[i].data.id_produk == id) {
          if (param == 'plus') {
            this.infoKeranjang[i].unit = this.infoKeranjang[i].unit+1
          }else{
            if (this.infoKeranjang[i].unit != 1) {
              this.infoKeranjang[i].unit = this.infoKeranjang[i].unit-1
            }
          }
        }
      }
    },
    async getCheckout(){
      this.checkout = []
      for (let i = 0; i < this.infoKeranjang.length; i++) {
        if (this.infoKeranjang[i].check == true) {
          this.checkout.push(
            {
              data:this.infoKeranjang[i].data,
              unit:this.infoKeranjang[i].unit,
              weight:this.infoKeranjang[i].data.berat_produk*this.infoKeranjang[i].unit,
              jumlah:this.infoKeranjang[i].data.harga_produk*this.infoKeranjang[i].unit,
            }
          )
        }
      }
      this.total = 0
      this.berat = 0
      for (let j = 0; j < this.checkout.length; j++) {
        this.total += this.checkout[j].jumlah
        this.berat += this.checkout[j].weight
      }
      
      console.log('checkout', this.checkout)
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
    async getCost(){
      var params = new URLSearchParams();
      params.append("origin", 2113);
      params.append("destination", this.idKecamatan);
      params.append("weight", this.berat);
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
    async xCheckout(){
      this.idProvinsi = ''
      this.idCity = ''
      this.idKecamatan = ''
      this.cost = ''
      this.indexs = 99
      this.detailAlamat = ''
      this.ppn = false
      this.pesanPembeli = ''
      this.pickCost = []
      this.biayaPengiriman = 0
      this.biayaPPN = 0
      this.totalPembayaran = 0
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
    async checkPPN(){
      if (this.ppn == true) {
        this.biayaPPN = 0
        this.biayaPPN = this.total*0.1

        this.totalSemua = 0
        this.totalSemua = this.biayaPPN+this.total
        this.checkHargaJadi()
      } else {
        this.biayaPPN = 0

        this.totalSemua = 0
        this.totalSemua = this.biayaPPN+this.total
        this.checkHargaJadi()
      }
    },
    async checkHargaJadi(){
      if (this.pickCost.length == 0) {
        if (this.ppn == true) {
          this.biayaPPN = 0
          this.biayaPPN = this.total*0.1

          this.totalSemua = 0
          this.totalSemua = this.biayaPPN+this.total
        } else {
          this.biayaPPN = 0

          this.totalSemua = 0
          this.totalSemua = this.biayaPPN+this.total
        }
        this.totalPembayaran = this.totalSemua
      }else{
        if (this.ppn == true) {
          this.biayaPPN = 0
          this.biayaPPN = this.total*0.1

          this.totalSemua = 0
          this.totalSemua = this.biayaPPN+this.total
        } else {
          this.biayaPPN = 0

          this.totalSemua = 0
          this.totalSemua = this.biayaPPN+this.total
        }
        this.totalPembayaran = this.totalSemua+this.pickCost.value
      }
      console.log('leng pick cost', this.pickCost.length)
    },
    async buatPesanan(){
      if (this.ppn == true) {
        if (this.profil == undefined) {
          this.akunProfile = true
        } else {
          console.log('jadi')
        }
      } else {
        console.log('jadi')
      }
    }
    
  },
  async created() {
    this.DataToken = this.$cookies.get("token");
    console.log('user', this.user)
    await this.getKeranjang()
    this.getProvinsi()
    this.getProfil()
  },
}
</script>

<style>
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