<template>
  <div>
    <v-card rounded="lg" elevation="6" raised>
      <v-tabs v-model="tab" color="#008693">
        <v-tab href="#tab-iklan">Iklan</v-tab>
        <v-tab href="#tab-unit">Garasi</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-iklan">
          <v-container>
            <div class="d-flex align-center">
              <v-menu
                ref="menu"
                v-model="menu2"
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
                  <v-btn text color="primary" @click="menu = false">
                    Batal
                  </v-btn>
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
                label="Cari"
                class="mx-2"
                @keyup.enter="search"
                clearable
              >
              </v-text-field>
            </div>

            <v-chip-group v-model="chip" mandatory active-class="primary--text">
              <div class="d-flex align-center">
                <h4 class="mr-2">Status</h4>

                <v-chip
                  v-for="tag in tags"
                  :key="tag.id"
                  :value="tag.id"
                  @click="filterStatus"
                >
                  {{ tag.status }}
                </v-chip>
              </div>
            </v-chip-group>

            <v-row>
              <v-col
                cols="12"
                sm="6"
                v-for="item in hits"
                :key="item._source.id"
              >
                <v-card rounded="lg">
                  <v-divider> </v-divider>
                  <v-card-title
                    class="d-flex align-center justify-space-between"
                  >
                    <h6>Status:</h6>

                    <h6
                      v-if="item._source.id_mst_iklan_status == 1"
                      class="orange--text"
                    >
                      Tayang
                    </h6>
                    <h6
                      v-if="item._source.id_mst_iklan_status == 2"
                      class="green--text"
                    >
                      Terjual
                    </h6>
                    <h6
                      v-if="item._source.id_mst_iklan_status == 3"
                      class="green--text"
                    >
                      Serah Terima
                    </h6>
                    <h6
                      v-if="item._source.id_mst_iklan_status == 4"
                      class="red--text"
                    >
                      Expired
                    </h6>
                    <h6
                      v-if="item._source.id_mst_iklan_status == 6"
                      class="red--text"
                    >
                      Belum Terjual
                    </h6>
                    <h6
                      v-if="item._source.id_mst_iklan_status == 8"
                      class="blue--text"
                    >
                      Berlangsung
                    </h6>
                    <h6
                      v-if="item._source.id_mst_iklan_status == 9"
                      class="red--text"
                    >
                      Pembelian Dibatalkan
                    </h6>
                    <v-menu left>
                      <template v-slot:activator="{ on, attrs }" >
                        <v-btn dark icon v-bind="attrs" v-on="on">
                          <v-icon color="black">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-btn
                          text
                          height="47"
                          class="white ml-7"
                          @click="edit(item._source)"
                          :disabled="
                            item._source.id_mst_iklan_status != 1 ? true : false
                          "
                        >
                          <v-icon small class="mr-2">mdi-pencil</v-icon> Edit
                        </v-btn>
                        <br />
                        <v-list-item>
                          <v-col cols="auto">
                            <v-dialog
                              transition="dialog-top-transition"
                              max-width="600"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  text
                                  height="47"
                                  class="white"
                                  :disabled="
                                    item._source.id_mst_iklan_status != 1
                                      ? true
                                      : false
                                  "
                                >
                                  <v-list-item-title v-bind="attrs" v-on="on"
                                    ><v-icon small class="mr-2"
                                      >mdi-delete</v-icon
                                    >Hapus</v-list-item-title
                                  >
                                </v-btn>
                              </template>
                              <template v-slot:default="dialog">
                                <v-card>
                                  <h3 class="pt-5 pl-10">
                                    Anda yakin akan menghapus iklan ini?
                                  </h3>
                                  <v-col cols="12" md="11">
                                    <v-textarea
                                      label="Masukkan Alasan Anda"
                                      auto-grow
                                      :class="`rounded${value}`"
                                      v-model="note"
                                      class="pt-5 pl-10"
                                    ></v-textarea>
                                  </v-col>
                                  <v-card-actions class="justify-end mt--5">
                                    <v-btn @click="dialog.value = false"
                                      >Batal</v-btn
                                    >
                                    <v-btn
                                      color="#20929D"
                                      dark
                                      @click="deleteIklan(item._source.id)"
                                      >Simpan</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </template>
                            </v-dialog>
                          </v-col>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item
                      @click="go(item._source.id, item._source.judul)"
                    >
                      <v-list-item-avatar tile>
                        <v-img :src="getThumb(item._source.photo)"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item._source.judul }}
                        </v-list-item-title>

                        <v-list-item-subtitle> Harga </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          {{ item._source.mst_iklan_jenis }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action
                        v-if="item._source.id_mst_iklan_jenis == 2"
                      >
                        Rp
                        {{
                          Number(item._source.harga_awal).toLocaleString(
                            'id-ID'
                          )
                        }}
                      </v-list-item-action>
                      <v-list-item-action v-else>
                        Rp
                        {{ Number(item._source.harga).toLocaleString('id-ID') }}
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-icon
                      color="#20929D"
                      small
                      class="mr-1"
                      v-if="item._source.id_mst_user_type == 2"
                    >
                      mdi-check-decagram
                    </v-icon>

                    <h3>
                      <b>{{ item._source.app_user }}</b>
                    </h3>

                    <v-spacer></v-spacer>

                    <!-- <v-chip
                      class="ma-2"
                      color="teal lighten-5"
                      label
                      text-color="#20929D"
                      v-if="item._source.highlight == true"
                    >
                      Ter-Highlight
                    </v-chip> -->
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <br />

            <div align="center">
              <v-btn
                color="#20929D"
                dark
                outlined
                @click="daftarIklan"
                v-if="hits.length < 40 && hits.length < total"
              >
                Muat Lebih Banyak
              </v-btn>
            </div>
            <!-- <v-pagination
              v-model="page"
              @input="daftarIklan"
              :length="lengthPage"
              :total-visible="7"
            ></v-pagination> -->
          </v-container>
      
          <v-card
              class="d-flex align-center justify-center"
              flat
              height="100"
              tile
              v-if="hits.length == 0"
            >
              <h2>Belum ada data iklan</h2>
            </v-card>
      
        </v-tab-item>

        <v-tab-item value="tab-unit">
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
                  <v-btn text color="primary" @click="menu = false">
                    Batal
                  </v-btn>
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
                label="Cari"
                class="mx-2"
                @keyup.enter="search"
                clearable
              >
              </v-text-field>
            </div>

            <v-chip-group
              v-model="chip2"
              mandatory
              active-class="primary--text"
            >
              <div class="d-flex align-center">
                <h4 class="mr-2">Status</h4>

                <v-chip
                  v-for="tag in tags2"
                  :key="tag.id"
                  :value="tag.id"
                  @click="filterStatus2"
                >
                  {{ tag.status }}
                </v-chip>
              </div>
            </v-chip-group>

            <v-container>
              <v-row>
                <v-col cols="12" sm="12" v-for="item in garasi" :key="item.id">
                  <v-card rounded="lg" height="250px">
                    <v-card-title height="1px">
                      <span class="text-h6"
                        >Status :
                        <span
                          v-if="item.id_mst_motor_bekas_status == 1"
                          class="blue--text"
                        >
                          Tersedia</span
                        >
                        <span
                          v-if="item.id_mst_motor_bekas_status == 2"
                          class="green--text"
                        >
                          Terpakai</span
                        >
                        <span
                          v-if="item.id_mst_motor_bekas_status == 3"
                          class="red--text"
                        >
                          Proses Moderasi</span
                        >
                        <span
                          v-if="item.id_mst_motor_bekas_status == 4"
                          class="green--text"
                        >
                          Serah Terima</span
                        >
                        <span
                          v-if="item.id_mst_motor_bekas_status == 5"
                          class="red--text"
                        >
                          Moderasi Ditolak</span
                        >
                        <span
                          v-if="item.id_mst_motor_bekas_status == 6"
                          class="green--text"
                        >
                          Terjual</span
                        >
                      </span>

                      <v-spacer></v-spacer>

                      <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn dark icon v-bind="attrs" v-on="on">
                            <v-icon color="black">mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item
                            @click="dialogbarcode = true"
                            v-on:click="getBarcode(item.id)"
                          >
                            <v-list-item-title class="pl-3">
                              <v-icon small class="mr-2"
                                >mdi-barcode-scan</v-icon
                              >Barcode</v-list-item-title
                            >
                          </v-list-item>
                          <v-list-item
                            :to="'/garage/edit/' + item.id"
                            @click="datagarasi(item)"
                            :disabled="
                              item.id_mst_motor_bekas_status == 1
                                ? false
                                : item.id_mst_motor_bekas_status == 5
                                ? false
                                : true
                            "
                          >
                            <template>
                              <v-list-item-title class="pl-3">
                                <v-icon small class="mr-2">mdi-pencil</v-icon>
                                Edit</v-list-item-title
                              >
                            </template>
                          </v-list-item>
                          <v-list-item
                            :disabled="
                              item.id_mst_motor_bekas_status == 1 ? false : true
                            "
                          >
                            <v-col cols="auto">
                              <v-dialog
                                transition="dialog-top-transition"
                                max-width="600"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-list-item-title v-bind="attrs" v-on="on"
                                    ><v-icon small class="mr-2"
                                      >mdi-delete</v-icon
                                    >
                                    Hapus
                                  </v-list-item-title>
                                </template>
                                <template v-slot:default="dialogbarcode">
                                  <v-card>
                                    <h3 class="pt-5 pl-10">
                                      Anda yakin akan menghapus unit ini?
                                    </h3>
                                    <v-card-actions class="justify-end mt--5">
                                      <v-btn
                                        @click="dialogbarcode.value = false"
                                        >Batal</v-btn
                                      >
                                      <v-btn
                                        color="#20929D"
                                        dark
                                        @click="hapusGarasi(item.id)"
                                        >Simpan</v-btn
                                      >
                                    </v-card-actions>
                                  </v-card>
                                </template>
                              </v-dialog>
                            </v-col>
                      
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                      <v-list-item :to="'/unit/' + item.id">
                        <v-list-item-avatar class="rounded" size="100" tile>
                          <img :src="getThumb(item.foto_1)" />
                        </v-list-item-avatar>

                        <v-list-item-title>
                          <div class="ml-10">
                            <h3>{{ item.merk }} - {{ item.type }}</h3>
                            <br />
                            <h5>{{ item.nomor_polisi }}</h5>
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>

            <div align="center">
              <v-btn
                color="#20929D"
                dark
                outlined
                @click="daftarProduk"
                v-if="garasi.length < 40 && garasi.length < total2"
              >
                Muat Lebih Banyak
              </v-btn>
            </div>

            <!-- <v-pagination
              v-model="page2"
              @input="daftarProduk"
              :length="lengthPage2"
              :total-visible="7"
            ></v-pagination> -->
          </v-container>
           <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="garasi.length == 0"
          >
            <h2>Belum ada data garasi</h2>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="dialogedit" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Iklan</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="judul"
              label="Judul Iklan"
              outlined
              dense
              :rules="formRules"
            ></v-text-field>

            <v-text-field
              v-model="deskripsi"
              label="Deskripsi Iklan"
              outlined
              dense
              :rules="formRules"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#20929D"
            :disabled="!valid"
            class="white--text"
            @click="updateIklan"
          >
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogbarcode">
      <v-card v-html="barcode"></v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'iklan-garasi',
  props: ['user'],
  data: () => ({
    tab: 'tab-iklan',
    dataedit: '',
    menu: false,
    menu2: false,
    dates: [new Date().toISOString().substr(0, 10)],
    keyword: null,
    chip: 0,
    dialogedit: false,
    dialogbarcode: false,
    tags: [],
    hits: [],
    chip2: 0,
    tags2: [],
    garasi: [],
    page: 1,
    limit: 8,
    total: 0,
    lengthPage: 0,
    page2: 1,
    total2: 0,
    lengthPage2: 0,
    loading: false,
    listsubs: [],
    judul: '',
    deskripsi: '',
    valid: true,
    barcode: '',
    formRules: [(v) => !!v || 'Harus diisi'],
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
    idmotoriklan: '',
    idMotor: '',
    note: '',
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      productid: 'product/productid',
    }),
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    query() {
      return this.$route.query.tab
    },
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async search() {
      if (this.tab == 'tab-iklan') {
        await this.doSearch()
      } else {
        await this.doSearch2()
      }
    },
    async deleteIklan(id) {
      // console.log(id)
      // console.log(this.note)
      // console.log(id)
      let formData = new FormData()

      formData.set('id', id)
      formData.set('id_mst_tipe_note', 1)
      formData.set('note', this.note)

      await this.$axios
        .post('iklan/v3/iklan_delete', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.unitMokas = data.data

          this.setAlert({
            status: true,
            color: 'success',
            text: "Berhasil Menghapus Iklan",
          })
          console.log('berhasil')
          this.dialog = false
          location.reload()
        })
        .catch((error) => {
         let responses = error.response.data
              this.setAlert({
                status: true,
                color: 'error',
                text: responses.api_message,
              })
          if (error.response.status == 403) {
            this.setAuth(null)
            this.setToken(null)
            window.localStorage.setItem('user', null)
            window.localStorage.setItem('token', null)
            window.location.href = '/'
          }
        })
       

      // var r = confirm('Apakah anda yakin untuk menghapus iklan ini?')
      // if (r == true) {
      //   await this.axios
      //     .delete('/iklan/v3/iklan', {
      //       headers: { Authorization: 'Bearer ' + this.user.token },
      //       params: {
      //         id: item
      //       },
      //     })
      //     .then((response) => {
      //       let { data } = response
      //       this.setAlert({
      //         status: true,
      //         color: 'success',
      //         text: data.api_message,
      //       })
      //       window.location = '/account/profile/iklan-garasi'
      //     })
      //     .catch((error) => {
      //       let responses = error.response.data
      //       console.log(responses.api_message)
      //       if (error.response.status == 403) {
      //         this.setAuth(null)
      //         this.setToken(null)
      //         window.localStorage.setItem('user', null)
      //         window.localStorage.setItem('token', null)
      //         window.location.href = '/'
      //       }
      //     })
      // }
    },
    async getBarcode(id) {
      await this.$axios
        .get('/produk/v3/barcode', {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response
          this.barcode = data
          this.dialog = true
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getStatusIklan() {
      await this.$axios
        .get('/iklan/v3/mst_iklan_status')
        .then((response) => {
          let { data } = response.data
          this.tags = data
          this.tags.splice(0, 0, { id: 0, status: 'Semua' })
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getListSubs() {
      await this.$axios
        .get('/produk/v3/langganan_pemilik_group', {
          params: {
            id_app_user: this.user.id,
            limit: 99,
            offset: 0,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.listsubs = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async daftarIklan() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      if (this.chip > 0) {
        params.set('id_mst_iklan_status', this.chip)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/search/v4/search', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits.push(...hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
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
      if (this.chip > 0) {
        params.set('id_mst_iklan_status', this.chip)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/search/v4/search', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits = hits

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    filterStatus() {
      this.$nextTick(() => {
        this.doSearch()
      })
    },
    async hapusGarasi(id) {
      let formData = new FormData()

      formData.set('id', id)
      formData.set('limit', 1)

      await this.$axios
        .post('/produk/v3/unit_mokas_delete', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.unitMokas = data.data

          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.dialog = false
          location.reload()
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
    async getStatusUnit() {
      await this.$axios
        .get('/produk/v3/mst_motor_bekas_status')
        .then((response) => {
          let { data } = response.data
          this.tags2 = data
          this.tags2.splice(0, 0, { id: 0, status: 'Semua' })
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async daftarProduk() {
      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      if (this.chip2 > 0) {
        params.set('id_mst_motor_bekas_status', this.chip2)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/produk/v3/unit_mokas', request)
        .then((response) => {
          let { data } = response.data
          this.garasi.push(...data)

          this.total2 = response.data.count
          this.lengthPage2 = Math.ceil(this.total2 / this.limit)
          this.page2++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doSearch2() {
      this.page2 = 1

      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      if (this.chip2 > 0) {
        params.set('id_mst_motor_bekas_status', this.chip2)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/produk/v3/unit_mokas', request)
        .then((response) => {
          let { data } = response.data
          this.garasi = data

          this.total2 = response.data.count
          this.lengthPage2 = Math.ceil(this.total2 / this.limit)
          this.page2++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    // getHighlight(id) {
    //   this.selected = id
    //   this.dialog = true
    // },
    // async addHighlight() {
    //   this.loading = true

    //   let formData = new FormData()

    //   formData.set('id_app_user', this.user.id)
    //   formData.set('id_iklan', this.selected)
    //   formData.set('id_iklan_langganan', this.langganan.id_iklan_langganan)
    //   formData.set('id_mst_langganan_tipe', 7)

    //   await this.$axios
    //     .post('/iklan/v3/iklan_highlight', formData, {
    //       headers: { Authorization: 'Bearer ' + this.user.token },
    //     })
    //     .then((response) => {
    //       let { data } = response
    //       this.setAlert({
    //         status: true,
    //         color: 'success',
    //         text: data.api_message,
    //       })
    //       this.loading = false
    //       this.$router.push('/account/profile/list-subs')
    //     })
    //     .catch((error) => {
    //       this.loading = false
    //       let responses = error.response.data
    //       this.setAlert({
    //         status: true,
    //         color: 'error',
    //         text: responses.api_message,
    //       })

    //       if (error.response.status == 403) {
    //         this.setAuth({})
    //         this.$cookies.set('user', null)
    //         this.$cookies.set('prevUrl', this.$route.path)
    //         this.setAlert({
    //           status: true,
    //           color: 'error',
    //           text: responses.api_message,
    //         })
    //         this.$router.push('/login')
    //       }
    //     })
    // },
    // getSundul(id) {
    //   this.sundul = id
    //   this.dialog2 = true
    // },
    // async addSundul() {
    //   this.loading = true

    //   let formData = new FormData()

    //   formData.set('id_app_user', this.user.id)
    //   formData.set('id_iklan', this.sundul)
    //   formData.set('id_iklan_langganan', this.langganan.id_iklan_langganan)
    //   formData.set('id_mst_langganan_tipe', 8)

    //   await this.$axios
    //     .post('/iklan/v3/iklan_sundul', formData, {
    //       headers: { Authorization: 'Bearer ' + this.user.token },
    //     })
    //     .then((response) => {
    //       let { data } = response
    //       this.setAlert({
    //         status: true,
    //         color: 'success',
    //         text: data.api_message,
    //       })
    //       this.loading = false
    //       this.$router.push('/account/profile/list-subs')
    //     })
    //     .catch((error) => {
    //       this.loading = false
    //       let responses = error.response.data
    //       this.setAlert({
    //         status: true,
    //         color: 'error',
    //         text: responses.api_message,
    //       })

    //       if (error.response.status == 403) {
    //         this.setAuth({})
    //         this.$cookies.set('user', null)
    //         this.$cookies.set('prevUrl', this.$route.path)
    //         this.setAlert({
    //           status: true,
    //           color: 'error',
    //           text: responses.api_message,
    //         })
    //         this.$router.push('/login')
    //       }
    //     })
    // },

    edit(item) {
      this.idmotoriklan = item.id
      this.dialogedit = true
      this.deskripsi = item.deskripsi
      this.judul = item.judul
      console.log(item)
    },
    datagarasi(item) {
      console.log(item)
    },

    async updateIklan() {
      let formData = new FormData()
      formData.set('judul', this.judul.trim())
      formData.set('deskripsi', this.deskripsi.trim())
      formData.set('id', this.idmotoriklan)

      if (this.hits.id_mst_iklan_jenis == 1) {
        await this.$axios
          .put('/iklan/v3/iklan_hp_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
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
      } else {
        await this.$axios
          .put('/iklan/v3/iklan_tb_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
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
      }
    },
    filterStatus2() {
      this.$nextTick(() => {
        this.doSearch2()
      })
    },
    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
  },
  watch: {
    query() {
      this.tab = this.query
      this.search()
    },
  },
  async created() {
    await this.getStatusIklan()
    await this.daftarIklan()
    await this.getStatusUnit()
    await this.daftarProduk()
    await this.getListSubs()
  },
}
</script>

<style>
/* .status{
  color: orange;
} */
</style>