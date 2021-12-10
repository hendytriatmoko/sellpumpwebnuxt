<template>
  <div>
    <section id="info-tb" class="mt-2">
     
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="4">
          <v-carousel
            v-model="carousel"
            hide-delimiters
            hide-delimiter-background
            show-arrows
            show-arrows-on-hover
            height="400"
          >
            <v-carousel-item
              v-for="(item, index) in fotos"
              :key="index"
              :src="getImage(item.src)"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>

          <div class="d-flex justify-space-between mt-2">
            <v-card
              rounded="lg"
              hover
              v-for="(item, index) in fotos"
              :key="index"
              @click="carousel = index"
            >
              <v-img :src="getImage(item.src)" width="65" height="65"></v-img>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" sm="5">
          <v-row>
            <v-col cols="5">Jenis Iklan:</v-col>

            <v-col cols="7" align="right">
              {{ iklan.mst_iklan_jenis }} {{ iklan.mst_iklan_type }}
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <h2>{{ iklan.judul }}</h2>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6">
              <div class="d-flex">
                <div class="flex-column">
                  <div v-if="liveBid.length == 0">
                    <div>Harga Awal:</div>
                    <h2 class="#20929D--text">
                      Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}
                    </h2>
                  </div>

                  <div v-else>
                    <div>Harga Saat Ini:</div>
                    <h2 class="#20929D--text">
                      Rp {{ Number(liveBid[0].Bid).toLocaleString('id-ID') }}
                    </h2>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="6">
              <div class="d-flex align-center justify-end">
                {{
                  iklan.log_iklan_view == undefined ? 1 : iklan.log_iklan_view
                }}x <v-icon>mdi-eye</v-icon>
              </div>
              <div class="d-flex align-center justify-end" style="color: #20929D">  ID Iklan: {{ productid }} </div>
            </v-col>
           
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3>Deskripsi</h3>
              <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="iklan.deskripsi"
              ></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <h3>Tanggal Mulai</h3>
              <div>
                {{
                  moment
                    .utc(iklan.tanggal_mulai)
                    .add(utc, 'h')
                    .format('DD MMM YYYY, HH:mm')
                }}
                {{ timezone }}
              </div>
            </v-col>

            <v-col cols="6">
              <h3>Tanggal Selesai</h3>
              <div>
                {{
                  moment
                    .utc(iklan.tanggal_selesai)
                    .add(utc, 'h')
                    .format('DD MMM YYYY, HH:mm')
                }}
                {{ timezone }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <h3>Tiket dibutuhkan</h3>
              <div>{{ iklan.jumlah_tiket > 0 ? 'Ya' : 'Tidak' }}</div>
            </v-col>

            <v-col cols="6">
              <h3>Jumlah Tiket</h3>
              <div>{{ iklan.jumlah_tiket }} Tiket</div>
            </v-col>
          </v-row>
        </v-col>
        <br />
        <v-col cols="12" sm="3">
          <div :class="$vuetify.breakpoint.xs ? '' : 'fixed'">
            <v-card rounded="lg" color="cyan lighten-5">
              <div v-if="start == false && end == false">
                <div
                  class="
                    d-inline-flex
                    grey
                    white--text
                    rounded-tr-lg rounded-bl-lg
                  "
                >
                  <div class="mx-2 text-caption">
                    Tawar Bersama segera berlangsung
                  </div>
                </div>
              </div>

              <div v-if="start == true && end == false">
                <div
                  class="
                    d-inline-flex
                    teal
                    white--text
                    rounded-tr-lg rounded-bl-lg
                  "
                >
                  <div class="mx-2 text-caption">Tawar Bersama berlangsung</div>
                </div>
              </div>

              <div v-if="start == true && end == true">
                <div
                  class="
                    d-inline-flex
                    orange
                    white--text
                    rounded-tr-lg rounded-bl-lg
                  "
                >
                  <div class="mx-2 text-caption">Tawar Bersama berakhir</div>
                </div>
              </div>

              <v-card-title class="justify-center orange--text">
                <div v-if="liveBid.length == 0">
                  Rp
                  {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}
                </div>

                <div v-else>
                  Rp
                  {{ Number(liveBid[0].Bid).toLocaleString('id-ID') }}
                </div>
              </v-card-title>

              <v-card-subtitle align="center">
                <div v-if="liveBid.length == 0">
                  <b>Harga awal</b>
                  <div>
                    Kelipatan Tawaran: Rp
                    {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}
                  </div>
                </div>

                <div v-else>
                  <b>Harga saat ini:</b>
                  <div>
                    Kelipatan Tawaran: Rp
                    {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}
                  </div>
                </div>
              </v-card-subtitle>

              <v-card-text align="center">
                <div
                  class="pa-2 mt-2 d-inline-flex grey white--text"
                  v-if="start == false && end == false"
                >
                  <countdown
                    :time="countdown < 0 ? 0 : countdown"
                    v-slot="{ days, hours, minutes, seconds }"
                  >
                    {{ days }} h : {{ hours }} j : {{ minutes }} m :
                    {{ seconds }} d
                  </countdown>
                </div>

                <div
                  class="pa-2 mt-2 d-inline-flex teal white--text"
                  v-if="start == true && end == false"
                >
                  <countdown
                    :time="countdown2 < 0 ? 0 : countdown2"
                    v-slot="{ days, hours, minutes, seconds }"
                  >
                    {{ days }} h : {{ hours }} j : {{ minutes }} m :
                    {{ seconds }} d
                  </countdown>
                </div>
              </v-card-text>

              <hr />

              <v-card-text>
                <div align="center" class="red lighten-4" v-if="guest">
                  <b>Anda harus masuk untuk menawar.</b>
                  <div>
                    Penawaran dibatasi hanya untuk pengguna yang masuk.
                    <nuxt-link to="/login">Masuk</nuxt-link> atau
                    <nuxt-link to="/register">Daftar</nuxt-link> sekarang
                  </div>
                </div>

                <div v-else>
                  <div v-if="iklan.id_app_user != user.id">
                    <div v-if="start == true && end == false">
                      <div align="center" v-if="check == undefined">
                        <v-btn color="#20929D" dark small @click="ikutTB()">
                          Ikut Tawar Bersama
                        </v-btn>
                      </div>

                      <div align="center" v-else>
                        <v-btn-toggle
                          v-model="toggle"
                          mandatory
                          dense
                          class="mb-2"
                        >
                          <v-btn small outlined color="#20929D">Manual</v-btn>

                          <v-btn small outlined color="#20929D">
                            Auto Tawar
                          </v-btn>
                        </v-btn-toggle>

                        <div v-if="toggle == 0">
                          <div
                            class="d-flex align-center justify-space-between"
                          >
                            <v-btn icon small @click="minus">
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>

                            <div class="flex-column">
                              <h3>Nominal Penawaran</h3>
                              <h2 class="font-weight-bold red--text">
                                Rp {{ Number(bid).toLocaleString('id-ID') }}
                              </h2>
                            </div>

                            <v-btn icon small @click="bid += iklan.kelipatan">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>

                          <v-btn
                            block
                            small
                            dark
                            color="#20929D"
                            class="mt-2"
                            @click="bidding"
                          >
                            Konfirmasi Penawaran
                          </v-btn>
                        </div>

                        <div v-if="toggle == 1">
                          <div v-if="!KonfirmasiAuto && isAuto == null">
                            <h3>Setuju untuk menggunakan fitur Auto Tawar?</h3>

                            <v-btn
                              small
                              color="#20929D"
                              dark
                              class="mt-2"
                              @click="KonfirmasiAuto = true"
                            >
                              Ya, Setuju
                            </v-btn>
                            <div>
                              selengkapnya tentang
                              <nuxt-link to="/tentang?tab=autotawar">
                                Auto Tawar
                              </nuxt-link>
                            </div>
                          </div>

                          <div v-else>
                            <v-text-field
                              v-model="amountAuto"
                              outlined
                              readonly
                              maxlength="11"
                              hide-details
                              style="width: 170px; display: none"
                              prepend-icon="mdi-minus"
                              @click:prepend="minAuto()"
                              append-outer-icon="mdi-plus"
                              @click:append-outer="addAuto()"
                            ></v-text-field>

                            <div v-if="reactivated">
                              <h3>Harga maksimal tawaran anda:</h3>

                              <div
                                class="
                                  d-flex
                                  align-center
                                  justify-space-between
                                "
                              >
                                <v-btn
                                  small
                                  icon
                                  color="red"
                                  @click="minAuto()"
                                >
                                  <v-icon>mdi-minus</v-icon>
                                </v-btn>

                                <h2 class="font-weight-bold red--text">
                                  Rp
                                  {{
                                    Number(amountAuto).toLocaleString('id-ID')
                                  }}
                                </h2>

                                <v-btn
                                  small
                                  icon
                                  color="green"
                                  @click="addAuto()"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </div>

                              <v-btn
                                small
                                color="#20929D"
                                dark
                                class="mt-2"
                                @click="autoBid"
                                v-if="isAuto == null"
                              >
                                Aktifkan Auto Tawar
                              </v-btn>

                              <div class="mt-4" v-else>
                                <v-btn
                                  small
                                  color="#20929D"
                                  block
                                  @click="autoBid"
                                  class="white--text"
                                  :disabled="
                                    isAuto.max_bid >= liveBid[0].Bid
                                      ? true
                                      : false
                                  "
                                >
                                  Ubah Penawaran
                                </v-btn>

                                <v-btn
                                  small
                                  color="red"
                                  dark
                                  block
                                  @click="offBid"
                                  class="mt-2"
                                >
                                  Non Aktifkan
                                </v-btn>
                              </div>
                            </div>

                            <div v-else>
                              <div v-if="isAuto != null">
                                <v-alert
                                  outlined
                                  type="error"
                                  prominent
                                  border="left"
                                  dense
                                >
                                  Harga saat ini sudah mencapai harga maksimal
                                  tawaran Anda. Apakah Anda ingin mengaktifkan
                                  kembali Auto Tawar?

                                  <v-btn
                                    color="#20929D"
                                    dark
                                    small
                                    class="mt-2"
                                    @click="reactivated = true"
                                  >
                                    Aktifkan Kembali
                                  </v-btn>
                                </v-alert>
                              </div>
                            </div>
                          </div>

                          <br />

                          <div class="red--text">
                            Catatan: <br />
                            Fitur Tawar Otomatis tidak menjamin anda akan
                            memenangkan iklan Tawar Bersama.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="start == true && end == true">
                      <div v-if="check != undefined">
                        <div v-if="check.id_mst_status_pemenang == 2">
                          <div align="center">
                            <v-icon color="#20929D" x-large>
                              mdi-emoticon-cool
                            </v-icon>

                            <br />

                            Selamat ya, kamu menang pada iklan ini, segera
                            hubungi penjual atau lihat transaksi kamu.

                            <br />
                            <br />

                            <v-btn
                              small
                              color="#20929D"
                              dark
                              block
                              :to="'/message?id=' + iklan.id_app_user"
                            >
                              Tanya penjual
                            </v-btn>

                            <v-btn
                              small
                              outlined
                              color="#20929D"
                              block
                              class="mt-2"
                              :to="'/detail-transaksi/unit/' + orders.id"
                            >
                              Lihat Transkasi
                            </v-btn>
                          </div>
                        </div>

                        <div v-else>
                          <div align="center">
                            <v-icon color="yellow" x-large>
                              mdi-emoticon-sad
                            </v-icon>

                            <br />

                            Sayang sekali kamu kalah dalam tawaran kali ini, ayo
                            ikuti iklan lainnya untuk memenangkan iklan Tawar
                            Bersama.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div v-if="start == true && end == true">
                      <div align="center" v-if="liveBid.length > 0">
                        <v-icon color="#20929D" x-large>
                          mdi-emoticon-cool
                        </v-icon>

                        <br />

                        Ada pemenang nih.

                        <br />
                        <br />

                        <v-btn
                          small
                          color="#20929D"
                          dark
                          block
                          :to="'/message?id=' + orders.id_pembeli"
                        >
                          Tanya Pembeli
                        </v-btn>

                        <v-btn
                          small
                          outlined
                          color="#20929D"
                          block
                          class="mt-2"
                          :to="'/detail-transaksi/unit/' + orders.id"
                        >
                          Lihat Transkasi
                        </v-btn>
                      </div>

                      <div align="center" v-else>
                        <v-icon color="yellow" x-large>mdi-emoticon-sad</v-icon>

                        <br />

                        Maaf, sepertinya iklan ini belum ada penawar.
                      </div>
                    </div>
                  </div>
                </div>

                <br />

                <div>
                  selengkapnya tentang
                  <nuxt-link to="/tentang?tab=tbrules">Tawar Bersama</nuxt-link>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </section>

    <hr class="my-3" />

    <section id="info-penjual">
      <info-penjual
        :hits="iklan"
        :seller="seller"
        :avg="avg"
        :catatan="catatan"
        :kebijakan="kebijakan"
      />
    </section>

    <hr class="my-3" />

    <section id="detail-unit">
      <spesifikasi :unitMokas="unitMokas" :unitid="unitid" />
    </section>

    <hr class="my-3" />

    <section id="penawaran">
      <list-penawaran :liveBid="liveBid" :user="user" :guest="guest" />
    </section>

    <v-dialog v-model="noTiket" persistent width="500">
      <v-card>
        <v-card-title
          class="d-flex align-center justify-space-between red--text"
        >
          <div>Oops!</div>

          <v-btn icon @click="noTiket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai
          peserta iklan ini meskipun Anda tidak melakukan penawaran
          <br />Apakah Anda setuju?
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="#20929D"
            dark
            class="my-4"
            @click="dialogKonfirmasi = true"
            v-on:click="noTiket = false"
          >
            Setuju, mengikuti Tawar Bersama
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogKonfirmasi" width="460">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div>Konfirmasi Mengikuti Tawar Bersama</div>

          <v-btn icon @click="dialogKonfirmasi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai
          peserta iklan ini meskipun Anda tidak melakukan penawaran. Apakah Anda
          setuju?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="#20929D" text outlined @click="dialogKonfirmasi = false">
            Tidak
          </v-btn>

          <v-btn color="#20929D" dark @click="konfirmasiNonTiket()">
            Ya, Setuju
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="useTiket" persistent width="500">
      <v-card>
        <v-alert border="right" colored-border type="error" elevation="2">
          Silahkan lanjut ke konfirmasi penggunaan tiket
        </v-alert>

        <v-card-title
          class="d-flex align-center justify-space-between red--text"
        >
          <div>{{ iklan.jumlah_tiket }} Tiket dibutuhkan</div>
          <v-btn icon @click="useTiket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          Untuk dapat mengikuti iklan ini perlu memakai tiket. Gunakan Tiket
          Tawar Bersama pada iklan ini?
          <br />Catatan: <br />1. Pastikan masa kadaluarsa tiket Anda melebihi
          waktu selesai tawar bersama iklan ini. <br />2. Tiket Anda akan tetap
          terpakai untuk mengikuti iklan Tawar Bersama ini meskipun Anda tidak
          melakukan penawaran

          <h2 class="mt-3 green--text">
            Jumlah tiket tersedia milik Anda:
            {{ ticket.tersedia }} Tiket
          </h2>
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="#20929D"
            dark
            @click="dialogKonfirmasiTiket = true"
            v-on:click="useTiket = false"
            :disabled="ticket.tersedia > 0 ? false : true"
          >
            Gunakan Tiket
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogKonfirmasiTiket" persistent width="420">
      <v-card>
        <v-card-title
          class="d-flex align-center justify-space-between headline"
        >
          <div>Konfirmasi Penggunaan Tiket</div>

          <v-btn icon @click="dialogKonfirmasiTiket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          {{ iklan.jumlah_tiket }} Tiket Anda akan tetap terpakai untuk
          mengikuti iklan Tawar Bersama ini meskipun Anda tidak melakukan
          penawaran, <br />
          Apakah Anda Setuju?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
           color="#20929D" text outlined
            @click="dialogKonfirmasiTiket = false"
          >
            Batalkan
          </v-btn>

          <v-btn dark color="#20929D" @click="konfirmasiTiket()">
            Ya, Gunakan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'tb-satuan',
  props: ['items'],
  components: {
    InfoPenjual: () =>
      import(
        /* webpackChunkName: "info-penjual" */ '@/components/InfoPenjual.vue'
      ),
    Spesifikasi: () =>
      import(
        /* webpackChunkName: "spesifikasi" */ '@/components/Spesifikasi.vue'
      ),
    ListPenawaran: () =>
      import(
        /* webpackChunkName: "list-penawaran" */ '@/components/ListPenawaran.vue'
      ),
  },
  data: () => ({
    tab: 0,
    iklan: [],
    carousel: 0,
    unitMokas: [],
    fotos: [],
    seller: [],
    avg: [],
    catatan: [],
    kebijakan: [],
    minBid: 0,
    penawaran: 0,
    bid: 0,
    liveBid: [],
    time: '',
    countdown: 0,
    countdown2: 0,
    check: [],
    toggle: 0,
    noTiket: false,
    dialogKonfirmasi: false,
    KonfirmasiAuto: false,
    isAuto: [],
    amountAuto: 0,
    reactivated: false,
    useTiket: false,
    dialogKonfirmasiTiket: false,
    tiket: [],
    orders: [],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      productid: 'product/productid',
      unitid: 'product/unitid',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      ticket: 'ticket/ticket',
    }),
    now: function () {
      return this.time
    },
    start: function () {
      return this.moment.utc(this.now).isAfter(this.iklan.tanggal_mulai)
    },
    end: function () {
      return this.moment.utc(this.now).isAfter(this.iklan.tanggal_selesai)
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setSellertId: 'product/setSeller',
      setAuth: 'auth/set',
    }),
    async getTB() {
      await this.$axios
        .get('/iklan/v3/iklan_tb_mokas', {
          params: {
            id: this.productid,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.iklan = data

          let now = this.moment
            .utc(data.server_time)
            .add(this.utc, 'h')
            .toDate()
          now.setDate(now.getDate() - 1)

          let s = this.moment
            .utc(data.tanggal_mulai)
            .add(this.utc, 'h')
            .toDate()
          s.setDate(s.getDate() - 1)

          let d = this.moment
            .utc(data.tanggal_selesai)
            .add(this.utc, 'h')
            .toDate()
          d.setDate(d.getDate() - 1)

          this.countdown2 = d - now
          this.countdown = s - now

          if (this.iklan.harga_saat_ini == null) {
            this.penawaran =
              Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan)
            this.bid = this.penawaran
          } else {
            this.penawaran =
              Number(this.hits.harga_saat_ini) + Number(this.iklan.kelipatan)
            this.bid = this.penawaran
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async detailUnit() {
      await this.$axios
        .get('/produk/v3/unit_mokas_iklan', {
          params: {
            id: this.iklan.motor_bekas[0].id_motor_bekas,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.unitMokas = data[0]
          this.fotos.push(
            { src: this.unitMokas.foto_1 },
            { src: this.unitMokas.foto_2 },
            { src: this.unitMokas.foto_3 },
            { src: this.unitMokas.foto_4 },
            { src: this.unitMokas.foto_5 }
          )
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getPenjual() {
      await this.$axios
        .get('/user/v3/user', {
          params: {
            id: this.iklan.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.seller = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async reviewAvg() {
      await this.$axios
        .get('/transaksi/v3/review_avg', {
          params: {
            id_penjual: this.seller.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.avg = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    go(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id+ '?tgl=' + date)
    },
    async getCatatan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.seller.id,
            type_catatan: 2,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.catatan = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getKebijakan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.seller.id,
            type_catatan: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.kebijakan = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getBid() {
      await this.$fire.firestore
        .collection('tawar_bersama')
        .doc('iklan')
        .collection(String(this.productid))
        .limit(5)
        .orderBy('Bid', 'desc')
        .onSnapshot((querySnapshot) => {
          let bidder = []
          querySnapshot.forEach((doc) => {
            bidder.push(doc.data())
            this.minBid = bidder[0].Bid
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan)
            this.bid = this.penawaran
          })
          this.liveBid = bidder
        })
    },
    async checkTB() {
      await this.$axios
        .get('/bid/v3/iklan_tb_peserta', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.productid,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.check = data[0]

          this.getAutoBid()
          this.getTiket()
          this.getOrder()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async ikutTB() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/bid/v3/iklan_tb_peserta', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then(() => {})
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

          if (responses.api_status == 2) {
            this.useTiket = !this.useTiket
          }
          if (responses.api_status == 4) {
            this.noTiket = true
          }
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
    async konfirmasiNonTiket() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/bid/v3/konfirmasi_penggunaan_nontiket', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.dialogKonfirmasi = false
          this.checkTB()
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
    minus() {
      if (this.bid > this.penawaran) {
        this.bid -= this.iklan.kelipatan
      }
    },
    async bidding() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('bid', this.bid)
      formData.set('id_app_user', this.user.id)

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
    playSound(sound) {
      if (sound) {
        let audio = new Audio(sound)
        audio.play()
      }
    },
    addAuto() {
      let max = this.bid + 20000000
      if (this.amountAuto < max) {
        this.amountAuto += this.iklan.kelipatan
      }
    },
    minAuto() {
      if (this.amountAuto > this.bid) {
        this.amountAuto -= this.iklan.kelipatan
      }
    },
    async autoBid() {
      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('id_iklan', this.productid)
      formData.set('max_bid', this.amountAuto)

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

      formData.set('id_app_user', this.user.id)
      formData.set('id_iklan', this.productid)

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
    async getAutoBid() {
      await this.$axios
        .get('/bid/v3/pembeli_auto_tawar', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.productid,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          if (data.length == 0) {
            this.isAuto = null
            this.amountAuto = this.bid
            this.reactivated = true
          } else {
            this.isAuto = data[0]
            this.amountAuto = this.isAuto.max_bid
            if (this.isAuto.max_bid <= this.minBid) {
              this.reactivated = false
            } else {
              this.reactivated = true
            }
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTiket() {
      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.tiket = data[0]
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Anda tidak memiliki tiket',
          })
        })
    },
    async konfirmasiTiket() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)
      formData.set('id_tiket', this.tiket.id)

      await this.$axios
        .post('/bid/v3/konfirmasi_penggunaan_tiket', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.checkTB()
          this.dialogKonfirmasiTiket = !this.dialogKonfirmasiTiket
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
    async getOrder() {
      await this.$axios
        .get('/transaksi/v3/order', {
          params: {
            id_iklan: this.productid,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          if (data.length > 0) {
            this.orders = data[0]
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getTB()
    await this.detailUnit()
    await this.getPenjual()
    await this.reviewAvg()
    await this.getCatatan()
    await this.getKebijakan()
    await this.getBid()

    if (!this.guest) {
      await this.checkTB()
    }

    let app = this
    setInterval(() => {
      app.time = this.moment().add(this.utc, 'h').format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
}
</script>

<style>
a:link {
  /* color: #20929D; */
  text-decoration: none;
}

div.sticky {
  overflow: hidden;
  position: sticky;
  top: 12.6%;
  z-index: 1;
}

div.fixed {
  position: fixed;
  top: 30%;
  width: 290px;
  /* z-index: 1; */
}
</style>