<template>
  <div >
      <div ref="testHtml">
          <v-container style="height:1350px;width:90%" v-if="listInv.length > 0">
              <center>
              <img style="width:100%"  :src="listInv[0].ppn == 'Y' ? '/img/gspppn.PNG' : '/img/gspnoppn.PNG'" alt=""></center>
              <h2 v-if="listInv[0].ppn == 'Y'" style="color:red;text-align:right;margin-right:10px">INVOICE</h2>
              <v-row :style="listInv[0].ppn == 'Y' ? '' : 'margin-top:10px'">
                  <v-col cols="12" sm="8">
                      <div style="font-weight:bold">
                            Kepada Yth. <br>
                            <div v-if="listUser.length == 0">
                                {{ profil.nama }} <br>
                                {{ profil.alamat }}
                            </div>
                            <div v-if="listUser.length > 0">
                                {{ listUser[0].nama }} <br>
                                {{ listInv[0].detail_alamat }}
                            </div>
                            <br><br>
                            Up : Accounting
                            <br><br>
                        </div>
                        <div>Bersama ini disampaikan tagihan atas pekerjaan sebagai berikut</div>
                  </v-col>
                  <v-col cols="12" sm="4">
                      <div style="text-align:right;margin-right:10px">
                          No. {{ listInv[0].no_inv }} <br>
                          PO No : POVE-01670-1221
                      </div>
                  </v-col>
              </v-row>
              <table style="width:100%;border-collapse:collapse;font-weight:bold">
                  <tr style="text-align:center">
                      <td style="border:1px solid black">No</td>
                      <td style="border:1px solid black">URAIAN PEKERJAAN</td>
                      <td style="border:1px solid black">Qty</td>
                      <td style="border:1px solid black">Satuan</td>
                      <td style="border:1px solid black">Harga</td>
                  </tr>
                  <!-- <tr style="position:absolute" v-if="listInv[0].id_status_pembayaran == 2">
                      <td colspan="5">
                          <img style="width:85%;opacity:0.2;padding-top:40px;padding-left:30px" src="/img/lunasinv.png" alt="">
                      </td>
                  </tr> -->
                  <tr style="text-align:center;height:500px;vertical-align:top">
                      <td style="border-right:1px solid black;border-left:1px solid black">
                          <div v-for="(item,index) in listInv[0].pesanan" :key="index">
                              <div>{{index+1}}</div>
                          </div>
                      </td>
                      <td style="text-align:left;padding-left:5px;border-right:1px solid black;border-left:1px solid black">
                          <div v-for="(item,index) in listInv[0].pesanan" :key="index">
                              <div>{{ item.nama_produk }}</div>
                          </div>
                      </td>
                      <td style="border-right:1px solid black;border-left:1px solid black">
                          <div v-for="(item,index) in listInv[0].pesanan" :key="index">
                              <div>{{item.kuantitas}}</div>
                          </div>
                      </td>
                      <td style="border-right:1px solid black;border-left:1px solid black">
                          <div v-for="(item,index) in listInv[0].pesanan" :key="index">
                              <div>unit</div>
                          </div>
                      </td>
                      <td style="text-align:left;padding-left:10px;border-right:1px solid black;border-left:1px solid black">
                          <div v-for="(item,index) in listInv[0].pesanan" :key="index">
                              <div>Rp. {{ Number(item.harga).toLocaleString('id-ID') }}</div>
                          </div>
                      </td>
                  </tr>
                  <tr style="text-align:left">
                      <td colspan="4" style="padding-left:70px;border:1px solid black">
                          <div>
                              <div>Total</div>
                              <div v-if="listInv[0].ppn == 'Y'">PPN 10%</div>
                              <div>Ongkos Kirim</div>
                              <div>Jumlah Pembayaran</div>
                          </div>
                      </td>
                      <td style="text-align:left;padding-left:10px;border:1px solid black">
                          <div>
                              <div>Rp. {{ Number(listInv[0].total).toLocaleString('id-ID') }}</div>
                              <div v-if="listInv[0].ppn == 'Y'">Rp. {{ Number(listInv[0].nilai_ppn).toLocaleString('id-ID') }}</div>
                              <div>Rp. {{ Number(listInv[0].ongkos_kirim).toLocaleString('id-ID') }}</div>
                              <div>Rp. {{ Number(listInv[0].jumlah_pembayaran).toLocaleString('id-ID') }}</div>
                          </div>
                      </td>
                  </tr>
                  <tr style="text-align:left">
                      <td colspan="5" style="border:1px solid black;padding-left:70px">
                          <div>Terbilang : &nbsp;&nbsp;&nbsp;&nbsp;{{ terbilang }} Rupiah</div>
                      </td>
                  </tr>
                  <tr style="text-align:left">
                      <td colspan="5" style="border:1px solid black;padding-left:70px">
                          <v-row>
                              <v-col cols="12" sm="8">
                                  <br>
                                  Atas Kerjasamanya kami ucapkan Terima Kasih. <br>
                                  Note: Transfer before delivery
                                  <br><br><br><br>
                                  Pembayaran dapat ditransfer ke no rekening: <br>
                                  <table>
                                      <tr>
                                          <td>Bank</td>
                                          <td style="padding-left:15px">:</td>
                                          <td style="padding-left:15px">BCA - KCP Bekasi</td>
                                      </tr>
                                      <tr>
                                          <td>No. Rek</td>
                                          <td style="padding-left:15px">:</td>
                                          <td style="padding-left:15px">
                                              <div v-if="listInv[0].ppn == 'Y'">
                                                  8850901717
                                              </div>
                                              <div v-else>
                                                  2301266288
                                              </div>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>Atas Nama</td>
                                          <td style="padding-left:15px">:</td>
                                          <td style="padding-left:15px">
                                              <div v-if="listInv[0].ppn == 'Y'">
                                                  PT. Bangun Griya Kencana
                                              </div>
                                              <div v-else>
                                                  Aji Sukari
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                              </v-col>
                              <v-col cols="12" sm="4">
                                  <div style="text-align:center">
                                    <br>
                                    07 Desember 2021 <br>
                                    <img v-if="listInv[0].id_status_pembayaran == 2" src="img/lunasinv.png" style="margin-top:75px;margin-left:-40px;width:110px;position:absolute" alt="">
                                    <img  src="img/gspttd.jpeg" alt=""><br>
                                    ( Aisyah )
                                  </div>
                              </v-col>
                          </v-row>
                          <br>
                      </td>
                  </tr>
              </table>
          </v-container>
      </div>
      <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn color="#20929D" @click="print()">Print</v-btn>
      </v-card-actions>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import angkaTerbilang from '@develoka/angka-terbilang-js';
