<template>
  <div>
    <v-container>
      <div class="d-flex align-center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              outlined
              class="d-inline-flex align-center"
              v-bind="attrs"
              v-on="on"
            >
              <v-card-text class="pa-2">
                Lihat Transaksi: {{ dateRangeText }}
                <v-icon>mdi-calendar</v-icon>
              </v-card-text>
            </v-card>
          </template>

          <v-date-picker v-model="dates" no-title scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Batal</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-text-field
          v-model="keyword"
          dense
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Cari Aktivitas"
          class="mx-2"
          @keyup.enter="search"
          clearable
        >
          <template v-slot:append>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-filter</v-icon>
              </template>

              <v-list dense>
                <v-list-item-group
                  v-model="status"
                  color="#008693"
                  v-if="tab2 == 0"
                >
                  <v-list-item v-for="item in filter" :key="item.text">
                    <v-list-item-subtitle>
                      {{ item.text }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list-item-group>

                <v-list-item-group
                  v-model="status"
                  color="#008693"
                  v-if="tab2 == 1"
                >
                  <v-list-item
                    v-for="item in filter2"
                    :key="item.text"
                    :value="item.value"
                    @click="filterStatus2"
                  >
                    <v-list-item-subtitle>
                      {{ item.text }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
      </div>

      <v-tabs v-model="tab2" color="#20929D" grow>
        <v-tab>Berlangsung</v-tab>
        <v-tab>Riwayat</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab2">
        <v-tab-item>
          <v-card
            rounded="lg"
            elevation="6"
            raised
            class="mt-4"
            v-for="item in berlangsung"
            :key="item.id"
          >
            <v-container v-if="berlangsung.length > 0">
              <div class="d-flex justify-space-between">
                <div>Berlangsung:</div>
                <div>
                  <!-- {{
                    moment
                      .utc(item.tanggal_selesai)
                      .add(utc, 'h')
                      .format('DD MMM YYYY, HH:mm:ss')
                  }}
                  {{ timezone }} -->
                  <countdown-iklan :items="item" />
                </div>
              </div>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col cols="5">
                  <v-list class="pa-0">
                    <v-list-item @click="go(item.id_iklan, item.judul)">
                      <v-list-item-avatar tile>
                        <v-img :src="getThumb(item.photo)"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="blue--text">
                          <b>{{ item.judul }}</b>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <b>Harga Awal</b> Rp
                          {{ Number(item.harga_awal).toLocaleString('id-ID') }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="3" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div>Penawaran Kamu</div>
                    <div class="text-caption text-sm-body-2">
                      Rp
                      {{ Number(item.bid_anda).toLocaleString('id-ID') }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div class="teal--text">Jenis Iklan</div>
                    <div class="text-caption text-sm-body-2">
                      {{ item.jenis }} {{ item.type }} {{ item.type_tb}}
                    </div>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col cols="4" v-if="item.active_bot">
                  <div>Maks Auto Tawar Kamu</div>
                  <div class="text-caption text-sm-body-2 teal--text">
                    Rp
                    {{
                      Number(item.active_bot_max_bid).toLocaleString('id-ID')
                    }}
                  </div>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <div class="flex-column">
                    <div>Status</div>
                    <div
                      :class="
                        item.id_mst_status_pemenang == 1
                          ? 'blue--text'
                          : 'red--text'
                      "
                    >
                      {{ item.status_all.status_aktivitas }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="4" class="d-flex align-center">
                  <v-divider vertical class="mr-4"></v-divider>
                  <v-btn
                    dark
                    :color="item.id_mst_status_pemenang == 1 ? 'teal' : 'red'"
                    shaped
                    small
                    @click="updatebid(item)"
                  >
                    Tingkatkan Tawaran
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <div>Belum ada aktivitas berlangsung</div>
            </v-container>

                        
          </v-card>
          <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="berlangsung.length == 0"
          >
            <h2>Belum ada aktivitas berlangsung</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            rounded="lg"
            elevation="6"
            raised
            class="mt-4"
            v-for="item in selesai"
            :key="item.id"
          >
            <v-container>
              <div class="d-flex justify-space-between">
                <div>Selesai pada:</div>
                <div>
                  {{
                    moment
                      .utc(item.tanggal_selesai)
                      .add(utc, 'h')
                      .format('DD MMM YYYY, HH:mm:ss')
                  }}
                  {{ timezone }}
                </div>
              </div>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col cols="5">
                  <v-list class="pa-0">
                    <v-list-item @click="go(item.id_iklan, item.judul)">
                      <v-list-item-avatar tile>
                        <v-img :src="getThumb(item.photo)"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="teal--text">
                          <b>{{ item.judul }}</b>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <b>Harga Awal</b> Rp
                          {{ Number(item.harga_awal).toLocaleString('id-ID') }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="3" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div>Penawaran Kamu</div>
                    <div class="text-caption text-sm-body-2">
                      Rp
                      {{ Number(item.bid_anda).toLocaleString('id-ID') }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div class="primary--text">Jenis Iklan</div>
                    <div class="text-caption text-sm-body-2">
                      {{ item.jenis }} {{ item.type }} {{ item.type_tb}}
                    </div>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col
                  cols="4"
                  v-if="item.id_mst_status_pemenang == 2 && item.active_bot"
                >
                  <div>Maks Auto Tawar Kamu</div>
                  <div class="text-caption text-sm-body-2 teal--text">
                    Rp
                    {{
                      Number(item.active_bot_max_bid).toLocaleString('id-ID')
                    }}
                  </div>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div>Status</div>
                    <div
                      :class="
                        item.id_mst_status_pemenang == 2
                          ? 'teal--text'
                          : 'red--text'
                      "
                    >
                      {{ item.status_all.status_aktivitas }}
                    </div>
                  </div>
                </v-col>

                <v-col
                  cols="4"
                  class="d-flex align-center"
                  v-if="item.id_mst_status_pemenang == 2"
                >
                  <v-divider vertical class="mr-4"></v-divider>

                  <v-btn
                    outlined
                    color="teal"
                    shaped
                    small
                    :to="'/message?id=' + item.id_app_penjual"
                  >
                    Hubungi Penjual
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="selesai.length == 0"
          >
            <h2>Belum ada riwayat aktivitas</h2>
          </v-card>
          <br />

          <div align="center">
            <v-btn
              color="teal"
              dark
              outlined
              @click="getTBSelesai"
              v-if="selesai.length < 40 && selesai.length < total"
            >
              Muat Lebih banyak
            </v-btn>
          </div>

          <!-- <v-pagination
            v-model="page"
            @input="getTBSelesai"
            :length="lengthPage"
            :total-visible="7"
            v-if="selesai.length > 0"
          ></v-pagination> -->
          <v-container v-if="selesai.length < 0">
            <div>Belum ada data</div>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
    <v-dialog v-model="tingkatkan" max-width="500px" persistent >              
      <v-card>
        <div style="width:35px;height:35px;border:2px solid white;position:absolute
              ;border-radius:100%;right:2px;top:2px;background:#20929D;color:white;
              cursor:pointer" class="pt-1" @click="tingkatkan = false">
          <center><b> X</b></center>
        </div>
        <v-card-title class="text-h5">
          Tingkatkan Penawaran
        </v-card-title>
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="100" class="mx-8">
              <v-img :src="getThumb(selectedIklan.photo)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <b>{{ selectedIklan.judul }}</b>
              </v-list-item-title>
              <br />
              <v-list-item-title class="blue--text">
                {{ selectedIklan.jenis }} {{ selectedIklan.type }} {{ selectedIklan.type_tb}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card class="mx-4" >
          <center>
          <v-row class="py-2" no-gutters>
            <v-col cols="6" v-if="selectedIklan.type_tb_id == 1">
              <div class="flex-column" >
                <div>Penawaran Terakhir</div>
                <div class="text-caption text-sm-body-2">
                  Rp
                  {{ Number(selectedIklan.bid_tertinggi).toLocaleString('id-ID') }}
                  
                </div>
              </div>
            </v-col>
            <v-col v-else cols="6">
              <div class="flex-column" >
                <div>Penawaran Terakhir</div>
                <div class="text-caption text-sm-body-2">
                  Rp
                  {{ Number(selectedIklan.bid_anda).toLocaleString('id-ID') }}
                  
                </div>
              </div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="5">
              <div class="flex-column" >
                <div>Selesai Pada:</div>
                <div class="text-caption text-sm-body-2">
                  <countdown-iklan :items="selectedIklan" />
                </div>
              </div>
            </v-col>
          </v-row>
          </center>
        </v-card>
        <div class="mt-2" v-if="selectedIklan.type_tb_id == 1">
          <v-tabs v-model="tab3" color="#20929D" grow>
            <v-tab>Manual</v-tab>
            <v-tab>Auto Tawar</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab3">
            <v-tab-item>
              <div class="d-flex align-center justify-space-around mt-5">
                <v-btn icon small @click="minus">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <div class="flex-column">
                  <h2 class="font-weight-bold" style="color: #4c4c4c">
                    Rp {{ Number(bid).toLocaleString('id-ID') }}
                    <!-- Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan) -->
                  </h2>
                </div>
                <v-btn icon small @click="bid += selectedIklan.kelipatan">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-card-text align="center" class="red--text">
                Minimal kelipatan penawaran  Rp {{  Number(selectedIklan.kelipatan).toLocaleString('id-ID')}} 
              </v-card-text>
              <v-card-actions>
                <v-btn @click="biddingterbuka" block color="#20929D" dark>
                  Konfirmasi Penawaran
                </v-btn>
              </v-card-actions> 
            </v-tab-item>

            <v-tab-item>
              <center>
                <div v-if="autoAktif == true">
                  <div class="mt-2"><b> Apakah anda ingin mengaktifkan auto tawar ? </b></div>
                  <v-btn
                    small
                    color="#20929D"
                    dark
                    class="mt-2 mb-2"
                    @click="aktifkanAuto"
                  >
                    Ya, Aktifkan
                  </v-btn>
                </div>
                <div v-if="biddingAuto == true">
                  <div class="d-flex align-center justify-space-around mt-5">
                    <v-btn icon small @click="minus">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <div class="flex-column">
                      <h2 class="font-weight-bold" style="color: #4c4c4c">
                        Rp {{ Number(bid).toLocaleString('id-ID') }}
                        <!-- Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan) -->
                      </h2>
                    </div>
                    <v-btn icon small @click="bid += selectedIklan.kelipatan">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <v-card-text align="center" class="red--text">
                    Minimal kelipatan penawaran  Rp {{  Number(selectedIklan.kelipatan).toLocaleString('id-ID')}}
                  </v-card-text>
                  <v-card-actions v-if="ubahBid == false">
                    <v-btn @click="autoBid" block color="#20929D" dark>
                      Aktifkan Auto Tawar
                    </v-btn>
                  </v-card-actions>
                  <div v-if="ubahBid == true">
                    <v-card-actions>
                      <v-btn @click="autoBid" block color="#20929D" dark>
                        Tingkatkan Auto Tawar
                      </v-btn>                    
                    </v-card-actions> 
                    <v-card-actions>
                      <v-btn @click="offBid"  block color="red" dark>
                        Non Aktifkan Auto Tawar
                      </v-btn>                    
                    </v-card-actions> 
                  </div>
                </div>
              </center>
            </v-tab-item>
          </v-tabs-items>
        </div>   
        <div v-else>
          <div class="d-flex align-center justify-space-around mt-5">
            <v-btn icon small @click="minus">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <div class="flex-column">
              <h2 class="font-weight-bold" style="color: #4c4c4c">
                Rp {{ Number(bid).toLocaleString('id-ID') }}
                <!-- Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan) -->
              </h2>
            </div>
            <v-btn icon small @click="bid += selectedIklan.kelipatan">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <v-card-text align="center" class="red--text">
            Minimal kelipatan penawaran  Rp {{   Number(selectedIklan.kelipatan).toLocaleString('id-ID')}}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="biddingtertutup" block color="#20929D" dark>
              KOnfirmasi Penawaran
            </v-btn>
          </v-card-actions>  
          <div class="mx-2" style="color:#4C4C4C;font-size:14px"
            v-if="selectedIklan.opsi_harga_limit == true">
            *Anda dapat melakukan penawaran dibawah atau diatas harga awal
          </div>      
        </div>     
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CountdownIklan from './CountdownIklan.vue'

export default {
  name: 'aktivitas-pembeli',
  props: ['user'],
  components: {
    CountdownIklan: () =>
      import(
        /* webpackChunkName: "list-penawaran" */ '@/components/CountdownIklan.vue'
      ),
      
    // CountdownIklan),
  },
  data: () => ({
    menu: false,
    dates: [new Date().toISOString().substr(0, 10)],
    keyword: null,
    status: 0,
    filter: [
      { text: 'Terbaru', value: '' },
      { text: 'Segera Selesai', value: '' },
    ],
    filter2: [
      { text: 'Menang', value: 2 },
      { text: 'Kalah', value: 4 },
    ],
    tab2: 0,
    tab3: 0,
    tingkatkan: false,
    selectedIklan: [],
    bid: 0,
    autoAktif: true,
    isAuto: [],
    biddingAuto: false,
    ubahBid: false,
    berlangsung: [],
    selesai: [],
    countdown: 0,
    countdown2: 0,
    page: 1,
    limit: 3,
    total: 0,
    lengthPage: 0,
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      user: 'auth/user',
    }),
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setProductId: 'product/setProduct',
    }),
    async updatebid(item){
      this.selectedIklan = item
      if (item.type_tb_id == 1) {
        this.bid = Number(this.selectedIklan.bid_tertinggi) + Number(this.selectedIklan.kelipatan)        
        this.autoAktif = true
        this.getAutoBid()
      }
      if (item.type_tb_id == 2) {
        this.bid = Number(this.selectedIklan.harga_awal) + Number(this.selectedIklan.kelipatan)
        
      }
      
      console.log('select iklan', this.selectedIklan)
      console.log('select iklan bid', this.bid)
      this.tingkatkan = true
    },
    async search() {
      if (this.tab2 == 0) {
        await this.getTBBerlangsung()
      } else {
        await this.doSearch()
      }
    },
    async getTBBerlangsung() {
      await this.$axios
        .get('/bid/v3/aktivitas_pembeli_berlangsung', {
          params: {
            id_app_user: this.user.id,
            id_mst_iklan_status: 1,
            id_mst_iklan_jenis: 2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.berlangsung = data

          let now = this.moment
            .utc(data.server_time)
            .add(this.utc, 'h')
            .toDate()
          now.setDate(now.getDate() - 1)
          console.log('data',data)

          let d = this.moment
            .utc(data.tanggal_selesai)
            .add(this.utc, 'h')
            .toDate()
          d.setDate(d.getDate() - 1)

          this.countdown2 = d - now
          console.log('now', now)
          console.log('d', d)
          console.log('countdown2', this.countdown2)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    filterStatus() {
      this.$nextTick(() => {
        this.getTransaksi()
      })
    },
    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-')+'-'+id
      )
    },
    async getTBSelesai() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      params.set('id_mst_iklan_status', 2)
      params.append('id_mst_iklan_status', 3)
      params.append('id_mst_iklan_status', 4)
      params.append('id_mst_iklan_status', 6)
      params.append('id_mst_iklan_status', 9)
      params.append('id_mst_iklan_jenis', 2)
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      if (this.status != 0) {
        params.set('id_mst_status_pemenang', this.status)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/bid/v3/aktivitas_pembeli_riwayat', request)
        .then((response) => {
          let { data } = response.data
          this.selesai.push(...data)

          this.total = response.data.count
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doSearch() {
      this.page = 1

      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      params.set('id_mst_iklan_status', 2)
      params.append('id_mst_iklan_status', 3)
      params.append('id_mst_iklan_status', 4)
      params.append('id_mst_iklan_status', 6)
      params.append('id_mst_iklan_status', 9)
      params.append('id_mst_iklan_jenis', 2)
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      if (this.status != 0) {
        params.set('id_mst_status_pemenang', this.status)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/bid/v3/aktivitas_pembeli_riwayat', request)
        .then((response) => {
          let { data } = response.data
          this.selesai = data

          this.total = response.data.count
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    filterStatus2() {
      this.$nextTick(() => {
        this.doSearch()
      })
    },
    async biddingtertutup(){
      let formData = new FormData()

      formData.set('id_iklan', this.selectedIklan.id_iklan)
      formData.set('bid', this.bid)
      formData.set('id_app_user', this.selectedIklan.id_app_user)

      await this.$axios
        .post('/bid/v3/iklan_tb_bid_tertutup', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          // location.reload()
          this.playSound('/audio/bid.mpeg')
          this.getTBBerlangsung()
          this.tingkatkan = false
          // this.getRiwayatTB()
          // this.listbid()
          // console.log('data', data)
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
      // console.log('bidding')
      // console.log('id_iklan', this.selectedIklan.id_iklan)
      // console.log('bid', this.bid)
      // console.log('id_app_user',this.selectedIklan.id_app_user)

    },
    async biddingterbuka() {
      let formData = new FormData()

      formData.set('id_iklan', this.selectedIklan.id_iklan)
      formData.set('bid', this.bid)
      formData.set('id_app_user', this.selectedIklan.id_app_user)

      await this.$axios
        .post('/bid/v3/iklan_tb_bid', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.playSound('/audio/bid.mpeg')
          this.getTBBerlangsung()
          this.tingkatkan = false
          // this.listbid()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
    async autoBid() {
      let formData = new FormData()

      formData.set('id_app_user', this.selectedIklan.id_app_user)
      formData.set('id_iklan', this.selectedIklan.id_iklan)
      formData.set('max_bid', this.bid)

      await this.$axios
        .post('/bid/v3/konfirmasi_auto_tawar ', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getAutoBid()
          this.getTBBerlangsung()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
    async offBid() {
      let formData = new FormData()

      formData.set('id_app_user', this.selectedIklan.id_app_user)
      formData.set('id_iklan', this.selectedIklan.id_iklan)

      await this.$axios
        .post('/bid/v3/off_auto_tawar ', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getAutoBid()
          this.getTBBerlangsung()
          // this.autoAktif = true
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
    minus() {      
      // if (this.bid > this.selectedIklan.harga_awal) {
      //   this.bid -= this.selectedIklan.kelipatan
      // }
      if (this.selectedIklan.type_tb_id == 1) {
        if (this.bid > Number(this.selectedIklan.bid_tertinggi) + Number(this.selectedIklan.kelipatan)) {
          this.bid -= this.selectedIklan.kelipatan
        }        
      }
      if (this.selectedIklan.type_tb_id == 2) {
        if (this.selectedIklan.opsi_harga_limit == false) {
          if (this.bid > Number(this.selectedIklan.harga_awal) + Number(this.selectedIklan.kelipatan)) {
            this.bid -= this.selectedIklan.kelipatan
          }
        }
        if (this.selectedIklan.opsi_harga_limit == true) {
          this.bid -= this.selectedIklan.kelipatan
        }
      }
    },
    playSound(sound) {
      if (sound) {
        let audio = new Audio(sound)
        audio.play()
      }
    },

    //bid terbuka
    async getAutoBid() {
      await this.$axios
        .get('/bid/v3/pembeli_auto_tawar', {
          params: {
            id_app_user: this.selectedIklan.id_app_user,
            id_iklan: this.selectedIklan.id_iklan,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          if (data.length == 0) {
            this.isAuto = null
            // this.amountAuto = this.bid
            this.autoAktif = true
            this.biddingAuto = false
            this.ubahBid = false
            console.log('tidak aktif')
          } else {
            this.isAuto = data[0]
            this.autoAktif = false
            this.biddingAuto = true
            this.ubahBid = true
            console.log('aktif')
            // this.amountAuto = this.isAuto.max_bid
            // if (this.isAuto.max_bid > this.minBid) {
            //   this.reactivated = true
            // }
            // if (this.isAuto.max_bid <= this.minBid) {
            //   this.reactivated = false
            //   this.offBid()
            // }
            // console.log('auto ah', this.isAuto)
            // console.log('reactivated ah', this.reactivated)
            // console.log('max bid ah', this.isAuto.max_bid)
            // console.log('min bid ah', this.minBid)
            // this.reactivated = true
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async aktifkanAuto(){
      this.autoAktif = false
      this.biddingAuto = true
    },
  },
  async created() {
    await this.getTBBerlangsung()
    await this.getTBSelesai()
    console.log('berlangsung', this.berlangsung)
  },
}
</script>

<style>
</style>