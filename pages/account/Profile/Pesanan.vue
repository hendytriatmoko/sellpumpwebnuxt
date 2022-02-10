<template>
  <div>
    <v-card
      elevation="1"
      outlined>
      <v-tabs
        v-model="tab"
        align-with-title
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab
          v-for="(item,index) in items"
          :key="index"
        >
          <span>
            <v-icon
              medium
              :color="item.color"
            >
              {{ item.icon }}
            </v-icon> {{ item.name }}
          </span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
          <!-- waitingpayment -->
          <v-tab-item>
            <v-container v-if="user.status == 'pembeli'">
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 1 && item.id_user == user.id_user"
                    >
                        <div class="mx-2 pt-3">
                            <h4>No Invoice : {{ item.no_inv }}</h4>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" >
                                <tr>
                                    <td class="pl-3">
                                        <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                        <h4>Detail Pengiriman</h4>
                                        <h4>Detail Invoice</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4 v-if="item.pesan_pembeli != ''">
                                            {{ item.pesan_pembeli }}
                                        </h4>
                                        <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn><br>
                                        <v-btn x-small @click="toPrint(item)">Print</v-btn>
                                    </td>
                                </tr>
                            </table>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="dark" class="red--text" @click="bayarInv(item,'batalkan')">Batalkan Pembelian</v-btn>
                                <v-btn color="#20929D" class="white--text" @click="bayarInv(item,'bayar')">Bayar Sekarang</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </div>
            </v-container>
            <v-container v-else>
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 1"
                    >
                        <div class="mx-2 pt-3">
                            <h4>No Invoice : {{ item.no_inv }}</h4>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" >
                                <tr>
                                    <td class="pl-3">
                                        <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                        <h4>Detail Pengiriman</h4>
                                        <h4>Detail Invoice</h4>
                                        <h4>Detail Pembeli</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4 v-if="item.pesan_pembeli != ''">
                                            {{ item.pesan_pembeli }}
                                        </h4>
                                        <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn><br>
                                        <v-btn x-small @click="toPrint(item)">Print</v-btn><br>
                                        <v-btn x-small @click="goDetailUser(item.id_user)">Lihat</v-btn>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                </div>
            </v-container>
          </v-tab-item>
          <!-- waitingverification -->
          <v-tab-item >
            <v-container v-if="user.status == 'pembeli'">
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 4 && item.id_user == user.id_user"
                    >
                        <div class="mx-2 pt-3">
                            <table style="width:100%">
                                <tr>
                                    <td class="pl-3">
                                        <h4>No Invoice : {{ item.no_inv }}</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>Tanggal Pembayaran : 
                                            {{
                                            moment
                                                .utc(item.tgl_pembayaran)
                                                .add(utc, 'h')
                                                .format('DD MMM YYYY, HH:mm')
                                            }}
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                        <h4>Bukti Pembayaran</h4>
                                        <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                        <h4>Detail Pengiriman</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <div v-viewer="{ movable: false }">
                                            <img
                                                :src="getImageProduk(item.bukti_bayar)"
                                                contain
                                                class="mx-2"
                                                width="50px"
                                            />
                                        </div>
                                        <h4 v-if="item.pesan_pembeli != ''">{{item.pesan_pembeli}}</h4>
                                        <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                </div>
            </v-container>
            <v-container v-else>
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 4"
                    >
                        <div class="mx-2 pt-3">
                            <table style="width:100%">
                                <tr>
                                    <td class="pl-3">
                                        <h4>No Invoice : {{ item.no_inv }}</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>Tanggal Pembayaran : 
                                            {{
                                            moment
                                                .utc(item.tgl_pembayaran)
                                                .add(utc, 'h')
                                                .format('DD MMM YYYY, HH:mm')
                                            }}
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                        <h4>Bukti Pembayaran</h4>
                                        <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                        <h4>Detail Pengiriman</h4>
                                        <h4>Detail Pembeli</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <div v-viewer="{ movable: false }">
                                            <img
                                                :src="getImageProduk(item.bukti_bayar)"
                                                contain
                                                class="mx-2"
                                                width="50px"
                                            />
                                        </div>
                                        <h4 v-if="item.pesan_pembeli != ''">{{item.pesan_pembeli}}</h4>
                                        <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn><br>
                                        <v-btn x-small @click="goDetailUser(item.id_user)">Lihat</v-btn>
                                    </td>
                                </tr>
                            </table>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="#20929D" class="white--text" @click="bayarInv(item,'verifikasi')">Verifikasi</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </div>
            </v-container>
          </v-tab-item>
          <!-- cancelpembeli -->
          <v-tab-item >
            <v-container>
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 3 && item.id_user == user.id_user"
                    >
                        <div class="mx-2 pt-3">
                            <h4>No Invoice : {{ item.no_inv }}</h4>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                        <h4>Alasan Dibatalkan</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>{{item.alasan_ditolak}}</h4>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                </div>
            </v-container>
          </v-tab-item>
          <!-- cancelpenjual -->
          <v-tab-item >
            <v-container>
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 5 && item.id_user == user.id_user"
                    >
                        <div class="mx-2 pt-3">
                            <table style="width:100%">
                                <tr>
                                    <td class="pl-3">
                                        <h4>No Invoice : {{ item.no_inv }}</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>Tanggal Pembayaran : 
                                            {{
                                            moment
                                                .utc(item.tgl_pembayaran)
                                                .add(utc, 'h')
                                                .format('DD MMM YYYY, HH:mm')
                                            }}
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                        <h4>Alasan Dibatalkan</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>{{item.alasan_ditolak}}</h4>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                </div>
            </v-container>
          </v-tab-item>
          <!-- tolakpembayaran -->
          <v-tab-item >
            <v-container v-if="user.status =='pembeli'">
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 6 && item.id_user == user.id_user"
                    >
                        <div class="mx-2 pt-3">
                            <table style="width:100%">
                                <tr>
                                    <td class="pl-3">
                                        <h4>No Invoice : {{ item.no_inv }}</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>Tanggal Pembayaran : 
                                            {{
                                            moment
                                                .utc(item.tgl_pembayaran)
                                                .add(utc, 'h')
                                                .format('DD MMM YYYY, HH:mm')
                                            }}
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                        <h4>Alasan Ditolak</h4>
                                        <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                        <h4>Detail Pengiriman</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>{{item.alasan_ditolak}}</h4>
                                        <h4 v-if="item.pesan_pembeli != ''">
                                            {{ item.pesan_pembeli }}
                                        </h4>
                                        <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn>
                                    </td>
                                </tr>
                            </table>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="#20929D" class="white--text" @click="bayarInv(item,'bayar')">Reupload Pembayaran</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </div>
            </v-container>
            <v-container v-else>
                <div
                    v-for="item in listInv"
                    :key="item.no_inv"
                    class="mb-2"
                >                
                    <v-card
                        elevation="6"
                        v-if="item.id_status_pembayaran == 6"
                    >
                        <div class="mx-2 pt-3">
                            <table style="width:100%">
                                <tr>
                                    <td class="pl-3">
                                        <h4>No Invoice : {{ item.no_inv }}</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>Tanggal Pembayaran : 
                                            {{
                                            moment
                                                .utc(item.tgl_pembayaran)
                                                .add(utc, 'h')
                                                .format('DD MMM YYYY, HH:mm')
                                            }}
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <div
                                v-for="(data,index) in item.pesanan"
                                :key="index"
                            >
                                <table style="width:100%">
                                    <tr>
                                        <td>
                                            <center>
                                            <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                            </center>
                                        </td>
                                        <td>
                                            <h3>{{data.nama_produk}}</h3>
                                            <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                            <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                            <h3>
                                                Rp
                                                {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                            </h3>
                                        </td>
                                        <td class="text-right pr-4" style="width:50px">
                                            <div>X {{data.kuantitas}}</div>
                                        </td>
                                    </tr>
                                </table>
                                <v-divider></v-divider>
                                
                            </div>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                    <h4>Subtotal untuk Produk</h4>
                                    <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                    <h4>Subtotal untuk Pengiriman</h4>
                                    <h2 class="red--text">Total Pembayaran</h2>
                                    </td>
                                    <td class="text-right pr-6">
                                    <div>
                                        Rp
                                        {{ Number(item.total).toLocaleString('id-ID') }}
                                    </div>
                                    <div v-if="item.ppn=='Y'">
                                        Rp
                                        {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                    </div>
                                    <div>
                                        Rp
                                        {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                    </div>
                                    <h3 class="red--text">
                                        Rp
                                        {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                    </h3>
                                    </td>
                                </tr>
                            </table>
                            <v-divider></v-divider>
                            <table style="width:100%" class="pt-2">
                                <tr>
                                    <td class="pl-3">
                                        <h4>Alasan Ditolak</h4>
                                        <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                        <h4>Detail Pengiriman</h4>
                                        <h4>Detail Pembeli</h4>
                                    </td>
                                    <td class="text-right pr-6">
                                        <h4>{{item.alasan_ditolak}}</h4>
                                        <h4 v-if="item.pesan_pembeli != ''">
                                            {{ item.pesan_pembeli }}
                                        </h4>
                                        <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn><br>
                                        <v-btn x-small @click="goDetailUser(item.id_user)">Lihat</v-btn>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                </div>
            </v-container>
          </v-tab-item>
          <!-- lunas -->
          <v-tab-item>
              <br>
              <v-tabs align-with-title v-model="tabLunas">
                    <v-tabs-slider color="blue"></v-tabs-slider>
                    <v-tab
                    v-for="(item,index) in pengirimanLunas"
                    :key="index"
                    >
                    <span>
                        <v-icon
                        medium
                        :color="item.color"
                        >
                        {{ item.icon }}
                        </v-icon> {{ item.name }}
                    </span>
                    </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabLunas">
                  <!-- dikemas -->
                  <v-tab-item>
                    <v-container v-if="user.status == 'pembeli'">
                        <div
                            v-for="item in listInv"
                            :key="item.no_inv"
                            class="mb-2"
                        >                
                            <v-card
                                elevation="6"
                                v-if="item.id_status_pembayaran == 2 && item.id_status_pengiriman == 1 && item.id_user == user.id_user"
                            >
                                <div class="mx-2 pt-3">
                                    <table style="width:100%">
                                        <tr>
                                            <td class="pl-3">
                                                <h4>No Invoice : {{ item.no_inv }}</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4>Tanggal Pembayaran : 
                                                    {{
                                                    moment
                                                        .utc(item.tgl_pembayaran)
                                                        .add(utc, 'h')
                                                        .format('DD MMM YYYY, HH:mm')
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <div
                                        v-for="(data,index) in item.pesanan"
                                        :key="index"
                                    >
                                        <table style="width:100%">
                                            <tr>
                                                <td>
                                                    <center>
                                                    <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                                    </center>
                                                </td>
                                                <td>
                                                    <h3>{{data.nama_produk}}</h3>
                                                    <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                                    <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                                    <h3>
                                                        Rp
                                                        {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                                    </h3>
                                                </td>
                                                <td class="text-right pr-4" style="width:50px">
                                                    <div>X {{data.kuantitas}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <v-divider></v-divider>
                                        
                                    </div>
                                    <table style="width:100%" class="pt-2">
                                        <tr>
                                            <td class="pl-3">
                                            <h4>Subtotal untuk Produk</h4>
                                            <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                            <h4>Subtotal untuk Pengiriman</h4>
                                            <h2 class="red--text">Total Pembayaran</h2>
                                            </td>
                                            <td class="text-right pr-6">
                                            <div>
                                                Rp
                                                {{ Number(item.total).toLocaleString('id-ID') }}
                                            </div>
                                            <div v-if="item.ppn=='Y'">
                                                Rp
                                                {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                            </div>
                                            <div>
                                                Rp
                                                {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                            </div>
                                            <h3 class="red--text">
                                                Rp
                                                {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                            </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <table style="width:100%" >
                                        <tr>
                                            <td class="pl-3">
                                                <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                                <h4>Detail Pengiriman</h4>
                                                <h4>Detail Invoice</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4 v-if="item.pesan_pembeli != ''">
                                                    {{ item.pesan_pembeli }}
                                                </h4>
                                                <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn><br>
                                                <v-btn x-small @click="toPrint(item)">Print</v-btn>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </v-card>
                        </div>
                    </v-container>
                    <v-container v-else>
                        <div
                            v-for="item in listInv"
                            :key="item.no_inv"
                            class="mb-2"
                        >                
                            <v-card
                                elevation="6"
                                v-if="item.id_status_pembayaran == 2 && item.id_status_pengiriman == 1"
                            >
                                <div class="mx-2 pt-3">
                                    <table style="width:100%">
                                        <tr>
                                            <td class="pl-3">
                                                <h4>No Invoice : {{ item.no_inv }}</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4>Tanggal Pembayaran : 
                                                    {{
                                                    moment
                                                        .utc(item.tgl_pembayaran)
                                                        .add(utc, 'h')
                                                        .format('DD MMM YYYY, HH:mm')
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <div
                                        v-for="(data,index) in item.pesanan"
                                        :key="index"
                                    >
                                        <table style="width:100%">
                                            <tr>
                                                <td>
                                                    <center>
                                                    <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                                    </center>
                                                </td>
                                                <td>
                                                    <h3>{{data.nama_produk}}</h3>
                                                    <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                                    <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                                    <h3>
                                                        Rp
                                                        {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                                    </h3>
                                                </td>
                                                <td class="text-right pr-4" style="width:50px">
                                                    <div>X {{data.kuantitas}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <v-divider></v-divider>
                                        
                                    </div>
                                    <table style="width:100%" class="pt-2">
                                        <tr>
                                            <td class="pl-3">
                                            <h4>Subtotal untuk Produk</h4>
                                            <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                            <h4>Subtotal untuk Pengiriman</h4>
                                            <h2 class="red--text">Total Pembayaran</h2>
                                            </td>
                                            <td class="text-right pr-6">
                                            <div>
                                                Rp
                                                {{ Number(item.total).toLocaleString('id-ID') }}
                                            </div>
                                            <div v-if="item.ppn=='Y'">
                                                Rp
                                                {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                            </div>
                                            <div>
                                                Rp
                                                {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                            </div>
                                            <h3 class="red--text">
                                                Rp
                                                {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                            </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <table style="width:100%" >
                                        <tr>
                                            <td class="pl-3">
                                                <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                                <h4>Detail Pengiriman</h4>
                                                <h4>Detail Invoice</h4>
                                                <h4>Detail Pembeli</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4 v-if="item.pesan_pembeli != ''">
                                                    {{ item.pesan_pembeli }}
                                                </h4>
                                                <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn><br>
                                                <v-btn x-small @click="toPrint(item)">Print</v-btn><br>
                                                <v-btn x-small @click="goDetailUser(item.id_user)">Lihat</v-btn>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="#20929D" class="white--text" @click="bayarInv(item,'resi')">Input Resi</v-btn>
                                        
                                    </v-card-actions>
                                </div>
                            </v-card>
                        </div>
                    </v-container>
                  </v-tab-item>
                  <!-- dikirim -->
                  <v-tab-item >
                    <v-container v-if="user.status == 'pembeli'">
                        <div
                            v-for="item in listInv"
                            :key="item.no_inv"
                            class="mb-2"
                        >                
                            <v-card
                                elevation="6"
                                v-if="item.id_status_pembayaran == 2 && item.id_status_pengiriman == 2 && item.id_user == user.id_user"
                            >
                                <div class="mx-2 pt-3">
                                    <table style="width:100%">
                                        <tr>
                                            <td class="pl-3">
                                                <h4>No Invoice : {{ item.no_inv }}</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4>Tanggal Pembayaran : 
                                                    {{
                                                    moment
                                                        .utc(item.tgl_pembayaran)
                                                        .add(utc, 'h')
                                                        .format('DD MMM YYYY, HH:mm')
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <div
                                        v-for="(data,index) in item.pesanan"
                                        :key="index"
                                    >
                                        <table style="width:100%">
                                            <tr>
                                                <td>
                                                    <center>
                                                    <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                                    </center>
                                                </td>
                                                <td>
                                                    <h3>{{data.nama_produk}}</h3>
                                                    <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                                    <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                                    <h3>
                                                        Rp
                                                        {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                                    </h3>
                                                </td>
                                                <td class="text-right pr-4" style="width:50px">
                                                    <div>X {{data.kuantitas}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <v-divider></v-divider>
                                        
                                    </div>
                                    <table style="width:100%" class="pt-2">
                                        <tr>
                                            <td class="pl-3">
                                            <h4>Subtotal untuk Produk</h4>
                                            <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                            <h4>Subtotal untuk Pengiriman</h4>
                                            <h2 class="red--text">Total Pembayaran</h2>
                                            </td>
                                            <td class="text-right pr-6">
                                            <div>
                                                Rp
                                                {{ Number(item.total).toLocaleString('id-ID') }}
                                            </div>
                                            <div v-if="item.ppn=='Y'">
                                                Rp
                                                {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                            </div>
                                            <div>
                                                Rp
                                                {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                            </div>
                                            <h3 class="red--text">
                                                Rp
                                                {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                            </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <table style="width:100%" >
                                        <tr>
                                            <td class="pl-3">
                                                <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                                <h4>Detail Pengiriman</h4>
                                                <h4>Detail Invoice</h4>
                                                <h4>No Resi</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4 v-if="item.pesan_pembeli != ''">
                                                    {{ item.pesan_pembeli }}
                                                </h4>
                                                <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn>
                                                <br><v-btn x-small @click="toPrint(item)">Print</v-btn>
                                                <h4>{{item.no_resi}}</h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="#20929D" class="white--text" @click="bayarInv(item,'sampai')">Verifikasi sampai</v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>
                        </div>
                    </v-container>
                    <v-container v-else>
                        <div
                            v-for="item in listInv"
                            :key="item.no_inv"
                            class="mb-2"
                        >                
                            <v-card
                                elevation="6"
                                v-if="item.id_status_pembayaran == 2 && item.id_status_pengiriman == 2"
                            >
                                <div class="mx-2 pt-3">
                                    <table style="width:100%">
                                        <tr>
                                            <td class="pl-3">
                                                <h4>No Invoice : {{ item.no_inv }}</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4>Tanggal Pembayaran : 
                                                    {{
                                                    moment
                                                        .utc(item.tgl_pembayaran)
                                                        .add(utc, 'h')
                                                        .format('DD MMM YYYY, HH:mm')
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <div
                                        v-for="(data,index) in item.pesanan"
                                        :key="index"
                                    >
                                        <table style="width:100%">
                                            <tr>
                                                <td>
                                                    <center>
                                                    <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                                    </center>
                                                </td>
                                                <td>
                                                    <h3>{{data.nama_produk}}</h3>
                                                    <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                                    <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                                    <h3>
                                                        Rp
                                                        {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                                    </h3>
                                                </td>
                                                <td class="text-right pr-4" style="width:50px">
                                                    <div>X {{data.kuantitas}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <v-divider></v-divider>
                                        
                                    </div>
                                    <table style="width:100%" class="pt-2">
                                        <tr>
                                            <td class="pl-3">
                                            <h4>Subtotal untuk Produk</h4>
                                            <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                            <h4>Subtotal untuk Pengiriman</h4>
                                            <h2 class="red--text">Total Pembayaran</h2>
                                            </td>
                                            <td class="text-right pr-6">
                                            <div>
                                                Rp
                                                {{ Number(item.total).toLocaleString('id-ID') }}
                                            </div>
                                            <div v-if="item.ppn=='Y'">
                                                Rp
                                                {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                            </div>
                                            <div>
                                                Rp
                                                {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                            </div>
                                            <h3 class="red--text">
                                                Rp
                                                {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                            </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <table style="width:100%" >
                                        <tr>
                                            <td class="pl-3">
                                                <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                                <h4>Detail Pengiriman</h4>
                                                <h4>Detail Invoice</h4>
                                                <h4>Detail Pembeli</h4>
                                                <h4>No Resi</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4 v-if="item.pesan_pembeli != ''">
                                                    {{ item.pesan_pembeli }}
                                                </h4>
                                                <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn>
                                                <br><v-btn x-small @click="toPrint(item)">Print</v-btn><br>
                                                <v-btn x-small @click="goDetailUser(item.id_user)">Lihat</v-btn>
                                                <h4>{{item.no_resi}}</h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="#20929D" class="white--text" @click="bayarInv(item,'sampai')">Verifikasi sampai</v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>
                        </div>
                    </v-container>
                  </v-tab-item>
                  <!-- selesai -->
                  <v-tab-item>
                      <v-container v-if="user.status == 'pembeli'">
                        <div
                            v-for="item in listInv"
                            :key="item.no_inv"
                            class="mb-2"
                        >                
                            <v-card
                                elevation="6"
                                v-if="item.id_status_pembayaran == 2 && item.id_status_pengiriman == 3 && item.id_user == user.id_user"
                            >
                                <div class="mx-2 pt-3">
                                    <table style="width:100%">
                                        <tr>
                                            <td class="pl-3">
                                                <h4>No Invoice : {{ item.no_inv }}</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4>Tanggal Pembayaran : 
                                                    {{
                                                    moment
                                                        .utc(item.tgl_pembayaran)
                                                        .add(utc, 'h')
                                                        .format('DD MMM YYYY, HH:mm')
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <div
                                        v-for="(data,index) in item.pesanan"
                                        :key="index"
                                    >
                                        <table style="width:100%">
                                            <tr>
                                                <td>
                                                    <center>
                                                    <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                                    </center>
                                                </td>
                                                <td>
                                                    <h3>{{data.nama_produk}}</h3>
                                                    <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                                    <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                                    <h3>
                                                        Rp
                                                        {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                                    </h3>
                                                </td>
                                                <td class="text-right pr-4" style="width:50px">
                                                    <div>X {{data.kuantitas}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <v-divider></v-divider>
                                        
                                    </div>
                                    <table style="width:100%" class="pt-2">
                                        <tr>
                                            <td class="pl-3">
                                            <h4>Subtotal untuk Produk</h4>
                                            <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                            <h4>Subtotal untuk Pengiriman</h4>
                                            <h2 class="red--text">Total Pembayaran</h2>
                                            </td>
                                            <td class="text-right pr-6">
                                            <div>
                                                Rp
                                                {{ Number(item.total).toLocaleString('id-ID') }}
                                            </div>
                                            <div v-if="item.ppn=='Y'">
                                                Rp
                                                {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                            </div>
                                            <div>
                                                Rp
                                                {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                            </div>
                                            <h3 class="red--text">
                                                Rp
                                                {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                            </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <table style="width:100%" >
                                        <tr>
                                            <td class="pl-3">
                                                <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                                <h4>Detail Pengiriman</h4>
                                                <h4>Detail Invoice</h4>
                                                <h4>No Resi</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4 v-if="item.pesan_pembeli != ''">
                                                    {{ item.pesan_pembeli }}
                                                </h4>
                                                <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn>
                                                <br><v-btn x-small @click="toPrint(item)">Print</v-btn>
                                                <h4>{{item.no_resi}}</h4>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </v-card>
                        </div>
                      </v-container>
                      <v-container v-else>
                        <div
                            v-for="item in listInv"
                            :key="item.no_inv"
                            class="mb-2"
                        >                
                            <v-card
                                elevation="6"
                                v-if="item.id_status_pembayaran == 2 && item.id_status_pengiriman == 3"
                            >
                                <div class="mx-2 pt-3">
                                    <table style="width:100%">
                                        <tr>
                                            <td class="pl-3">
                                                <h4>No Invoice : {{ item.no_inv }}</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4>Tanggal Pembayaran : 
                                                    {{
                                                    moment
                                                        .utc(item.tgl_pembayaran)
                                                        .add(utc, 'h')
                                                        .format('DD MMM YYYY, HH:mm')
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <div
                                        v-for="(data,index) in item.pesanan"
                                        :key="index"
                                    >
                                        <table style="width:100%">
                                            <tr>
                                                <td>
                                                    <center>
                                                    <v-img :src="getImageProduk(data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                                                    </center>
                                                </td>
                                                <td>
                                                    <h3>{{data.nama_produk}}</h3>
                                                    <h5 v-if="data.deskripsi_produk.length < 80">{{data.deskripsi_produk}}</h5>
                                                    <h5 v-else>{{data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                                                    <h3>
                                                        Rp
                                                        {{ Number(data.harga_produk).toLocaleString('id-ID') }}
                                                    </h3>
                                                </td>
                                                <td class="text-right pr-4" style="width:50px">
                                                    <div>X {{data.kuantitas}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <v-divider></v-divider>
                                        
                                    </div>
                                    <table style="width:100%" class="pt-2">
                                        <tr>
                                            <td class="pl-3">
                                            <h4>Subtotal untuk Produk</h4>
                                            <h4 v-if="item.ppn=='Y'">PPN 10%</h4>
                                            <h4>Subtotal untuk Pengiriman</h4>
                                            <h2 class="red--text">Total Pembayaran</h2>
                                            </td>
                                            <td class="text-right pr-6">
                                            <div>
                                                Rp
                                                {{ Number(item.total).toLocaleString('id-ID') }}
                                            </div>
                                            <div v-if="item.ppn=='Y'">
                                                Rp
                                                {{ Number(item.nilai_ppn).toLocaleString('id-ID') }}
                                            </div>
                                            <div>
                                                Rp
                                                {{ Number(item.ongkos_kirim).toLocaleString('id-ID') }}
                                            </div>
                                            <h3 class="red--text">
                                                Rp
                                                {{ Number(item.jumlah_pembayaran).toLocaleString('id-ID') }}
                                            </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <v-divider></v-divider>
                                    <table style="width:100%" >
                                        <tr>
                                            <td class="pl-3">
                                                <h4 v-if="item.pesan_pembeli != ''">Pesan Pembeli</h4>
                                                <h4>Detail Pengiriman</h4>
                                                <h4>Detail Invoice</h4>
                                                <h4>Detail Pembeli</h4>
                                                <h4>No Resi</h4>
                                            </td>
                                            <td class="text-right pr-6">
                                                <h4 v-if="item.pesan_pembeli != ''">
                                                    {{ item.pesan_pembeli }}
                                                </h4>
                                                <v-btn x-small @click="bayarInv(item,'detail_pengiriman')">Lihat</v-btn>
                                                <br><v-btn x-small @click="toPrint(item)">Print</v-btn><br>
                                                <v-btn x-small @click="goDetailUser(item.id_user)">Lihat</v-btn>
                                                <h4>{{item.no_resi}}</h4>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </v-card>
                        </div>
                      </v-container>
                  </v-tab-item>
              </v-tabs-items>
          </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="buktiBayar" width="600px">
        <v-card>
            <v-toolbar flat dense color="#20929D">
            <v-toolbar-title><b>Menu Pembayaran</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="buktiBayar = false,xPembayaran()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>
            <br>
            <div class="mx-3">
                <v-expansion-panels>
                    <v-expansion-panel
                    >
                        <v-expansion-panel-header>
                            <b>Cara Pembayaran ?</b>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Pembayaran dapat dilakukan dengan cara berikut : <br>
                            1. Mentransfer uang sebesar <span class="red--text"> Rp {{ Number(itemInv.jumlah_pembayaran).toLocaleString('id-ID') }} </span>
                               ke rekening XXXXXXXXX <br>
                            2. Mengupload bukti pembayaran apabila sudah melakukan pembayaran pada kolom yang tersedia dibawah menu ini.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <br>
                <h3>Upload Bukti Pembayaran</h3>
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
                                    :src="item.previewUrl"
                                    contain
                                    :width="$vuetify.breakpoint.xsOnly ? 130 : 100"
                                    :height="$vuetify.breakpoint.xsOnly ? 130 : 100"
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
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="buktiBayar = false,xPembayaran()">Cancel</v-btn>
                <v-btn color="#20929D" class="white--text" @click="uploadBuktiBayar()" :disabled="list[0].foto == null ? true : false">Upload</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="verifikasiPembayaran" max-width="400px">
        <v-card>
            <v-toolbar flat dense color="#20929D">
            <v-toolbar-title><b>Menu Verifikasi</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="verifikasiPembayaran = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>
            <br>
            <div class="mx-3">
                <center>
                    <div v-viewer="{ movable: false }">
                        <img
                            :src="getImageProduk(itemInv.bukti_bayar)"
                            contain
                            class="mx-2"
                            width="100px"
                        />
                    </div>
                </center>
                <v-autocomplete
                    v-model="pickVerifikasiPembayaran"
                    :items="responVerifikasiPembayaran"
                    outlined
                    item-text="text"
                    item-value="id"
                    dense
                    class="mx-6"
                    label="Action"
                ></v-autocomplete>
                <v-text-field
                    v-model="alasanTolakBatalkan"
                    v-if="pickVerifikasiPembayaran == '5' || pickVerifikasiPembayaran == '6'"
                    class="mx-6"
                    dense
                    label="Alasan Tolak atau Dibatalkan"
                    outlined
                ></v-text-field>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="verifikasiPembayaran = false">Cancel</v-btn>
                <v-btn v-if="pickVerifikasiPembayaran == '5' || pickVerifikasiPembayaran == '6'" color="#20929D" class="white--text" @click="updateStatusVerifikasi()" :disabled="pickVerifikasiPembayaran == '' || alasanTolakBatalkan == ''">Verifikasi</v-btn>
                <v-btn v-else color="#20929D" class="white--text" @click="updateStatusVerifikasi()" :disabled="pickVerifikasiPembayaran == '' ? true : false">Verifikasi</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="batalkanPembelian" max-width="400px">
        <v-card>
            <v-toolbar flat dense color="#20929D">
            <v-toolbar-title><b>Batalkan Pembelian ?</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="batalkanPembelian = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>
            <br>
            <div class="mx-3">
                <v-text-field
                    v-model="alasanTolakBatalkan"
                    class="mx-4"
                    dense
                    label="Alasan Dibatalkan"
                    outlined
                ></v-text-field>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="batalkanPembelian = false">Cancel</v-btn>
                <v-btn color="#20929D" class="white--text" @click="membatalkanPembelian()" :disabled="alasanTolakBatalkan == '' ? true : false">Kirim</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="detailPengiriman" max-width="600px">
        <v-card>
            <v-toolbar flat dense color="#20929D">
            <v-toolbar-title><b>Detail Pengiriman</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="detailPengiriman = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>
            <br>
            <div class="mx-3">
                <table style="width:100%">
                    <tr>
                        <td>Detail Alamat</td>
                        <td>:</td>
                        <td class="pl-4">{{itemInv.detail_alamat}}</td>
                    </tr>
                    <tr>
                        <td>Nama Ekspedisi</td>
                        <td>:</td>
                        <td class="pl-4">{{itemInv.nama_ekspedisi}}</td>
                    </tr>
                    <tr>
                        <td>Layanan Ekspedisi</td>
                        <td>:</td>
                        <td class="pl-4">{{itemInv.layanan_ekspedisi}}</td>
                    </tr>
                    <tr>
                        <td>Estimasi Sampai (Hari)</td>
                        <td>:</td>
                        <td class="pl-4">{{itemInv.etd}}</td>
                    </tr>
                    <tr>
                        <td>Ongkos Kirim</td>
                        <td>:</td>
                        <td class="pl-4">Rp {{ Number(itemInv.ongkos_kirim).toLocaleString('id-ID') }}</td>
                    </tr>
                    <tr v-if="itemInv.pesan_pembeli != ''">
                        <td>Pesan Pembeli</td>
                        <td>:</td>
                        <td class="pl-4">{{itemInv.pesan_pembeli}}</td>
                    </tr>
                </table>
            </div>
            <br>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogResi" max-width="400px">
        <v-card>
            <v-toolbar flat dense color="#20929D">
            <v-toolbar-title><b>Nomor Resi Pengiriman</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogResi = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>
            <br>
            <div class="mx-3">
                <v-text-field
                    v-model="noResi"
                    class="mx-4"
                    dense
                    label="No Resi"
                    outlined
                ></v-text-field>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialogResi = false">Cancel</v-btn>
                <v-btn color="#20929D" class="white--text" @click="inputNoResi()" :disabled="noResi == '' ? true : false">Kirim</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSampai" max-width="400px">
        <v-card>
            <v-toolbar flat dense color="#20929D">
            <v-toolbar-title><b>Verifikasi barang telah sampai</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogSampai = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>
            <br>
            <div class="mx-3">Anda yakin untuk memverifikasi bahwa barang telah sampai?</div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialogSampai = false">Cancel</v-btn>
                <v-btn color="#20929D" class="white--text" @click="sampaiTujuan()">Ya</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

  export default {
    name: 'pesanan',
    data: () => ({
        tab: null,
        tabLunas:null,
        items: [
          { id: 1,color:'blue', name: 'Menunggu Pembayaran', icon: 'mdi-credit-card-clock-outline' },
          { id: 2,color:'orange', name: 'Sedang Diverifikasi', icon: 'mdi-timer-outline' },
          { id: 3,color:'dark', name: 'Dibatalkan Pembeli', icon: 'mdi-close-octagon' },
          { id: 4,color:'grey', name: 'Dibatalkan Penjual', icon: 'mdi-close-octagon' },
          { id: 5,color:'red', name: 'Pembayaran Ditolak', icon: 'mdi-close-octagon' },
          { id: 6,color:'green', name: 'Lunas', icon: 'mdi mdi-check-circle' },
        ],
        pengirimanLunas:[
            {id:1, color: 'blue', name:'Sedang Dikemas', icon : 'mdi-package-down'},
            {id:2, color: 'orange', name:'Dalam Pengiriman', icon : 'mdi-transit-connection-variant'},
            {id:3, color: 'green', name:'Selesai', icon : 'mdi-check-all'},
        ],
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
        buktiBayar:false,
        verifikasiPembayaran:false,
        dialogResi:false,
        dialogSampai : false,
        noResi:'',
        detailPengiriman: false,
        alasanTolakBatalkan:'',
        batalkanPembelian: false,
        text: [
          { id: 1, name: 'Pesanan', },
          { id: 1, name: 'Dipesan', },
        ],
        listInv:[],
        itemInv:[],
        responVerifikasiPembayaran:[
            {
                id:'2',
                text:'Setujui'
            },
            {
                id:'4',
                text:'Menunggu Persetujuan'
            },
            {
                id:'5',
                text:'Batalkan'
            },
            {
                id:'6',
                text:'Tolak'
            },
        ],
        pickVerifikasiPembayaran:'',
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
            setAuth: 'auth/set',
        }),
        setImage(file) {
            this.hasImage = true
            this.image = file
            this.onFileChange(file)
        },
        async updateStatusVerifikasi(){
            let formData = new FormData()
  
            formData.append('no_inv', this.itemInv.no_inv)
            formData.append('id_invoice', this.itemInv.id_invoice)
            formData.append('id_status_pembayaran', this.pickVerifikasiPembayaran)
            if (this.pickVerifikasiPembayaran == '5' || this.pickVerifikasiPembayaran == '6') {
                formData.append('alasan_ditolak', this.alasanTolakBatalkan)
            }
    
            await this.$axios
            .put('/keranjang/v1/invoice/update', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.verifikasiPembayaran = false
                this.getInv()
                this.setAlert({
                    status: true,
                    color: 'success',
                    text: 'Data Pembayaran di update',
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
        async membatalkanPembelian(){
            let formData = new FormData()
  
            formData.append('no_inv', this.itemInv.no_inv)
            formData.append('id_invoice', this.itemInv.id_invoice)
            formData.append('id_status_pembayaran', '3')
            formData.append('alasan_ditolak', this.alasanTolakBatalkan)
    
            await this.$axios
            .put('/keranjang/v1/invoice/update', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.batalkanPembelian = false
                this.getInv()
                this.setAlert({
                    status: true,
                    color: 'success',
                    text: 'Data Pembelian di update',
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
        async xPembayaran(){
            this.list= [
                {
                    id: 1,
                    foto: null,
                    previewUrl: '/img/icons/thumbnail/Photo.png',
                    label: 'Foto 1',
                    required: '*',
                }
            ]
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
        async getInv(){
            var params = new URLSearchParams();
            
            // params.append("id_user", this.user.id_user);

            var request = {
                params: params,
                headers: { Authorization: this.DataToken }
            };
            this.$axios
                .get("/keranjang/v1/invoice/getinvoice", request)
                .then(response => {
                    this.listInv = response.data.data
                    console.log('inv', this.listInv)
                })
                .catch(error => {
                console.log(error.response.data.api_message);
                });
        },
        async bayarInv(item,action){
            this.itemInv = item
            console.log('item', this.itemInv)
            if (action == 'bayar') {
                this.buktiBayar = true                
            }else if (action == 'verifikasi') {
                this.pickVerifikasiPembayaran = item.id_status_pembayaran
                this.verifikasiPembayaran = true
            }else if (action == 'batalkan') {
                this.batalkanPembelian = true
            }else if (action == 'detail_pengiriman') {
                this.detailPengiriman = true
            }else if (action == 'resi') {
                this.dialogResi = true
            }else if (action == 'sampai') {
                this.dialogSampai = true
            }
        },
        async uploadBuktiBayar(){
            let formData = new FormData()
  
            formData.append('no_inv', this.itemInv.no_inv)
            formData.append('id_invoice', this.itemInv.id_invoice)
            formData.append('bukti_bayar', this.list[0].foto)
            formData.append('id_status_pembayaran', '4')
    
            await this.$axios
            .put('/keranjang/v1/invoice/update', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.buktiBayar = false
                this.xPembayaran()
                this.getInv()
                this.setAlert({
                    status: true,
                    color: 'success',
                    text: 'Upload Pembayaran Berhasil',
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
        async inputNoResi(){
            let formData = new FormData()
  
            formData.append('no_inv', this.itemInv.no_inv)
            formData.append('id_invoice', this.itemInv.id_invoice)
            formData.append('id_status_pengiriman', '2')
            formData.append('no_resi', this.noResi)
    
            await this.$axios
            .put('/keranjang/v1/invoice/update', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.dialogResi = false
                this.noResi = ''
                this.getInv()
                this.setAlert({
                    status: true,
                    color: 'success',
                    text: 'No Resi berhasil di update',
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
        async sampaiTujuan(){
            let formData = new FormData()
  
            formData.append('no_inv', this.itemInv.no_inv)
            formData.append('id_invoice', this.itemInv.id_invoice)
            formData.append('id_status_pengiriman', '3')
    
            await this.$axios
            .put('/keranjang/v1/invoice/update', formData, {
                headers: { Authorization: this.DataToken }
            })
            .then((response) => {
                console.log(response)
                this.getInv()
                this.dialogSampai = false
                this.setAlert({
                    status: true,
                    color: 'success',
                    text: 'Status Pengiriman di update',
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
        async toPrint(data){
            let routeData = this.$router.resolve({name: 'print', query: {id: data.no_inv}});
            window.open(routeData.href, '_blank');
        },
        async goDetailUser(id){
            this.$router.push('/DetailUser?id='+id)
        }
    },
    created(){
        this.DataToken = this.$cookies.get("token");
        console.log('user', this.user)
        this.getInv()
    }
  }
</script>

<style>
#foto1 {
  display: none;
}
</style>