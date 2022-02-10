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
        <h2 class="text-center">Produk Khusus</h2>
        <v-divider></v-divider>
        
        
        <br>
        <v-row align="start" class="mx-6">
            <v-col cols="12" sm="12">
            <v-card rounded="lg" elevation="1" height="418px">
                <v-container>
                <div >

                    <div class="scrolling-wrapper-flexbox">
                    <!-- moment(item.date).add(utc, 'h').format('DD MMM, YYYY') -->
                    <v-card
                        class="ma-2 ml-4"
                        rounded="xl"
                        width="250px"
                        v-for="(item, index) in dataKhusus.produk_khusus"
                        @click="goProduk(item.produk[0].id_produk,item.produk[0].nama_produk)"
                        contain
                        :key="index"
                        >
                            <div class="red white--text py-1"><center>X{{ item.kuantitas }} Unit</center></div>
                            <v-img :src="getImageProduk(item.produk[0].gambar_produk)" height="210">
                            </v-img>

                            <v-list dense>
                                <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="teal--text">
                                    <h5>
                                        {{ item.produk[0].kategori }} - {{ item.produk[0].sub_kategori }}
                                    </h5>
                                    <!-- <h5>
                                        {{ item._source.mst_iklan_jenis }}
                                    </h5> -->
                                    </v-list-item-subtitle>
                                    <!-- <h4 class="my-4">
                                    {{ item._source.judul }}
                                    </h4> -->
                                    <h4 class="my-4">
                                    {{ item.produk[0].nama_produk }}
                                    </h4>

                                    <v-divider class="mb-2"> </v-divider>

                                    <div class="d-flex">
                                    <!--  iklan baris -->
                                    <v-list-item-title
                                    >
                                        Harga Produk
                                    </v-list-item-title>

                                    <!-- IB -->
                                    <v-list-item-title
                                        align="right"
                                        class="red--text"
                                    >
                                        Rp
                                        {{ Number(item.produk[0].harga_produk).toLocaleString('id-ID') }}
                                    </v-list-item-title>
                                    </div>
                                    <div class="d-flex">
                                    <!--  iklan baris -->
                                    <v-list-item-title
                                    >
                                        Subtotal Produk
                                    </v-list-item-title>

                                    <!-- IB -->
                                    <v-list-item-title
                                        align="right"
                                        class="red--text"
                                    >
                                        Rp
                                        {{ Number(item.harga).toLocaleString('id-ID') }}
                                    </v-list-item-title>
                                    </div>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                    </v-card>
                    </div>
                </div>
                </v-container>
            </v-card>
            </v-col>
        </v-row>
      <br>
        <h2 class="text-center">{{ dataKhusus.nama_khusus }}</h2>
        <v-row class="mx-6">
            <v-col cols="8">
                <h3>Deskripsi</h3>
                <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="dataKhusus.deskripsi_khusus"
                ></div>
            </v-col>
            <v-col cols="4">
                <h3>Harga <span class="red--text">(diskon {{ dataKhusus.diskon }}%)</span></h3>
                <div> 
                    Rp
                    {{ Number(dataKhusus.harga_khusus).toLocaleString('id-ID') }} 
                    <sup class="red--text">
                        <s>
                        Rp
                        {{ Number(dataKhusus.harga_asli).toLocaleString('id-ID') }}
                        </s>
                    </sup>
                </div>
            </v-col>
        </v-row>
        <br>
        <div class="mx-6">
            <v-btn width="100%" @click="goPesan()" color="#20929D" class="mx-1">
                Pesan Sekarang
            </v-btn>
        </div>
        <br>
        <Footer />
        <v-dialog
          v-model="dialogPesanKhusus"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar flat dense color="#20929D">
                <v-toolbar-title><b>Pesanan</b></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogPesanKhusus = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar>
                <br>
                <h2 class="ml-6 red--text">Informasi Produk</h2>
                <v-card
                    rounded="lg"
                    v-for="(item,index) in dataKhusus.produk_khusus"
                    :key="index"
                    elevation="6"
                    class="mb-2 mx-6"
                >
                    <table style="width:100%">
                    <tr>
                        <td>
                        <center>
                        <v-img :src="getImageProduk(item.produk[0].gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                        </center>
                        </td>
                        <td>
                        <h3>{{item.produk[0].nama_produk}}</h3>
                        <h5 v-if="item.produk[0].deskripsi_produk.length < 80">{{item.produk[0].deskripsi_produk}}</h5>
                        <h5 v-else>{{item.produk[0].deskripsi_produk.substring(0, 80) + '....' }}</h5>
                        <h3>
                            Rp
                            {{ Number(item.produk[0].harga_produk).toLocaleString('id-ID') }}
                        </h3>
                        </td>
                        <td class="text-right pr-4" style="width:50px">
                        <div>X {{item.kuantitas}}</div>
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
                        @change="hitungPPN()"
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
                                {{ Number(dataKhusus.harga_khusus).toLocaleString('id-ID') }} 
                                <sup class="red--text">
                                    <s>
                                    Rp
                                    {{ Number(dataKhusus.harga_asli).toLocaleString('id-ID') }}
                                    </s>
                                </sup>
                            </div>
                            <div v-if="ppn==true">
                                Rp
                                {{ Number(this.nilaiPPN).toLocaleString('id-ID') }}
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
                    <!-- <v-btn
                        @click="inv()"
                    > -->
                        Cancel
                    </v-btn>
                    <v-btn
                        color="#20929D"
                        class="white--text"
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
export default {
    name: 'pesanan',
    data: () => ({
        dataKhusus:[],
        DataUser:'',
        DataToken:'',
        dialogPesanKhusus:false,
        akunProfile:false,
        profil:[],

        ppn:false,
        pesanPembeli:'',
        detailAlamat:'',

        biayaPengiriman:0,
        totalPembayaran:0,
        nilaiPPN:0,

        apiKey:'0e33e27e42c55799ebe174e1307f2adf',
        provinsi:[],
        idProvinsi:'',
        city:[],
        idCity:'',
        kecamatan:[],
        idKecamatan:'',
        detailKecamatan:[],
        cost:[],
        listCost:[],
        indexs:99,
        pickCost:[],

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
            utc: 'timezone/utc',
        }),
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setSellertId: 'product/setSeller',
            setProductId: 'product/setProduct',
        }),
        async getDataProdukKhusus(){
            var params = new URLSearchParams();

            params.append("id_user", this.DataUser.id_user);
            params.append("id_khusus", this.$route.query.id);

            var request = {
                params: params,
                headers: { Authorization: this.DataToken }
            };
            await this.$axios
                .get('/produk/v1/khusus/getkhusus', request)
                .then((response) => {
                    // this.listIklan = response.data.data[0]
                    this.dataKhusus = response.data.data[0]
                    console.log('dataKhusus', this.dataKhusus)
                })
                .catch((error) => {
                    let responses = error.response.data
                    console.log(responses.api_message)
                })
        },
        async goPesan(){
            this.totalPembayaran = this.dataKhusus.harga_khusus
            this.dialogPesanKhusus = true
        },
        async getProfil(){
            var params = new URLSearchParams();
            params.append("id_user", this.DataUser.id_user);
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
        async goProduk(id,name){
            this.$router.push(
                '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
            )
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
            params.append("weight", this.dataKhusus.berat_khusus);
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
            this.hitungHarga()
        },
        async hitungPPN(){
            if (this.ppn == true) {
                this.nilaiPPN = 0
                this.nilaiPPN = this.dataKhusus.harga_khusus*0.1
            }else{
                this.nilaiPPN = 0
            }
            this.hitungHarga()
        },
        async hitungHarga(){
            this.totalPembayaran = 0
            this.totalPembayaran = this.biayaPengiriman + this.dataKhusus.harga_khusus + this.nilaiPPN
        },
        async buatPesanan(){
            if (this.ppn == true) {
                if (this.profil == undefined) {
                    this.akunProfile = true
                } else {
                    this.cekInv()
                }
            } else {
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
            for (let i = 0; i < this.dataKhusus.produk_khusus.length; i++) {
                let formData = new FormData()
        
                formData.append('no_inv', this.nomorInvoice)
                formData.append('id_produk', this.dataKhusus.produk_khusus[i].id_produk)
                formData.append('kuantitas', this.dataKhusus.produk_khusus[i].kuantitas)
                formData.append('harga', this.dataKhusus.produk_khusus[i].harga)
                formData.append('berat', this.dataKhusus.produk_khusus[i].kuantitas*this.dataKhusus.produk_khusus[i].produk[0].berat_produk)
                formData.append('id_user', this.DataUser.id_user)
        
                await this.$axios
                .post('/keranjang/v1/pesanan/create', formData, {
                    headers: { Authorization: this.DataToken }
                })
                .then((response) => {
                    console.log(response)
                    
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
            this.postInvoice()
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
                formData.append('id_user', this.DataUser.id_user)
                formData.append('total', this.dataKhusus.harga_khusus)
                if (this.ppn == true) {
                    formData.append('ppn', 'Y')
                    formData.append('nilai_ppn', this.nilaiPPN)
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
                    this.dialogPesanKhusus = false
                    this.goPesanan()
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
        async goPesanan(){
            this.$router.push('/account/profile/pesanan')
        },
    },
    async created(){
        this.DataToken = this.$cookies.get("token");
        this.DataUser = this.$cookies.get("user");
        this.getDataProdukKhusus()
        this.getProvinsi()
        this.getProfil()
    },
}
</script>

<style>
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