// import Vue from 'vue'
// Vue.component(jsPDF)
export default {
    data: () => ({
        listTables:[
            {
                no:1,
                nama:'andri',
                kelas:'11'
            },
            {
                no:2,
                nama:'agus',
                kelas:'12'
            },
            {
                no:1,
                nama:'zahra',
                kelas:'13'
            },
        ],
        headers: [
            { text: "no", value: "no" },
            { text: "Nama", value: "nama" },
            { text: "Kelas", value: "kelas" },
        ],
        listInv:[],
        listUser:[],
        profil:[],
        terbilang:'',
    }),
    methods: {
        async print(){
            var doc = new jsPDF('p', 'px', [1240,1410]);
            let margins = {
                    top: 80,
                    bottom: 60,
                    left: 40,
                    width: 522
                };
            
            // doc.html(this.$refs.testHtml, 40, 80,{
            //     'width' : 522
            // });
            var nama = this.listInv[0].no_inv+'.pdf'
            // doc.save('test.pdf');
            doc.html(this.$refs.testHtml, {
                margin:[20,15,20,15],
                callback: function(doc) {
                    doc.save(nama);
                },
                x: 10,
                y: 10,
            });
        },
        async getInv(){
            var params = new URLSearchParams();
            
            params.append("no_inv", this.$route.query.id);

            var request = {
                params: params,
                headers: { Authorization: this.DataToken }
            };
            await this.$axios
                .get("/keranjang/v1/invoice/getinvoice", request)
                .then(response => {
                    this.listInv = response.data.data
                    console.log('inv', this.listInv)
                    this.terbilang = angkaTerbilang(this.listInv[0].jumlah_pembayaran)
                    if (this.listInv[0].ppn == 'Y') {
                        this.getProfil(this.listInv[0].id_user)                        
                    }else{
                        this.getUser(this.listInv[0].id_user)
                    }
                })
                .catch(error => {
                console.log(error.response.data.api_message);
                });
        },
        async getProfil(id_user){
            var params = new URLSearchParams();
            params.append("id_user", id_user);
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
        async getUser(user){
            var params = new URLSearchParams();
            
            params.append("id_user", user);

            var request = {
                params: params,
                headers: { Authorization: this.DataToken }
            };
            await this.$axios
                .get("/user/v1/user/getuser", request)
                .then(response => {
                    this.listUser = response.data.data
                    console.log('listUser', this.listUser)
                })
                .catch(error => {
                console.log(error.response.data.api_message);
                });
        },
    },
    async created(){
        this.DataToken = this.$cookies.get("token");
        console.log('rote', this.$route)
        await this.getInv()
    },
}
</script>

<style>

</style>